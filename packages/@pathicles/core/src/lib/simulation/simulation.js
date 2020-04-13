'use strict'
'use strict'

import initialize from './pathicles.initialize'
import pushBoris from './pusher/pathicles.push--boris'

import readData from './pathicles.variables.read'
import { createBuffers, loadBuffers } from './utils/pingPongVariableBuffers'
import drawVariableTexture from './pathicles.variables.drawTexture'
import { Lattice } from './lattice/lattice'

export class Simulation {
  constructor(regl, configuration) {
    this._regl = regl

    this._logStore = []

    this.configuration = configuration
    this.configuration.simulate = true

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

    const lattice = new Lattice(this.configuration.model.lattice)
    this.variables = {
      initialData: this.initialData,
      position: loadBuffers(
        createBuffers(regl, particleCount, bufferLength),
        fourPositions
      ),
      velocity: loadBuffers(
        createBuffers(regl, particleCount, bufferLength),
        fourVelocities
      ),
      tick: { value: 0 },
      referencePoint: [0, 0, 0],
      pingPong: 0,
      particleColorsAndTypes: regl.texture({
        data: particleTypes.map(p => configuration.colors[p].concat(p)).flat(),
        shape: [particleCount, 1, 4],
        type: 'float'
      }),
      particleChargesMassesChargeMassRatios: regl.texture({
        data: particleTypes
          .map(p => [
            configuration.charge[p],
            configuration.mass[p],
            configuration.chargeMassRatio[p],
            p
          ])
          .flat(),
        shape: [particleCount, 1, 4],
        type: 'float'
      })
    }

    this.model = {
      halfDeltaTOverC: this.configuration.model.tickDurationOverC / 2,
      particleCount: this.initialData.particleCount,
      particleTypes: this.initialData.particleTypes,
      bufferLength: this.initialData.bufferLength,
      stepCount: this.configuration.runner.stepCount,
      boundingBoxSize: this.configuration.model.boundingBoxSize,
      lattice: lattice,
      latticeConfig: this.configuration.model.lattice,
      interactions: {
        gravityConstant: this.configuration.model.interactions.gravityConstant,
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

    this.drawVariableTexture = drawVariableTexture(regl, {
      variables: this.variables,
      particleCount: this.model.particleCount,
      bufferLength: this.model.bufferLength,
      texelSize: configuration.view.texelSize,
      x0: configuration.view.texelSize,
      y0: configuration.view.texelSize
    })

    this.log = () => {
      if (this.configuration.dumpData) {
        const data = readData(this._regl, {
          variables: this.variables,
          model: this.model
        })
        this._logStore.push({ tick: this.variables.tick.value, data: data })
      }
    }

    this.dump = () => {
      return readData(this._regl, {
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
    loadBuffers(this.variables.position, this.initialData.fourPositions)
    loadBuffers(this.variables.velocity, this.initialData.fourVelocities)
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
    batchSizes.forEach(batchSize => {
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
