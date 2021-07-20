import { ParticleCollection } from '../particle-collection/particle-collection'
import { glslBorisPush } from './pusher/glsl/glslBorisPush'
// import { jsBorisPush } from './pusher/js/jsBorisPush'

import { VariableBuffers } from './utils/pingPongVariableBuffers'
import { ColorCorrector } from './utils/colorCorrection'
import { Lattice } from './lattice/lattice'
import { PARTICLE_TYPES, C } from '@pathicles/config'
import { isLittleEndian } from '../utils/little-endian'
import { PerformanceLogger } from '../utils/PerformanceLogger'
import { jsBorisPush } from './pusher/js/jsBorisPush'

export class Simulation {
  constructor(regl, { model, runner, debug }) {
    this.performanceLogger = new PerformanceLogger(debug.logPerformance)

    this.performanceLogger.start('Simulation()')
    this._regl = regl

    this.configuration = { model, runner, debug }

    if (!model.emitter.position)
      model.emitter.position = model.lattice.origin.position
    if (!model.emitter.direction)
      model.emitter.direction = [
        Math.sin(model.lattice.origin.phi),
        0,
        Math.cos(model.lattice.origin.phi)
      ]

    const { snapshotCount } = runner
    const { particleCount, particleTypes, fourPositions, fourVelocities } =
      (this.initialData = new ParticleCollection(model.emitter))

    this.configuration.runner.numberType = this.configuration.runner
      .packFloat2UInt8
      ? 'uint8'
      : 'float'

    this.configuration.runner.snapshotCount = snapshotCount
    this.configuration.runner._iterationsPerSnapshot =
      runner.iterationsPerSnapshot

    this.configuration.runner._iterationsPerRun =
      this.configuration.runner.iterationCount > 0
        ? this.configuration.runner.iterationCount
        : (this.configuration.runner.snapshotCount - 1) *
          this.configuration.runner._iterationsPerSnapshot

    this.configuration.runner.littleEndian = isLittleEndian()

    this.colorCorrector = new ColorCorrector(
      regl,
      fourPositions,
      model.emitter.position
    )

    this.variables = {
      ...this.configuration.runner,
      particleCount,
      snapshotCount,
      iterations: this.configuration.runner._iterationsPerRun,
      particleTypes,
      position: new VariableBuffers(
        regl,
        particleCount,
        snapshotCount,
        this.configuration.runner.numberType,
        fourPositions
      ),
      velocity: new VariableBuffers(
        regl,
        particleCount,
        snapshotCount,
        this.configuration.runner.numberType,
        fourVelocities
      ),

      iteration: 0,
      particleColorsAndTypes: regl.texture({
        data: particleTypes.map((p) => PARTICLE_TYPES[p].color.concat(p)),
        shape: [particleCount, 1, 4],
        type: 'uint8'
      }),
      colorCorrections: this.colorCorrector.toTexture(),
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
        type: 'float'
      })
    }

    this.model = {
      boundingBoxSize: model.boundingBoxSize,
      boundingBoxCenter: model.boundingBoxCenter,
      latticeConfig: model.lattice,
      lattice: new Lattice(model.lattice),
      interactions: {
        particleInteraction: model.interactions.particleInteraction,
        electricField: model.interactions.electricField,
        magneticField: model.interactions.magneticField
      }
    }

    this.log()

    this.pusher =
      this.configuration.runner.pusher === 'glsl'
        ? glslBorisPush(this._regl, {
            runner: this.configuration.runner,
            variables: this.variables,
            model: this.model,
            debug: this.debug
          })
        : jsBorisPush({
            runner: this.configuration.runner,
            variables: this.variables,
            model: this.model,
            debug: this.debug
          })

    this.performanceLogger.stop()
  }

  push(n = 1, profile = false) {
    this.performanceLogger.start(`simulation.push (n=${n})`)
    this.pusher(n, profile)
    // this.log()
    this.performanceLogger.stop()
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
      if (!this._logStore) this._logStore = []
      this._logStore.push(this.dump())
    }
  }

  dump(precision = 3) {
    // const logEntry = this.logEntry()
    // const position = Array.from(logEntry.position.float32Array).map((d) =>
    //   precision
    //     ? Math.round(d * Math.pow(10, precision)) / Math.pow(10, precision)
    //     : d
    // )

    const packedPositions = this.variables.position.pack(
      this.variables.position.toTypedArray(
        this.variables.position.pingPong,
        precision
      ).float32Array
    )
    const packedVelocities = this.variables.position.pack(
      this.variables.velocity.toTypedArray(
        this.variables.position.pingPong,
        precision
      ).float32Array
    )

    const velocityNorms = packedVelocities.map((p) =>
      p.map((s) => s[3] * s[3] - s[0] * s[0] - s[1] * s[1] - s[2] * s[2])
    )
    const gammas = packedVelocities.map((p) => p.map((s) => s[3] / C))

    return JSON.parse(
      JSON.stringify({
        logEntry: this.logEntry(),
        // position,
        packedPositions,
        packedVelocities,
        velocityNorms,
        gammas,
        colorCorrections: this.colorCorrector.corrections,
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
    this.push(this.configuration.runner._iterationsPerRun, true)
  }
}
