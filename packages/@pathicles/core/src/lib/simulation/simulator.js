/* eslint-env browser */

import freeCameraFactory from '../utils/freeCameraFactory'
import { Simulation } from './simulation'
import SimulationFSM from '../simulation/simulationFSM'
import { PerformanceLogger } from '../utils/PerformanceLogger'
import { boxesViewSimple } from '../views/boxesViewSimple'
import { keyControlMount, keyControlUnmount } from '../utils/keyControl'
import { checkSupport } from '../utils/checkSupport'
import createREGL from 'regl'
import { drawTextureCommand } from '../webgl-utils/drawTextureCommand'

export class ReglSimulatorInstance {
  constructor({ canvas, params, pixelRatio, simulate = true }) {
    keyControlMount(this)
    this.params = params
    this.simulate = simulate
    this.performanceLogger = new PerformanceLogger(
      this.params.debug.logPerformance
    )
    // eslint-disable-next-line no-undef
    createREGL({
      canvas,
      profile: this.params.profile,
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

          this.performanceLogger.start('checkSupport')
          this.checkSupport(regl)
          this.performanceLogger.stop()

          this.performanceLogger.start('init')
          this.init(regl)
          this.performanceLogger.stop()

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

  resize() {
    this.regl.poll()
  }

  destroy() {
    keyControlUnmount(this)
    this.regl.destroy()
  }

  updateParams(params) {
    this.stop(this.regl)
    this.params = params
    this.init(this.regl)
    this.run(this.regl)
  }

  checkSupport() {
    this.support = checkSupport()
  }

  init(regl) {
    this.camera = freeCameraFactory(
      regl,
      this.params.view.camera,
      regl._gl.canvas.clientWidth / regl._gl.canvas.clientHeight
    )

    this.drawTexture = drawTextureCommand(regl)

    this.performanceLogger.start('init.simulation')
    this.simulation = new Simulation(regl, this.params)
    this.performanceLogger.stop()

    this.performanceLogger.start('init.view')
    this.view = boxesViewSimple(regl, {
      variables: this.simulation.variables,
      model: this.simulation.model,
      params: this.params
    })
    this.performanceLogger.stop()
    this.performanceLogger.start('init.runner')
    this.pathiclesRunner = new SimulationFSM(this.simulation, {
      ...this.params.runner
    })
    this.performanceLogger.stop()
  }

  run(regl) {
    const mainloop = () => {
      return regl.frame(({ tick }) => {
        this.performanceLogger.start('pathiclesRunner.next')
        const { changed } = this.pathiclesRunner.next()
        this.performanceLogger.stop()

        this.camera.doAutorotate()
        this.camera.tick()

        if (changed || this.camera.state.dirty) {
          this.camera.setCameraUniforms(
            {
              ...this.camera,
              viewRange: this.params.viewRange
            },
            () => {
              this.view.drawDiffuse({
                colorCorrections: this.simulation.variables.colorCorrections,
                particleColorsAndTypes: this.simulation.variables
                  .particleColorsAndTypes,
                position: this.simulation.variables.position.buffers[
                  this.simulation.variables.pingPong
                ],
                viewRange: [0, 1]
              })

              if (this.params.debug.showTextures) {
                this.drawTexture({
                  texture: this.simulation.variables.position.buffers[
                    this.simulation.variables.pingPong
                  ],
                  x0: 0,
                  scale: this.params.debug.showTextureScale
                })
                this.drawTexture({
                  texture: this.simulation.variables.velocity.buffers[
                    this.simulation.variables.pingPong
                  ],
                  x0:
                    (this.simulation.variables.particleCount + 1) *
                    this.params.debug.showTextureScale,
                  scale: this.params.debug.showTextureScale
                })
                this.drawTexture({
                  texture: this.view.shadow.fbo,
                  x0: 400,
                  scale: this.params.debug.showTextureScale / 2
                })
              }
            }
          )
        }
      })
    }
    this.loop = mainloop()
  }

  stop() {
    this.loop.cancel()
  }
}
