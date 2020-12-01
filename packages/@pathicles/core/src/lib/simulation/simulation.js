'use strict'

import { ParticleCollection } from '../particle-collection/particle-collection'
import pushBoris from './pusher/pathicles.push--boris'

import { VariableBuffers } from './utils/pingPongVariableBuffers'
import { colorCorrection } from './utils/colorCorrection'
import { Lattice } from './lattice/lattice'
import { PARTICLE_TYPES } from '@pathicles/config'

export class Simulation {
  constructor(regl, configuration) {
    this._regl = regl

    this._logStore = []

    this.configuration = configuration

    const colorType = 'float'

    const { bufferLength } = configuration.model
    const {
      particleCount,
      particleTypes,
      fourPositions,
      fourVelocities
    } = (this.initialData = new ParticleCollection(configuration.model.emitter))

    this.variables = {
      particleCount,
      bufferLength,
      colorType,
      particleTypes,
      iterationCount: configuration.runner.iterationCount,
      position: new VariableBuffers(
        regl,
        particleCount,
        bufferLength,
        colorType,
        fourPositions
      ),
      velocity: new VariableBuffers(
        regl,
        particleCount,
        bufferLength,
        colorType,
        fourVelocities
      ),

      iteration: 0,
      referencePoint: [0, 0, 0],
      // pingPong: 0,
      particleColorsAndTypes: regl.texture({
        data: particleTypes.map((p) => PARTICLE_TYPES[p].color.concat(p)),
        shape: [particleCount, 1, 4],
        type: 'uint8'
      }),
      colorCorrections: colorCorrection(
        regl,
        'float',
        fourPositions,
        configuration.model.emitter.position
      ),

      particleChargesMassesChargeMassRatios: regl.texture({
        data: particleTypes
          .map((p) => [
            PARTICLE_TYPES[p].charge__qe,
            PARTICLE_TYPES[p].mass__eVc_2,
            PARTICLE_TYPES[p].chargeMassRatio__Ckg_1,
            p
          ])
          .flat(),
        shape: [particleCount, 1, 4],
        type: colorType
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

    this.pusher = pushBoris(this._regl, {
      variables: this.variables,
      model: this.model
    })
  }

  push(n) {
    this.pusher(n)
    this.log()
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

  dump(precision = 3) {
    const logEntry = this.logEntry()
    const position = Array.from(logEntry.position.float32Array).map((d) =>
      precision
        ? Math.round(d * Math.pow(10, precision)) / Math.pow(10, precision)
        : d
    )
    return JSON.parse(
      JSON.stringify({
        logEntry: this.logEntry(),
        position,
        packedPosition: this.variables.position.pack(
          this.variables.position.toTypedArray().float32Array
        ),
        configuration: this.configuration,
        particleTypes: this.variables.particleTypes
      })
    )
  }

  reset() {
    this.variables.position.reset()
    this.variables.velocity.reset()
    this.variables.iteration = 0
  }

  prerender() {
    this.push(this.variables.iterationCount)
  }
}
