/* eslint-env browser */

import { RUNNER_MODE } from '@pathicles/config/src/constants.js'

const INITIAL = 'initial'
const ACTIVE = 'active'
const PAUSED = 'paused'
const RESTART = 'restart'

export const STATES = {
  INITIAL,
  ACTIVE,
  PAUSED,
  RESTART
}

export default class SimulationFSM {
  constructor(
    simulation,
    {
      prerender = false,
      iterationCount = -1,
      iterationsPerTick = 1,
      loops = 0,
      mode = RUNNER_MODE.STEPWISE
    }
  ) {
    this._simulation = simulation
    this._prerender = prerender
    this._iterationCount =
      iterationCount <= 0
        ? this._simulation.variables.bufferLength - 1
        : iterationCount
    this._iterationsPerTick = iterationsPerTick
    this._loopCountMax = loops
    this._isLooping = loops > 0
    this._mode = mode // RUNNER_MODE_FRAMEWISE / RUNNER_MODE_STEPWISE

    this.fsm = { state: STATES.INITIAL } // initial / active / paused / restart
  }

  toggleLooping() {
    this._loopCount = 0
    this._loopCountMax = 10
    this._isLooping = !this._isLooping
  }

  toggleMode() {
    this._mode =
      this._mode === RUNNER_MODE.STEPWISE
        ? RUNNER_MODE.FRAMEWISE
        : RUNNER_MODE.STEPWISE
  }

  toggleActivity() {
    if (this.fsm.state === STATES.ACTIVE) {
      this.fsm = { state: STATES.PAUSED }
    } else if (this.fsm.state === STATES.PAUSED) {
      this.fsm = { state: STATES.ACTIVE }
      if (this._isLooping) {
        this._loopCount = 1
      }
    }
  }

  next() {
    const tick_0 = this._simulation.variables.iteration
    if (this.fsm.state === STATES.INITIAL) {
      this._simulation.log()

      this._runCount = 1
      this._loopCount = 1

      if (this._prerender) {
        this._simulation.prerender()

        if (this._simulation.configuration.debug.INITIALlogPushing)
          this._simulation.log()
        this.fsm = { state: STATES.PAUSED }
      } else {
        this.fsm = { state: STATES.ACTIVE }
      }
    }
    if (this.fsm.state === STATES.ACTIVE) {
      if (this._simulation.variables.iteration > this._iterationCount - 1) {
        if (this._isLooping && this._loopCount <= this._loopCountMax) {
          this.fsm.state = 'restart'
        } else {
          this.fsm.state = STATES.PAUSED
        }
      } else {
        this._simulation.push(this._iterationsPerTick)
        this._simulation.log()

        if (this._mode === RUNNER_MODE.STEPWISE) {
          this.fsm.state = STATES.PAUSED
        }
      }
    } else if (this.fsm.state === STATES.RESTART) {
      this._loopCount++
      this._runCount++
      this._simulation.reset({})
      this._simulation.push(this._iterationsPerTick)
      this._simulation.log()
      this.fsm.state = this.fsm.state.replace(
        /restart/,
        this._mode === RUNNER_MODE.STEPWISE ? STATES.PAUSED : STATES.ACTIVE
      )
    }
    const tick = this._simulation.variables.iteration
    const changed = tick !== tick_0
    return { changed, tick }
  }
}
