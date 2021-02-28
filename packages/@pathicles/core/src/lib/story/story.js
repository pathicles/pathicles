/* eslint-env browser  */

import sequencer from './sequencer'
import { defaultConfig } from '@pathicles/config'
import createREGL from 'regl/dist/regl.min.js'

// import drawVariableTexture from '@pathicles/core/src/lib/simulation/pathicles.variables.drawTexture'
import { BoxesViewSimple } from '../views/boxesViewSimple'
import { boundedRandom } from '../utils/random'
import freeCameraFactory from '../utils/freeCameraFactory'
import { drawTextureCommand } from '../webgl-utils/drawTextureCommand'

export class ReglViewerInstance {
  constructor({ canvas, pixelRatio, control }) {
    // console.log('ReglViewerInstance')
    this.config = defaultConfig
    this.control = control

    // eslint-disable-next-line no-undef
    createREGL({
      canvas,
      attributes: {
        preserveDrawingBuffer: true,
        antialiasing: true
      },
      pixelRatio,
      extensions: [
        'angle_instanced_arrays',
        'oes_texture_float',
        'OES_standard_derivatives',
        'OES_texture_half_float',
        'EXT_color_buffer_half_float'
      ],

      onDone: (err, regl) => {
        if (err) return console.error(err)
        try {
          this.regl = regl
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
    this.regl.destroy()
  }

  init(regl) {
    this.regl._commands = []

    this.camera = freeCameraFactory(this.regl, {
      ...this.config.view.camera,
      aspectRatio:
        this.regl._gl.canvas.clientWidth / this.regl._gl.canvas.clientHeight
    })

    this.initStory()
    this.loopTick = -1

    this.drawTexture = drawTextureCommand(regl)

    this.view = new BoxesViewSimple(regl, {
      variables: this.variables,
      view: this.config.view,
      debug: this.config.debug
    })
  }

  initStory() {
    this.story = sequencer(
      this.regl,
      this.control.scenes,
      {
        sceneId: 0,
        viewRange: [0, 0]
      },
      () => {}
    )
    this.variables = this.story.getState().scene.variables
    this.model = this.story.getState().scene.model
  }

  run(regl) {
    this.loop = regl.frame(({ time, tick }) => {
      const storyState = this.story.getState()

      if (storyState.scene.loaded) {
        let sceneProgress
        let viewRange
        sceneProgress = storyState.sceneProgress
        const autoLoop =
          storyState.scene.pathicles && storyState.scene.pathicles.autoLoop

        if (autoLoop) {
          if (tick % 127 === 0) {
            this.modelTranslateX = boundedRandom() * 0.1
            this.modelTranslateY = boundedRandom() * 0.1
          }
          viewRange = [(time % 2) - 0.5, (time % 2) + 0.1]
          this.modelTranslateX = 0
          this.modelTranslateY = 0
        }

        this.camera.params.phi = storyState.scene.cameraBSplines.phi(
          sceneProgress
        )[0]

        this.camera.params.distance = storyState.scene.cameraBSplines.distance(
          sceneProgress
        )[0]
        this.camera.params.theta = storyState.scene.cameraBSplines.theta(
          sceneProgress
        )[0]

        this.camera.params.center = [
          storyState.scene.cameraBSplines.centerX(sceneProgress)[0],
          storyState.scene.cameraBSplines.centerY(sceneProgress)[0],
          storyState.scene.cameraBSplines.centerZ(sceneProgress)[0]
        ]

        this.camera.tick()
        if (autoLoop || this.camera.state.dirty) {
          this.camera.setCameraUniforms(
            {
              ...this.camera,
              scene: storyState.scene,
              sceneProgress
            },
            () => {
              regl.clear({
                color: [0, 0, 0, 0],
                depth: 1
              })
              this.view.drawDiffuse({
                colorCorrections: storyState.scene.variables.colorCorrections,
                particleColorsAndTypes:
                  storyState.scene.variables.particleColorsAndTypes,
                position: storyState.scene.variables.position.buffers[0],
                modelTranslateX: this.modelTranslateX,
                modelTranslateY: this.modelTranslateY,
                viewRange
              })
              if (this.config.debug.showTextures) {
                this.drawTexture({
                  texture: storyState.scene.variables.position.buffers[0],
                  x0: 0
                })
              }
            }
          )
        }
      }
    })
  }
}
