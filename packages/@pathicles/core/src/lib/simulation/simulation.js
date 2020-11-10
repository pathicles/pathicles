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
    this.configuration.simulate = true

    const channelsPerValueCount = configuration.channelsPerValueCount

    const RTTFloatType = 'float' //configuration.simulateHalfFloat ? 'half float' : 'float' //support.RTTFloatType

    console.log({ channelsPerValueCount })

    const { bufferLength } = configuration.model
    const {
      particleCount,
      fourPositions,
      particleTypes,
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

      iterationStep: { value: 0 },
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
      halfDeltaTOverC: this.configuration.model.iterationStepDurationOverC / 2,
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

  log() {
    if (this.configuration.logPushing) {
      const data = readData(this._regl, {
        variables: this.variables,
        model: this.model
      })
      this._logStore.push({
        iterationStep: this.variables.iterationStep.value,
        data: data
      })
    }
  }

  dump() {
    return {
      configuration: JSON.parse(JSON.stringify(this.configuration)),
      ...readData(
        this._regl,
        {
          variables: this.variables,
          model: this.model
        },
        1000
      )
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
    this.variables.iterationStep.value = 0
  }

  prerender() {
    const batchSize = 1
    const steps = this.variables.bufferLength
    const batchSizes = Array(Math.floor(steps / batchSize)).fill(batchSize)
    if (steps % batchSize > 0) {
      batchSizes.push(steps % batchSize)
    }
    // const t0 = performance.now()

    batchSizes.forEach((batchSize) => {
      this.push(batchSize)
    })
  }
}
