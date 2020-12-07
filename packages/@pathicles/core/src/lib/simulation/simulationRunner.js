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

export class SimulationRunner {
  constructor(
    simulation,
    {
      prerender = false,
      iterations = -1,
      iterationsPerTick = 1,
      loops = 0,
      mode = RUNNER_MODE.STEPWISE
    }
  ) {
    this._simulation = simulation
    this._prerender = prerender
    this._iterations =
      iterations <= 0
        ? this._simulation.variables.snapshotCount - 1
        : iterations
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
    const tick_before = this._simulation.variables.iteration
    if (this.fsm.state === STATES.INITIAL) {
      this._loopCount = 1

      if (this._prerender) {
        this._simulation.prerender()

        this.fsm = { state: STATES.PAUSED }
      } else {
        this.fsm = { state: STATES.ACTIVE }
      }
    }
    if (this.fsm.state === STATES.ACTIVE) {
      if (this._simulation.variables.iteration > this._iterations - 1) {
        if (this._isLooping && this._loopCount <= this._loopCountMax) {
          this.fsm.state = 'restart'
        } else {
          this.fsm.state = STATES.PAUSED
        }
      } else {
        this._simulation.push(this._iterationsPerTick)

        if (this._mode === RUNNER_MODE.STEPWISE) {
          this.fsm.state = STATES.PAUSED
        }
      }
    } else if (this.fsm.state === STATES.RESTART) {
      this._loopCount++
      this._simulation.reset()
      this._simulation.push(this._iterationsPerTick)
      this.fsm.state = this.fsm.state.replace(
        /restart/,
        this._mode === RUNNER_MODE.STEPWISE ? STATES.PAUSED : STATES.ACTIVE
      )
    }
    const tick_after = this._simulation.variables.iteration
    const changed = tick_after !== tick_before
    return { changed, tick: tick_after }
  }
}
