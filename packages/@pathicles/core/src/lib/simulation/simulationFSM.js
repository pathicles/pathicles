/* eslint-env browser */

import { log, error, PerformanceLogger } from '../utils/logger'
export default class SimulationFSM {
  constructor(
    simulation,
    {
      prerender = false,
      stepCount = -1,
      stepsPerTick = 1,
      loops = 0,
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
    this._runCount = 0
    this._loopCount = 0
    this._loopCountMax = loops
    this._isLooping = loops > 0
    this._mode = mode // framewise / stepwise

    this.fsm = { state: 'initial' } // initial / active / paused / restart
  }

  toggleLooping() {
    this._loopCount = 0
    this._isLooping = !this._isLooping
  }

  toggleMode() {
    this._mode = this._mode === 'stepwise' ? 'framewise' : 'stepwise'
  }

  toggleActivity() {
    if (this.fsm.state === 'active') {
      this.fsm = { state: 'paused' }
    } else if (this.fsm.state === 'paused') {
      this.fsm = { state: 'active' }
      if (this._isLooping) {
        this._loopCount = 1
      }
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

    this._runCount = 1
    this._loopCount = 1

    if (this._prerender) {
      log('start.prerender')

      PerformanceLogger.start('prerender')
      if (this.simulate) {
        this._simulation.prerender()
        PerformanceLogger.stop()
      }
      this._simulation.variables.tick.value = this._stepCount
      this._simulation.push({})
      this.fsm = { state: 'paused' }
    } else {
      this.fsm = { state: 'restart' }
    }
  }

  next() {
    // console.log(this.fsm.state, this._simulation.variables.tick.value)
    const stateInitial = this.fsm.state

    if (this.fsm.state === 'active') {
      if (this._simulation.variables.tick.value > this._stepCount - 1) {
        if (this._isLooping && this._loopCount <= this._loopCountMax) {
          this.fsm.state = 'restart'
        } else {
          this.fsm.state = 'paused'
        }
      } else {
        for (let s = 0; s < this._stepsPerTick; s++) {
          this._simulation.push({})
          if (this._simulation.variables.tick.value > this._stepCount) break
        }

        if (this._mode === 'stepwise') {
          this.fsm.state = 'paused'
        }
      }
    } else if (this.fsm.state === 'restart') {
      this._loopCount++
      this._simulation.reset({})
      this._simulation.push({})
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
