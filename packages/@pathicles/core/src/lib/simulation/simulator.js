/* eslint-env browser */

import freeCameraFactory from '../utils/freeCameraFactory'
import { Simulation } from './simulation'
import { SimulationRunner } from './simulationRunner'
import { PerformanceLogger } from '../utils/PerformanceLogger'
import { boxesViewSimple } from '../views/boxesViewSimple'
import { keyControlMount, keyControlUnmount } from '../utils/keyControl'
import { checkSupport } from '../utils/checkSupport'
import createREGL from 'regl'
import { drawTextureCommand } from '../webgl-utils/drawTextureCommand'

export class ReglSimulatorInstance {
  constructor({ canvas, config }) {
    keyControlMount(this)
    this.config = config

    this.performanceLogger = new PerformanceLogger(
      this.config.debug.logPerformance
    )
    // eslint-disable-next-line no-undef
    createREGL({
      canvas,
      profile: this.config.profile,
      attributes: {
        preserveDrawingBuffer: true,
        antialiasing: true
      },
      onDone: (err, regl) => {
        if (err) return console.error(err)
        try {
          this.regl = regl

          window.pathicles = this

          this.performanceLogger.start('checkSupport')
          this.checkSupport(regl)

          this.performanceLogger.start('init')
          this.init(regl)

          this.run(regl)
        } catch (e) {
          console.error(e)
        }
      },
      extensions: [
        'angle_instanced_arrays',
        'oes_texture_float',
        'OES_standard_derivatives',
        'OES_texture_half_float',
        'WEBGL_depth_texture',
        'EXT_color_buffer_half_float'
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
    // console.log(regl._gl.FLOAT)
    this.camera = freeCameraFactory(regl, {
      ...this.config.view.camera,
      aspectRatio: regl._gl.canvas.clientWidth / regl._gl.canvas.clientHeight
    })

    this.drawTexture = drawTextureCommand(regl)

    this.performanceLogger.start('init.simulation')
    this.simulation = new Simulation(regl, this.config, this.support)

    this.performanceLogger.stop('init.simulation')
    this.performanceLogger.start('init.view')
    this.view = boxesViewSimple(regl, {
      runner: this.simulation.runner,
      variables: this.simulation.variables,
      model: this.simulation.model,
      view: this.config.view
    })
    this.performanceLogger.start('init.runner')
    this.pathiclesRunner = new SimulationRunner(
      this.simulation,
      this.config.runner
    )
  }

  run(regl) {
    this.loop = regl.frame(({ tick }) => {
      if (tick < 20) {
        this.performanceLogger.start(
          'pathiclesRunner.next iteration: ' +
            this.simulation.variables.iteration +
            ' ' +
            tick
        )
      }
      const { changed } = this.pathiclesRunner.next()

      if (tick < 20) {
        this.performanceLogger.start('pathiclesRunner view tick: ' + tick)
      }
      this.camera.doAutorotate()
      this.camera.tick()

      if (changed || this.camera.state.dirty) {
        this.camera.setCameraUniforms(
          {
            ...this.camera
          },
          () => {
            this.view.drawDiffuse({
              colorCorrections: this.simulation.variables.colorCorrections,
              particleColorsAndTypes: this.simulation.variables
                .particleColorsAndTypes,
              position: this.simulation.variables.position.value()
            })

            if (this.config.debug.showTextures) {
              this.drawTexture({
                texture: this.simulation.variables.position.value(),
                scale: this.config.debug.showTextureScale
              })
              this.drawTexture({
                texture: this.simulation.variables.velocity.value(),
                y0:
                  (this.simulation.variables.snapshotCount * 4 + 1) *
                  this.config.debug.showTextureScale,
                scale: this.config.debug.showTextureScale
              })
              // this.drawTexture({
              //   texture: this.view.shadow.fbo,
              //   x0:
              //     2 *
              //     (this.simulation.variables.particleCount + 1) *
              //     this.config.debug.showTextureScale,
              //   scale: 0.5
              // })
            }
          }
        )
      }
      this.performanceLogger.stop()
      // if (tick < 20) {
      //   this.performanceLogger.start('idle tick ' + tick)
      // }
    })
  }

  stop() {
    if (this.loop) this.loop.cancel()
  }
}
