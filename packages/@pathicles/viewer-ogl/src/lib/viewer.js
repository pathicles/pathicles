/* eslint-env browser  */

import guidedCameraFactory from './guidedCameraFactory'
import boxesView from './view/boxesViewSimple/index'
import sequencer from './sequencer'
import presets from '@pathicles/presets'

import REGL from 'regl'

export class ReglViewerInstance {
  constructor({ canvas, pixelRatio, control }) {
    this.config = presets[0]

    this.control = control

    REGL({
      canvas,
      attributes: {
        preserveDrawingBuffer: true,
        antialiasing: true
      },
      pixelRatio,
      extensions: ['angle_instanced_arrays', 'oes_texture_float'],
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

  destroy() {
    this.regl.destroy()
  }

  init(regl) {
    this.regl._commands = []

    this.initStory()
    this.initCameras()
    this.loopTick = -1

    this.view = boxesView(regl, {
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
      state => {
        if (state.scene.position) this.variables.position = state.scene.position
        if (state.scene.particleColorsAndTypes) {
          this.variables.particleColorsAndTypes =
            state.scene.particleColorsAndTypes
        }
      }
    )
    this.story.setPosition(0)
    // console.log(this.control.scenes)

    this.variables = this.control.scenes[0].variables
    this.model = this.story.getState().scene.model
  }

  initCameras() {
    this.cameras = []
    this.setCameraUniforms = []
    ;[
      this.cameras['guided'],
      this.setCameraUniforms['guided']
    ] = guidedCameraFactory(
      { scenes: this.story.scenes, ...this.config.view },
      this.regl
    )

    this.camera = this.cameras['guided']

    this.modelTranslateX = 0
    this.modelTranslateY = 0
  }

  run(regl) {
    const mainloop = () => {
      return regl.frame(() => {
        const storyState = this.story.getState()

        let sceneTime
        let viewRange
        if (
          storyState.scene.pathicles &&
          storyState.scene.pathicles.preset === 'story-loop'
        ) {
          // if (this.loopTick >= 1024) {
          //   this.modelTranslateX = (Math.random() - 0.5) * 2
          //   this.modelTranslateY = (Math.random() - 0.5) * 0.5
          // }
          // this.loopTick = this.loopTick < 1024 ? this.loopTick + 8 : 0
          // sceneTime =
          //   this.loopTick < 128
          //     ? this.loopTick / 256
          //     : this.loopTick > 768
          //     ? (this.loopTick - 768) / 256 + 0.5
          //     : 0.5
          if (this.loopTick >= 128) {
            this.modelTranslateX = (Math.random() - 0.5) * 1
            this.modelTranslateY = (Math.random() - 0.5) * 0.5
          }
          this.loopTick = this.loopTick < 128 ? this.loopTick + 1 : 0
          sceneTime =
            this.loopTick < 16
              ? this.loopTick / 32
              : this.loopTick > 96
              ? (this.loopTick - 96) / 32 + 0.5
              : 0.5

          viewRange =
            sceneTime < 0.5 ? [0, sceneTime * 2] : [sceneTime * 2 - 1, 1]
        } else {
          sceneTime = storyState.sceneTime
          viewRange = storyState.viewRange
          this.modelTranslateX = 0
          this.modelTranslateY = 0
        }

        this.setCameraUniforms[this.control.cameraMode](
          {
            ...this.cameras[this.control.cameraMode],
            scene: storyState.scene,
            sceneTime
          },
          () => {
            regl.clear({
              color: [0, 0, 0, 1],
              depth: 1
            })

            this.view.drawDiffuse({
              modelTranslateX: this.modelTranslateX,
              modelTranslateY: this.modelTranslateY,
              viewRange
            })
          }
        )
      })
    }
    mainloop()
  }
}
