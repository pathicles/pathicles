'use strict'

import { ParticleCollection } from './particle-collection'
import pushBoris from './pusher/pathicles.push--boris'
import { VariableBuffers } from './utils/pingPongVariableBuffers'
import { colorCorrection } from './utils/color-correction.js'
import { Lattice } from './lattice/lattice'

export class Simulation {
  constructor(regl, configuration) {
    this._regl = regl

    this._logStore = []

    this.configuration = configuration
    this.configuration.simulate = true

    const channelsPerValueCount = configuration.channelsPerValueCount

    const RTTFloatType = 'uint8' //configuration.simulateHalfFloat ? 'half float' : 'float' //support.RTTFloatType

    const { bufferLength } = configuration.model
    const {
      particleCount,
      particleTypes,
      fourPositions,
      fourVelocities
    } = (this.initialData = new ParticleCollection(configuration.model.emitter))

    const colorCorrections = colorCorrection(
      fourPositions,
      configuration.model.emitter.position
    )

    this.variables = {
      particleCount,
      bufferLength,
      particleTypes,
      iterationCount: configuration.runner.iterationCount,
      channelsPerValueCount,
      RTTFloatType,
      position: new VariableBuffers(
        regl,
        particleCount,
        bufferLength,
        RTTFloatType,
        channelsPerValueCount,
        fourPositions
      ),
      velocity: new VariableBuffers(
        regl,
        particleCount,
        bufferLength,
        RTTFloatType,
        channelsPerValueCount,
        fourVelocities
      ),

      iteration: 0,
      referencePoint: [0, 0, 0],
      pingPong: 0,
      particleColorsAndTypes: regl.texture({
        data: particleTypes.map((p) => configuration.colors[p].concat(p)),
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
            configuration.charge[p],
            configuration.mass[p],
            configuration.chargeMassRatio[p],
            p
          ])
          .flat(),
        shape: [particleCount, 1, 4],
        type: RTTFloatType
      })
    }

    console.log(this.log(false))
    // console.log(this.variables.position.toTypedArray())

    // console.log(
    //   variable2NestedArray(this.variables.position.loadedData, {
    //     particleCount,
    //     bufferLength
    //   })
    // )

    this.model = {
      halfDeltaTOverC: this.configuration.model.iterationDurationOverC / 2,
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
        model: this.model
      })
    }
  }

  log(toStore = this.configuration.logPushing) {
    const positionData = this.variables.position.toTypedArray()
    const velocityData = this.variables.velocity.toTypedArray()
    const entry = {
      iteration: this.variables.iteration,
      position: positionData,
      velocity: velocityData
    }

    toStore && this._logStore.push(entry)
    return entry
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
