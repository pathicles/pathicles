'use strict'

import initialize from './pathicles.initialize'
import pushBoris from './pusher/pathicles.push--boris'

import readData from './pathicles.variables.read'
import { VariableBuffers } from './utils/pingPongVariableBuffers'
import { colorCorrection } from './utils/colorCorrection'
import { Lattice } from './lattice/lattice'

export class Simulation {
  constructor(regl, configuration, support) {
    this._regl = regl

    this._logStore = []

    this.configuration = configuration
    this.configuration.simulate = true
    this.channelsPerValueCount = 4 //configuration.renderToFloat ? 4 : 4

    this.RTTFloatType = 'float' //configuration.simulateHalfFloat ? 'half float' : 'float' //support.RTTFloatType

    const {
      particleCount,
      bufferLength,
      fourPositions,
      particleTypes,
      fourVelocities
    } = (this.initialData = initialize(
      configuration.model.bufferLength,
      configuration.model.emitter
    ))

    const colorCorrections = colorCorrection(
      particleCount,
      fourPositions,
      configuration.model.emitter.position
    )

    // console.log(Math.min(...colorCorrections))

    this.variables = {
      RTTFloatType: this.RTTFloatType,
      initialData: this.initialData,
      position: new VariableBuffers(
        regl,
        particleCount,
        bufferLength,
        this.RTTFloatType,
        this.channelsPerValueCount,
        fourPositions
      ),
      velocity: new VariableBuffers(
        regl,
        particleCount,
        bufferLength,
        this.RTTFloatType,
        this.channelsPerValueCount,
        fourVelocities
      ),

      tick: { value: 0 },
      referencePoint: [0, 0, 0],
      pingPong: 0,
      particleColorsAndTypes: regl.texture({
        data: particleTypes
          .map((p) => configuration.colors[p].concat(p))
          .flat(),
        shape: [particleCount, 1, 4],
        type: this.RTTFloatType
      }),
      colorCorrections: regl.texture({
        data: particleTypes
          .map((p, i) => [colorCorrections[i], 0, 0, 0])
          .flat(),
        shape: [particleCount, 1, 4],
        type: this.RTTFloatType
      }),
      particleChargesMassesChargeMassRatios: regl.texture({
        data: particleTypes
          .map((p) => [
            configuration.charge[p],
            configuration.mass[p],
            configuration.chargeMassRatio[p],
            p
          ])
          .flat(),
        shape: [particleCount, 1, 4],
        type: this.RTTFloatType
      })
    }

    // console.log(this.variables)

    this.model = {
      halfDeltaTOverC: this.configuration.model.tickDurationOverC / 2,
      particleCount: this.initialData.particleCount,
      particleTypes: this.initialData.particleTypes,
      bufferLength: this.initialData.bufferLength,
      stepCount: this.configuration.runner.stepCount,
      boundingBoxSize: this.configuration.model.boundingBoxSize,
      boundingBoxCenter: this.configuration.model.boundingBoxCenter,
      latticeConfig: this.configuration.model.lattice,
      lattice: new Lattice(this.configuration.model.lattice),
      interactions: {
        particleInteraction: this.configuration.model.interactions
          .particleInteraction,
        electricField: this.configuration.model.interactions.electricField,
        magneticField: this.configuration.model.interactions.magneticField
      }
    }

    if (configuration.simulate) {
      this.push = pushBoris(this._regl, {
        variables: this.variables,
        model: this.model,
        channelsPerValueCount: this.channelsPerValueCount
      })
    }
  }

  log() {
    if (this.configuration.logPushing) {
      const data = readData(this._regl, {
        variables: this.variables,
        model: this.model
      })
      this._logStore.push({ tick: this.variables.tick.value, data: data })
    }
  }

  dump() {
    return {
      configuration: this.configuration,
      ...readData(this._regl, {
        variables: this.variables,
        model: this.model
      })
    }
  }

  push(steps = 1) {
    Array(steps)
      .fill()
      .map(() => {
        this.push({})
      })
  }

  reset() {
    this.variables.position.load(this.initialData.fourPositions)
    this.variables.velocity.load(this.initialData.fourVelocities)
    this.variables.tick.value = 0
  }

  prerender() {
    const batchSize = 1
    const steps = this.model.bufferLength
    const batchSizes = Array(Math.floor(steps / batchSize)).fill(batchSize)
    if (steps % batchSize > 0) {
      batchSizes.push(steps % batchSize)
    }
    // const t0 = performance.now()

    batchSizes.forEach((batchSize) => {
      this.push(batchSize)

      // window.prerendered =  readData(this._regl, {
      //   variables: this.variables,
      //   model: this.model
      // })
      //this.log()
    })
    // const t1 = performance.now()
    // console.log('duration: ', t1 - t0)
  }
}
