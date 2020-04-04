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
    // if (configuration.simulate) {
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
      })
    }
    // } else {
    //   const data_electric = require('@pathicles/core/src/data/story-electric.json')
    //     .data
    //   const data_dipole = require('@pathicles/core/src/data/story-dipole.json')
    //     .data
    //   const data_quadrupole = require('@pathicles/core/src/data/story-quadrupole.json')
    //     .data
    //
    //   this.variables = {
    //     initialData: this.initialData,
    //
    //     particleColorsAndTypesMap: {
    //       empty: regl.texture({
    //         data: Array(this.initialData.particleCount * 4)
    //           .fill(0)
    //           .flat(),
    //         shape: [this.initialData.particleCount, 1, 4],
    //         type: 'float'
    //       }),
    //       'story-electric': regl.texture({
    //         data: data_electric.particleTypes
    //           .map(p => configuration.colors[p].concat(p))
    //           .flat(),
    //         shape: [this.initialData.particleCount, 1, 4],
    //         type: 'float'
    //       }),
    //       'story-dipole': regl.texture({
    //         data: data_dipole.particleTypes
    //           .map(p => configuration.colors[p].concat(p))
    //           .flat(),
    //         shape: [this.initialData.particleCount, 1, 4],
    //         type: 'float'
    //       }),
    //       'story-quadrupole': regl.texture({
    //         data: data_quadrupole.particleTypes
    //           .map(p => configuration.colors[p].concat(p))
    //           .flat(),
    //         shape: [this.initialData.particleCount, 1, 4],
    //         type: 'float'
    //       })
    //     },
    //
    //     positionsMap: {
    //       empty: createPingPongVariableTextures(
    //         regl,
    //         this.initialData.particleCount,
    //         this.initialData.bufferLength,
    //         new Float32Array(
    //           this.initialData.particleCount * this.initialData.bufferLength * 4
    //         )
    //       ),
    //       'story-electric': createPingPongVariableTextures(
    //         regl,
    //         this.initialData.particleCount,
    //         this.initialData.bufferLength,
    //         data_electric.position
    //       ),
    //       'story-dipole': createPingPongVariableTextures(
    //         regl,
    //         this.initialData.particleCount,
    //         this.initialData.bufferLength,
    //         data_dipole.position
    //       ),
    //       'story-quadrupole': createPingPongVariableTextures(
    //         regl,
    //         this.initialData.particleCount,
    //         this.initialData.bufferLength,
    //         data_quadrupole.position
    //       )
    //     },
    //
    //     tick: { value: this.initialData.bufferLength },
    //     referencePoint: [0, 0, 0],
    //     pingPong: 0
    //   }
    //
    //   this.variables.position = this.variables.positionsMap['empty']
    //   this.variables.particleColorsAndTypes = this.variables.particleColorsAndTypesMap[
    //     'story-quadrupole'
    //   ]
    // }

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

    // this.variables.position[0].color[0].subimage(this.initialData.fourPositions)
    // this.variables.velocity[0].color[0].subimage(
    //   this.initialData.fourVelocities
    // )
    // this.variables.position[1].color[0].subimage(this.initialData.fourPositions)
    // this.variables.velocity[1].color[0].subimage(
    //   this.initialData.fourVelocities
    // )
    // this.variables.tick.value = 0
  }

  prerender() {
    const batchSize = 1
    const steps = this.model.bufferLength - 1
    const batchSizes = Array(Math.floor(steps / batchSize)).fill(batchSize)
    if (steps % batchSize > 0) {
      batchSizes.push(steps % batchSize)
    }
    // const t0 = performance.now()
    batchSizes.forEach(batchSize => {
      this.push(batchSize)
      this.log()
    })
    // const t1 = performance.now()
    // console.log('duration: ', t1 - t0)
  }
}
