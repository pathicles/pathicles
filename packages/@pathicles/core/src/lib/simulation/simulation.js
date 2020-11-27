'use strict'

import { ParticleCollection } from './particle-collection'
import pushBoris from './pusher/pathicles.push--boris'

import readData from './pathicles.variables.read'
import { VariableBuffers } from './utils/pingPongVariableBuffers'
import { colorCorrection } from './utils/colorCorrection'
import { Lattice } from './lattice/lattice'

export class Simulation {
  constructor(regl, configuration) {
    this._regl = regl

    this._logStore = []

    this.configuration = configuration

    const channelsPerValueCount = configuration.channelsPerValueCount

    const RTTFloatType = 'float'

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

    this.push = pushBoris(this._regl, {
      variables: this.variables,
      model: this.model
    })
  }

  logEntry() {
    const positionData = this.variables.position.toTypedArray()
    const velocityData = this.variables.velocity.toTypedArray()
    return {
      iteration: this.variables.iteration,
      position: positionData,
      velocity: velocityData
    }
  }

  log() {
    if (this.configuration.debug.logPushing) {
      this._logStore.push(this.logEntry())
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
