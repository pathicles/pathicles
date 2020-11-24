'use strict'

import { ParticleCollection } from './particle-collection'
import pushBoris from './pusher/pathicles.push--boris'
import { VariableBuffers } from './utils/pingPongVariableBuffers'
import { colorCorrection } from './utils/color-correction.js'
import { Lattice } from './lattice/lattice'

export class Simulation {
  constructor(regl, params) {
    this._regl = regl

    this._logStore = []

    this.params = params

    const channelsPerValueCount = params.channelsPerValueCount

    const RTTFloatType = 'float' //configuration.simulateHalfFloat ? 'half float' : 'float' //support.RTTFloatType
    const { bufferLength } = this.params.model
    const {
      particleCount,
      particleTypes,
      fourPositions,
      fourVelocities
    } = (this.initialData = new ParticleCollection(params.model.emitter))

    const colorCorrections = colorCorrection(
      fourPositions,
      params.model.emitter.position
    )

    this.variables = {
      particleCount,
      bufferLength,
      particleTypes,
      iterationCount: params.runner.iterationCount,
      channelsPerValueCount,
      RTTFloatType,
      position: new VariableBuffers(
        regl,
        particleCount,
        bufferLength,
        RTTFloatType,
        fourPositions
      ),
      velocity: new VariableBuffers(
        regl,
        particleCount,
        bufferLength,
        RTTFloatType,
        fourVelocities
      ),

      iteration: 0,
      referencePoint: [0, 0, 0],
      pingPong: 0,
      particleColorsAndTypes: regl.texture({
        data: particleTypes.map((p) => params.colors[p].concat(p)),
        shape: [particleCount, 1, 4],
        type: 'uint8'
      }),
      colorCorrections: regl.texture({
        data: particleTypes
          .map((p, i) => [colorCorrections[i], 0, 0, 0])
          .flat(),
        shape: [particleCount, 1, 4],
        type: RTTFloatType
      }),
      particleChargesMassesChargeMassRatios: regl.texture({
        data: particleTypes
          .map((p) => [
            params.charge[p],
            params.mass[p],
            params.chargeMassRatio[p],
            p
          ])
          .flat(),
        shape: [particleCount, 1, 4],
        type: RTTFloatType
      })
    }

    // console.log({
    //   fourVelocities,
    //   fourPositions,
    //   log: this.log(false)
    // })

    // eslint-disable-next-line no-undef
    // console.log(this.log(false))
    // console.log(fourVelocities, this.variables.velocity.toTypedArray())
    this.variables.position.testData()
    // this.variables.velocity.testData()

    // console.log(
    //   variable2NestedArray(this.variables.position.loadedData, {
    //     particleCount,
    //     bufferLength
    //   })
    // )

    this.model = {
      halfDeltaTOverC: this.params.model.iterationDurationOverC / 2,
      boundingBoxSize: this.params.model.boundingBoxSize,
      boundingBoxCenter: this.params.model.boundingBoxCenter,
      latticeConfig: this.params.model.lattice,
      lattice: new Lattice(this.params.model.lattice),
      interactions: {
        particleInteraction: this.params.model.interactions.particleInteraction,
        electricField: this.params.model.interactions.electricField,
        magneticField: this.params.model.interactions.magneticField
      }
    }

    this.pusher = pushBoris(this._regl, {
      variables: this.variables,
      model: this.model
    })
  }

  push() {
    this.pusher()
    this.log()
  }

  log(enabled = this.params.debug.logPushing) {
    if (enabled) {
      const positionData = this.variables.position.toTypedArray()
      const velocityData = this.variables.velocity.toTypedArray()
      const entry = {
        iteration: this.variables.iteration,
        position: positionData,
        velocity: velocityData
      }

      enabled && this._logStore.push(entry)
      return entry
    }
  }

  reset() {
    this.variables.position.load(this.initialData.fourPositions)
    this.variables.velocity.load(this.initialData.fourVelocities)
    this.variables.iteration = 0
  }

  prerender() {
    this.push(this.variables.iterationCount)
  }
}
