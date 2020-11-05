/* eslint-env browser  */

import sequencer from './sequencer'
import { defaultConfig } from '@pathicles/config'
import createREGL from 'regl'
// import drawVariableTexture from '@pathicles/core/src/lib/simulation/pathicles.variables.drawTexture'
import { boxesViewSimple } from '../views/boxesViewSimple'
import { boundedRandom } from '../utils/random'
import freeCameraFactory from '../utils/freeCameraFactory'
import { drawTextureCommand } from '../webgl-utils/drawTextureCommand'

export class ReglViewerInstance {
  constructor({ canvas, pixelRatio, control }) {
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
        'WEBGL_depth_texture'
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

    this.initStory()
    this.initCameras()
    this.loopTick = -1

    this.drawTexture = drawTextureCommand(regl)

    this.view = boxesViewSimple(regl, {
      variables: this.variables,
      model: this.model,
      config: this.config
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
      (state) => {
        if (state.scene.position) this.variables.position = state.scene.position
        if (state.scene.particleColorsAndTypes) {
          this.variables.particleColorsAndTypes =
            state.scene.particleColorsAndTypes
        }
      }
    )
    this.story.setPosition(0)

    this.variables = this.control.scenes[0].variables
    this.model = this.story.getState().scene.model
  }

  initCameras() {
    this.camera = freeCameraFactory(this.regl, {
      ...this.config.view.camera,
      aspectRatio:
        this.regl._gl.canvas.clientWidth / this.regl._gl.canvas.clientHeight
    })
  }

  run(regl) {
    const mainloop = () => {
      return regl.frame(() => {
        const storyState = this.story.getState()

        let activeSceneProgress
        let viewRange
        if (storyState.scene.pathicles && storyState.scene.pathicles.autoLoop) {
          this.loopTick = this.loopTick < 1024 ? this.loopTick + 1 : 0
          activeSceneProgress =
            this.loopTick < 128
              ? this.loopTick / 256
              : this.loopTick > 768
              ? (this.loopTick - 768) / 256 + 0.5
              : 0.5
          if (this.loopTick >= 127) {
            this.modelTranslateX = boundedRandom() * 0.1
            this.modelTranslateY = boundedRandom() * 0.1
          }
          this.loopTick = this.loopTick < 128 ? this.loopTick + 1 : 0
          activeSceneProgress =
            this.loopTick < 16
              ? this.loopTick / 32
              : this.loopTick > 96
              ? (this.loopTick - 96) / 32 + 0.5
              : 0.5

          viewRange =
            activeSceneProgress < 0.5
              ? [0, activeSceneProgress * 2]
              : [activeSceneProgress * 2 - 1, 1]
        } else {
          activeSceneProgress = storyState.activeSceneProgress
          viewRange = storyState.viewRange
          this.modelTranslateX = 0
          this.modelTranslateY = 0
        }
        // console.log(viewRange)

        const eye = storyState.scene.cameraPositionBSpline(
          Math.min(activeSceneProgress, 1)
        )
        const target = storyState.scene.cameraTargetBSpline(
          Math.min(activeSceneProgress, 1)
        )
        this.camera.updateEyeCenter(eye, target)

        this.camera.tick()

        this.camera.setCameraUniforms(
          {
            ...this.camera,
            scene: storyState.scene,
            activeSceneProgress
          },
          () => {
            regl.clear({
              color: [0, 0, 0, 0],
              depth: 1
            })
            // console.log('xxx', storyState.scene.variables)
            this.view.drawDiffuse({
              colorCorrections: storyState.scene.variables.colorCorrections,
              particleColorsAndTypes:
                storyState.scene.variables.particleColorsAndTypes,
              position: storyState.scene.variables.position.buffers[0],
              modelTranslateX: this.modelTranslateX,
              modelTranslateY: this.modelTranslateY,
              viewRange
            })
            if (storyState.scene.configuration.view.showTextures) {
              this.drawTexture({
                texture: storyState.scene.variables.position.buffers[0],
                x0: 0
              })

              // this.drawTexture({ texture: this.view.shadow.fbo, x0: 400 })
            }
          }
        )
      })
    }
    mainloop()
  }
}
