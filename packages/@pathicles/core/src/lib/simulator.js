/* eslint-env browser */

import freeCameraFactory from './utils/freeCameraFactory'
import { Simulation } from './simulation/simulation'
import SimulationFSM from './simulation/simulationFSM'
import PerformanceLogger from './utils/PerformanceLogger'
import { boxesViewSimple } from '@pathicles/viewer'
import { keyControlMount, keyControlUnmount } from './utils/keyControl'
import { checkSupport } from './utils/checkSupport'
import createREGL from 'regl'

export class ReglSimulatorInstance {
  constructor({ canvas, config, pixelRatio, control, simulate = true }) {
    keyControlMount(this)
    this.config = config
    this.simulate = simulate
    this.control = control

    // eslint-disable-next-line no-undef
    createREGL({
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
          // alert(e)
          console.error(e)
        }
      },
      extensions: simulate
        ? [
            'angle_instanced_arrays',
            'oes_texture_float',
            'OES_standard_derivatives',
            'OES_texture_half_float',
            'WEBGL_depth_texture'
          ]
        : [
            'angle_instanced_arrays',
            'oes_texture_float',
            'OES_standard_derivatives',
            'WEBGL_depth_texture'
          ]
    })
  }

  destroy() {
    keyControlUnmount(this)
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
      regl,
      {
        ...this.config.view.camera,
        aspectRatio: regl._gl.canvas.clientWidth / regl._gl.canvas.clientHeight
      }
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
    if (this.simulate) this.pathiclesRunner.start()
    const mainloop = () => {
      return regl.frame(() => {
        if (this.config.view.camera.autorotate) {
          this.cameras['free'].rotate(-this.config.view.camera.dTheta, 0)
        }
        const tick = this.simulation.variables.tick.value
        if (this.simulate) this.pathiclesRunner.next()
        this.cameras['free'].tick({})
        if (
          this.cameras['free'].state.dirty ||
          tick !== this.simulation.variables.tick.value
          // this.pathiclesRunner.fsm.state === 'active'
        ) {
          this.setCameraUniforms[this.control.cameraMode](
            {
              ...this.cameras[this.control.cameraMode],
              viewRange: this.control.viewRange
              // scene: storyState.scene,
              // scene_t: storyState.scene_t
            },
            () => {
              this.cameras['free'].tick({})

              this.view.drawDiffuse({ viewRange: [0, 1] })

              if (this.config.view.showTextures) {
                this.simulation.drawVariableTexture({
                  variableName: 'position'
                })
                this.simulation.drawVariableTexture({
                  variableName: 'velocity'
                })
                this.view.shadow.drawFbo()
              }
            }
          )
        }
        // PerformanceLogger.stop()
      })
    }
    this.loop = mainloop()
  }

  stop() {
    this.loop.cancel()
  }
}
