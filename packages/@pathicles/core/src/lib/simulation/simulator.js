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
import { variable2NestedArray } from './utils/variable2NestedArray'
import stringify from '@aitodotai/json-stringify-pretty-compact'

export class ReglSimulatorInstance {
  constructor({ canvas, config, pixelRatio, control, simulate = true }) {
    keyControlMount(this)
    this.config = config
    this.simulate = simulate
    this.control = control
    this.performanceLogger = new PerformanceLogger(
      this.config.debug.logPerformance
    )
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
    this.simulation = new Simulation(
      regl,
      {
        ...this.config
      },
      this.support
    )
    this.performanceLogger.stop()

    this.performanceLogger.start('init.view')
    this.view = boxesViewSimple(regl, {
      variables: this.simulation.variables,
      model: this.simulation.model,
      config: this.config
    })
    this.performanceLogger.stop()
    this.performanceLogger.start('init.runner')
    this.pathiclesRunner = new SimulationFSM(this.simulation, {
      ...this.config.runner,
      simulate: this.simulate
    })
    this.performanceLogger.stop()
  }

  run(regl) {
    // if (this.simulate) this.pathiclesRunner.start()
    // console.log(this.simulation.dump())
    const mainloop = () => {
      return regl.frame(() => {
        this.performanceLogger.start('pathiclesRunner.next')
        const { changed } = this.simulate && this.pathiclesRunner.next()
        this.performanceLogger.stop()

        // if (changed && this.config.logPushing) {
        //   console.log(
        //     'iteration',
        //     this.simulation.variables.iteration,
        //     stringify(
        //       variable2NestedArray(
        //         this.simulation._logStore[this.simulation._logStore.length - 1]
        //           .position,
        //         this.simulation.variables
        //       ),
        //       { maxLength: 200 }
        //     )
        //   )
        // }
        this.camera.doAutorotate()
        this.camera.tick()

        if (changed || this.camera.state.dirty) {
          this.camera.setCameraUniforms(
            {
              ...this.camera,
              viewRange: this.control.viewRange
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

              if (this.config.debug.showTextures) {
                this.drawTexture({
                  texture: this.simulation.variables.position.buffers[
                    this.simulation.variables.pingPong
                  ],
                  x0: 0,
                  scale: this.config.debug.showTextureScale
                })
                this.drawTexture({
                  texture: this.simulation.variables.velocity.buffers[
                    this.simulation.variables.pingPong
                  ],
                  x0:
                    (this.simulation.variables.particleCount + 1) *
                    this.config.debug.showTextureScale,
                  scale: this.config.debug.showTextureScale
                })
                // this.drawTexture({
                //   texture: this.view.shadow.fbo,
                //   x0: 400,
                //   scale: this.config.debug.showTexturestTexelSize
                // })
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
