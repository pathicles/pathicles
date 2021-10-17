/* eslint-env browser */

import freeCameraFactory from '../utils/freeCameraFactory.mjs'
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
  constructor({ canvas, configuration }) {
    this.configuration = configuration
    this.isDirty = true

    window.performanceLogger = null
    this.performanceLogger = new PerformanceLogger()
    // eslint-disable-next-line no-undef
    this.regl = createREGL({
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
      optionalExtensions: [
        'EXT_disjoint_timer_query',
        'WEBGL_color_buffer_float'
      ],
      onDone: (err, regl) => {
        if (err) return console.error(err)
        try {
          window.pathicles = this

          this.regl = regl

          this.support = checkSupport(regl)

          this.performanceLogger.start('init')
          this.loadConfig(this.configuration)
        } catch (e) {
          console.error(e)
        }
      }
    })
  }

  resize() {
    this.regl.poll()
    console.log(
      'resize',
      this.regl._gl.canvas.clientWidth / this.regl._gl.canvas.clientHeight
    )
    this.camera.resize(
      this.regl._gl.canvas.clientWidth / this.regl._gl.canvas.clientHeight
    )
    this.isDirty = true
  }

  destroy() {
    this.regl.destroy()
  }

  loadConfig(config) {
    this.stop(this.regl)
    this.configuration = config
    console.log({ support: this.support })
    if (!this.support.canRenderToFloatTexture) {
      console.warn('canRenderToFloatTexture = false')
      this.configuration.runner.pusher = 'js'
    }
    this.init(this.regl)
    this.run(this.regl)
    this.isDirty = true
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

      this.camera.doAutorotate()
      this.camera.tick()

      if (tick < 3 || changed || this.isDirty || this.camera.state.dirty) {
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
      this.isDirty = false
    })
  }

  stop() {
    if (this.loop) this.loop.cancel()
  }
}
