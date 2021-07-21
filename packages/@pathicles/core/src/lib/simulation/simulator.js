/* eslint-env browser */

import freeCameraFactory from '../utils/freeCameraFactory'
import { Simulation } from './simulation'
import { SimulationRunner } from './simulationRunner'
import { PerformanceLogger } from '../utils/PerformanceLogger'
import { BoxesViewSimple } from '../views/boxesViewSimple'
// import { keyControlMount, keyControlUnmount } from '../utils/keyControl'
import { checkSupport } from '../utils/checkSupport'
// import createREGL from 'regl/dist/regl.min.js'
import createREGL from 'regl'
import { DECODE, drawTextureCommand } from '../webgl-utils/drawTextureCommand'

export class ReglSimulatorInstance {
  constructor({ canvas, config }) {
    // keyControlMount(this)
    this.configuration = config
    this.isDirty = true

    window.performanceLogger = null
    this.performanceLogger = new PerformanceLogger(
      this.configuration.debug.logPerformance
    )
    // eslint-disable-next-line no-undef
    createREGL({
      canvas,
      profile: this.configuration.debug.profile,
      attributes: {
        preserveDrawingBuffer: true,
        antialiasing: true
      },
      extensions: [
        'angle_instanced_arrays',
        'oes_texture_float',
        'OES_standard_derivatives',
        'OES_texture_half_float',
        'WEBGL_depth_texture',
        'EXT_color_buffer_half_float'
      ],
      optionalExtensions: ['EXT_disjoint_timer_query'],
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
      }
    })
  }

  resize() {
    this.regl.poll()
    this.isDirty = true
  }

  destroy() {
    // keyControlUnmount(this)
    this.regl.destroy()
  }

  loadConfig(config) {
    this.stop(this.regl)
    this.configuration = config
    this.init(this.regl)
    this.run(this.regl)
    this.isDirty = true
  }

  checkSupport() {
    this.support = checkSupport()
  }

  toggleShowTextures() {
    this.configuration.debug.showTextures =
      !this.configuration.debug.showTextures
    this.isDirty = true
  }

  init(regl) {
    this.camera = freeCameraFactory(regl, {
      ...this.configuration.view.camera,
      aspectRatio: regl._gl.canvas.clientWidth / regl._gl.canvas.clientHeight
    })

    this.drawTexture = drawTextureCommand(regl)

    this.simulation = new Simulation(regl, this.configuration, this.support)

    this.runner = new SimulationRunner(
      this.simulation,
      this.configuration.runner,
      this.configuration.debug
    )

    this.view = new BoxesViewSimple(regl, {
      variables: this.simulation.variables,
      runner: this.simulation.runner,
      model: this.simulation.model,
      view: this.configuration.view,
      debug: this.configuration.debug
    })
  }

  run(regl) {
    this.loop = regl.frame(({ viewportHeight, tick }) => {
      const { changed } = this.runner.next()
      this.isDirty = this.isDirty || changed

      this.camera.doAutorotate()
      this.camera.tick()
      

      if (this.isDirty || this.camera.state.dirty) {
        this.isDirty = false
        this.camera.setCameraUniforms(
          {
            ...this.camera
          },
          () => {
            this.view.drawDiffuse({
              tick,
              colorCorrections: this.simulation.variables.colorCorrections,
              particleColorsAndTypes:
                this.simulation.variables.particleColorsAndTypes,
              position: this.simulation.variables.position.value()
            })

            if (this.configuration.debug.showTextures) {
              this.drawTexture({
                decode: this.configuration.runner.packFloat2UInt8
                  ? DECODE.UNPACK_RGBA
                  : DECODE.R,
                y0:
                  viewportHeight -
                  this.simulation.variables.velocity.height *
                    this.configuration.debug.showTextureScale,
                texture: this.simulation.variables.position.value(),
                scale: 1 * this.configuration.debug.showTextureScale
              })
              this.drawTexture({
                decode: this.configuration.runner.packFloat2UInt8
                  ? DECODE.UNPACK_RGBA
                  : DECODE.R,
                texture: this.simulation.variables.velocity.value(),
                y0:
                  viewportHeight -
                  50 -
                  2 *
                    this.simulation.variables.velocity.height *
                    this.configuration.debug.showTextureScale,
                scale: this.configuration.debug.showTextureScale
              })
            }
          }
        )
      }
      this.performanceLogger.stop()
    })
  }

  stop() {
    if (this.loop) this.loop.cancel()
  }
}
