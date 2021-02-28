/* eslint-env browser */

import freeCameraFactory from '../utils/freeCameraFactory'
import { Simulation } from './simulation'
import { SimulationRunner } from './simulationRunner'
import { PerformanceLogger } from '../utils/PerformanceLogger'
import { BoxesViewSimple } from '../views/boxesViewSimple'
// import { keyControlMount, keyControlUnmount } from '../utils/keyControl'
import { checkSupport } from '../utils/checkSupport'
import createREGL from 'regl/dist/regl.min.js'
import { DECODE, drawTextureCommand } from '../webgl-utils/drawTextureCommand'

export class ReglSimulatorInstance {
  constructor({ canvas, config }) {
    // keyControlMount(this)
    this.config = config

    window.performanceLogger = null
    this.performanceLogger = new PerformanceLogger(
      this.config.debug.logPerformance
    )
    // eslint-disable-next-line no-undef
    createREGL({
      canvas,
      profile: this.config.debug.profile,
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
  }

  destroy() {
    // keyControlUnmount(this)
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
    this.camera = freeCameraFactory(regl, {
      ...this.config.view.camera,
      aspectRatio: regl._gl.canvas.clientWidth / regl._gl.canvas.clientHeight
    })

    this.drawTexture = drawTextureCommand(regl)

    this.simulation = new Simulation(regl, this.config, this.support)

    this.pathiclesRunner = new SimulationRunner(
      this.simulation,
      this.config.runner,
      this.config.debug
    )

    this.view = new BoxesViewSimple(regl, {
      runner: this.simulation.runner,
      variables: this.simulation.variables,
      model: this.simulation.model,
      view: this.config.view,
      debug: this.config.debug
    })
  }

  run(regl) {
    this.loop = regl.frame(({ viewportWidth, viewportHeight, tick }) => {
      const { changed } = this.pathiclesRunner.next()
      this.camera.doAutorotate()
      this.camera.tick()

      if (changed || this.camera.state.dirty) {
        this.camera.setCameraUniforms(
          {
            ...this.camera
          },
          () => {
            this.view.drawDiffuse({
              tick,
              colorCorrections: this.simulation.variables.colorCorrections,
              particleColorsAndTypes: this.simulation.variables
                .particleColorsAndTypes,
              position: this.simulation.variables.position.value()
            })

            if (this.config.debug.showTextures) {
              this.drawTexture({
                decode: this.config.runner.packFloat2UInt8
                  ? DECODE.UNPACK_RGBA
                  : DECODE.R,
                texture: this.simulation.variables.position.value(),
                scale: 1 * this.config.debug.showTextureScale
              })
              this.drawTexture({
                decode: this.config.runner.packFloat2UInt8
                  ? DECODE.UNPACK_RGBA
                  : DECODE.R,
                texture: this.simulation.variables.velocity.value(),
                y0:
                  viewportHeight -
                  this.simulation.variables.velocity.height *
                    this.config.debug.showTextureScale,
                scale: 1 * this.config.debug.showTextureScale
              })
              this.drawTexture({
                decode: DECODE.UNPACK_RGBA,
                texture: this.view.shadow.fbo,
                x0: viewportWidth - this.view.shadow.SHADOW_MAP_SIZE * 0.5,
                scale: 0.5
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
