/* eslint-env browser */

import freeCameraFactory from '../utils/freeCameraFactory'
import { Simulation } from './simulation'
import SimulationFSM from '../simulation/simulationFSM'
import PerformanceLogger from '../utils/PerformanceLogger'
import { boxesViewSimple } from '../views/boxesViewSimple'
import { keyControlMount, keyControlUnmount } from '../utils/keyControl'
import { checkSupport } from '../utils/checkSupport'
import createREGL from 'regl'
import { drawTextureCommand } from '../webgl-utils/drawTextureCommand'

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
    // console.log(this.simulation.dump())
    const {
      autorotateSpeedTheta,
      autorotateSpeedDistance,
      autorotateSpeedPhi
    } = this.config.view.camera
    if (this.simulate) this.pathiclesRunner.start()
    console.log(this.simulation.dump())
    const mainloop = () => {
      return regl.frame(({ time }) => {
        if (this.camera.autorotate) {
          this.camera.params.distance =
            this.config.view.camera.distance +
            0.1 * Math.sin(autorotateSpeedDistance * time)
          this.camera.params.theta = autorotateSpeedTheta * time
          this.camera.params.phi = 0.05 * Math.sin(autorotateSpeedPhi * time)
        }
        const { changed, tick } = this.simulate && this.pathiclesRunner.next()
        //
        if (changed) {
          // console.log(tick, this.simulation.variables.iterationStep.value)
          const dump = this.simulation.dump()
          const position = dump.data.position
          const particleCount = this.simulation.variables.particleCount
          console.log(
            position,
            particleCount,
            Array(this.simulation.variables.bufferLength)
              .fill(0)
              .map((d, i) => {
                return [
                  position[i],
                  position[i + 1],
                  position[i + 2],
                  position[i + 3]
                ]
              })
          )
        }
        this.camera.tick()
        if (this.camera.state.dirty) {
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

              if (this.config.view.showTextures) {
                this.drawTexture({
                  texture: this.simulation.variables.position.buffers[
                    this.simulation.variables.pingPong
                    ],
                  x0: 0,
                  scale: this.config.view.showTextureScale
                })
                this.drawTexture({
                  texture: this.simulation.variables.velocity.buffers[
                    this.simulation.variables.pingPong
                    ],
                  x0:
                    (this.simulation.variables.particleCount + 1) *
                    this.config.view.showTextureScale,
                  scale: this.config.view.showTextureScale
                })
                // this.drawTexture({
                //   texture: this.view.shadow.fbo,
                //   x0: 400,
                //   scale: this.config.view.showTexturestTexelSize
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
