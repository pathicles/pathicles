/* eslint-env browser */

import { log, error, PerformanceLogger } from '../utils/logger'
export default class SimulationFSM {
  constructor(
    simulation,
    {
      prerender = false,
      stepCount = -1,
      stepsPerTick = 1,
      looping = false,
      mode = 'stepwise',
      simulate = false
    }
  ) {
    this.simulate = simulate
    this._simulation = simulation
    this._prerender = prerender
    this._stepCount =
      stepCount < 0
        ? this._simulation.constants.model.bufferLength - 1
        : stepCount
    this._stepsPerTick = stepsPerTick
    this._looping = looping
    this._mode = mode // framewise / stepwise

    this.fsm = { state: 'initial' } // initial / active / paused / restart
  }

  toggleLooping() {
    this._looping = !this._looping
  }

  toggleMode() {
    this._mode = this._mode === 'stepwise' ? 'framewise' : 'stepwise'
  }

  toggleActivity() {
    if (this.fsm.state === 'active') {
      this.fsm = { state: 'paused' }
    } else if (this.fsm.state === 'paused') {
      this.fsm = { state: 'active' }
    }

    log('toggleActivity() for this.fsm.state: ' + this.fsm.state)
  }

  start() {
    if (this.fsm.state !== 'initial') {
      error('PathiclesRunner.start can be called in state initial only')
      throw new Error(
        'PathiclesRunner.start can be called in state initial only'
      )
    }

    if (this._prerender) {
      log('start.prerender')

      PerformanceLogger.start('prerender')
      if (this.simulate) {
        this._simulation.prerender()
        PerformanceLogger.stop()
      }
      this._simulation.variables.tick.value = this._stepCount
      this.fsm = { state: 'paused' }
    } else {
      this.fsm = { state: 'restart' }
    }
  }

  next() {
    // console.log(this.fsm.state, this._simulation.variables.tick.value)
    const stateInitial = this.fsm.state

    if (this.fsm.state === 'active') {
      if (this._simulation.variables.tick.value >= this._stepCount - 1) {
        if (this._looping) {
          this.fsm.state = 'restart'
        } else {
          this.fsm.state = 'paused'
        }
      } else {
        for (let s = 0; s < this._stepsPerTick; s++) {
          this._simulation.push({})
          if (this._simulation.variables.tick.value >= this._stepCount) break
        }

        if (this._mode === 'stepwise') {
          this.fsm.state = 'paused'
        }
      }
    } else if (this.fsm.state === 'restart') {
      this._simulation.reset({})
      this.fsm.state = this.fsm.state.replace(/restart/, 'active')
    }

    if (stateInitial !== this.fsm.state) {
      log(
        stateInitial +
          ' ==> ' +
          this.fsm.state +
          ' // ' +
          this._simulation.variables.tick.value
      )
    }
  }
}
