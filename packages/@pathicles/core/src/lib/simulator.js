/* eslint-env browser */

import freeCameraFactory from './utils/freeCameraFactory'
import { Simulation } from './simulation/simulation'
import SimulationFSM from './simulation/simulationFSM'
import PerformanceLogger from './utils/PerformanceLogger'
import { boxesViewSimple } from '@pathicles/viewer'
import keyControl from './utils/keyControl'
import { checkSupport } from './utils/checkSupport'

import REGL from 'regl'

import * as Debug from 'debug'
const log = new Debug('pathicles:log')

export class ReglSimulatorInstance {
  constructor({ canvas, config, pixelRatio, control, simulate = true }) {
    keyControl(this)
    this.config = config
    this.simulate = simulate

    this.control = control
    console.log(control)

    REGL({
      canvas,
      profile: this.config.profile,
      attributes: {
        preserveDrawingBuffer: false,
        antialiasing: true
      },
      pixelRatio,
      onDone: (err, regl) => {
        if (err) return console.error(err)
        try {
          this.regl = regl

          window.pathicles = this

          PerformanceLogger.start('checkSupport')
          this.checkSupport(regl)
          PerformanceLogger.stop()

          PerformanceLogger.start('init')
          this.init(regl)
          PerformanceLogger.stop()

          this.run(regl)
        } catch (e) {
          alert(e)
          console.error(e)
          log(e)
        }
      },
      extensions: simulate
        ? [
            'angle_instanced_arrays',
            'oes_texture_float',
            'OES_standard_derivatives',
            'OES_texture_half_float'
          ]
        : [
            'angle_instanced_arrays',
            'oes_texture_float',
            'OES_standard_derivatives'
          ]
    })
  }

  destroy() {
    this.regl.destroy()
  }
  loadConfig(config) {
    this.stop(this.regl)
    this.config = config
    this.init(this.regl)
    this.run(this.regl)
  }

  checkSupport() {
    this.support = checkSupport()
  }

  init(regl) {
    this.regl._commands = []
    this.cameras = []
    this.setCameraUniforms = []
    ;[this.cameras['free'], this.setCameraUniforms['free']] = freeCameraFactory(
      { ...this.config.view.camera },
      regl
    )

    this.camera = this.cameras['free']
    PerformanceLogger.start('init.simulation')
    this.simulation = new Simulation(
      regl,
      {
        ...this.config
      },
      this.support
    )
    PerformanceLogger.stop()

    PerformanceLogger.start('init.view')
    this.view = boxesViewSimple(regl, {
      variables: this.simulation.variables,
      model: this.simulation.model,
      config: this.config
    })
    PerformanceLogger.stop()
    PerformanceLogger.start('init.runner')
    this.pathiclesRunner = new SimulationFSM(this.simulation, {
      ...this.config.runner,
      simulate: this.simulate
    })
    PerformanceLogger.stop()
  }

  run(regl) {
    log('run')
    if (this.simulate) this.pathiclesRunner.start()
    const mainloop = () => {
      return regl.frame(() => {
        // PerformanceLogger.start('mainloop')

        if (this.simulate) this.pathiclesRunner.next()

        // this.setCameraUniforms(this.camera, () => {
        this.setCameraUniforms[this.control.cameraMode](
          {
            ...this.cameras[this.control.cameraMode]
            // viewRange: this.control.viewRange
            // scene: storyState.scene,
            // scene_t: storyState.scene_t
          },
          () => {
            this.cameras['free'].tick({})

            this.view.drawDiffuse({ viewRange: [0, 1] })
            if (this.config.view.showTextures) {
              this.simulation.drawVariableTexture({ variableName: 'position' })
              this.simulation.drawVariableTexture({ variableName: 'velocity' })
            }
          }
        )

        // PerformanceLogger.stop()
      })
    }
    this.loop = mainloop()
  }
  stop() {
    this.loop.cancel()
  }
}
