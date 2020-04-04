/* eslint-env browser */

<template lang="pug">
  .pathicles-story__container(ref="scrollContainer"  :data-active-scene="activeScene")
    .frame &nbsp;
    //.debug.debug-only {{vp}}
    .canvas-container(ref="canvasContainer")
      canvas(ref="canvas" :style="canvasStyles" :width="canvasWidth" :height="canvasHeight")
      <!--  .scene-backgrounds    -->
      <!-- .scene-background(v-for='(scene, sceneIndex) in story.scenes'-->
      <!--        :style="scene.image ? {'background-image': 'url(' + scene.image  + ')'} : {}" :class="'pathicles-story__scene-background--' + sceneIndex") &nbsp;-->

      <!--    .scene-captions-->
      <!--      .scene-caption(-->
      <!--        v-for='(scene, sceneIndex) in story.scenes'-->
      <!--        :data-scene="sceneIndex")-->
      <!--        .scene-caption-header-->
      <!--          .scene-caption-title-->
      <!--            span.pathicles(v-html='scene.caption_title')-->
      <!--          .scene-caption-body-->
      <!--            p(v-html='scene.body')-->
    .scenes
      .scene(
        v-for='(scene, s) in story.scenes'
        :id="'scrolly-story__scene--' + s"
        :style="{height: scene.duration * 100 + 'vh'}"
        :class="scene.type"
        v-bind:key="'scene-' + s"
        :data-scene="s"
        :data-active="s === activeScene")
        .scene-content-wrapper.options(v-if="scene.type==='options'" )
        .scene-content-wrapper(v-if="scene.type==='caption'" :style="{opacity: (s === activeScene) ? 1 - activeSceneProgress * 4 : 1 }")
          .scene-main
            .title
              span.pathicles(v-if="scene.title" v-html='scene.title')
            .subtitle(v-if="scene.subtitle_1_1")
              span.pathicles(v-html='scene.subtitle_1_1')
            .subtitle(v-if="scene.subtitle_1_2")
              span.pathicles(v-html='scene.subtitle_1_2')
            .subtitle(v-if="scene.subtitle")
              span.pathicles(v-html='scene.subtitle')
            .body
              p(v-html='scene.body')
          .scene-aside
            .scene-index {{scene.scene_index}}
            <!--            scroll-down-icon(v-if="!s" :style="{opacity: 1 - activeSceneProgress*2 }")-->

</template>

<script>
import { watchViewport, unwatchViewport, getViewportState } from 'tornis'
// const Type = require('js-binary').Type
// const binarySchema = new Type({
//   tick: 'int',
//   data: {
//     position: ['int'],
//     particleTypes: ['int']
//   }
// })

const clampMax = 1
const clamp = p => (p < 0 ? 0 : p < clampMax ? p : clampMax)

export default {
  name: 'PathiclesStory',
  props: {
    story: {
      type: Object,
      required: true
    },
    scrollFactor: {
      type: Number,
      default: 1
    }
  },
  data: () => {
    return {
      screenWidth: 600,
      screenHeight: 600,
      canvasWidth: 600,
      canvasHeight: 600,
      storyHeight: 500,
      progress: 0,
      activeSceneProgress: 0,
      vp: null,
      cameraMode: 'guided',
      viewRange: [0, 0],
      activeScene: 0,
      pixelRatio: 1
    }
  },
  mounted() {
    //

    if (typeof window !== 'undefined' && window.document) {
      this.pixelRatio = Math.min(this.pixelRatio, window.devicePixelRatio)

      this.story.scenes.forEach(scene => {
        scene.duration =
          scene.duration || (scene.type && scene.type === 'filler' ? 0.25 : 1)
      })
      this.story.scenes.duration = this.story.scenes.reduce(
        (acc, scene) => acc + scene.duration,
        0
      )
      this.story.scenes.forEach((scene, s) => {
        scene.cameraSploints = {
          position: scene.pathicles.camera
            ? [0, 1, 2, 3].map(() => scene.pathicles.camera.position)
            : [
                ...[0, 1].map(
                  () => this.story.scenes[s - 1].pathicles.camera.position
                ),
                ...[2, 3].map(
                  () => this.story.scenes[s + 1].pathicles.camera.position
                )
              ],
          target: scene.pathicles.camera
            ? [0, 1, 2, 3].map(() => scene.pathicles.camera.target)
            : [
                ...[0, 1].map(
                  () => this.story.scenes[s - 1].pathicles.camera.target
                ),
                ...[2, 3].map(
                  () => this.story.scenes[s + 1].pathicles.camera.target
                )
              ]
        }
      })

      import(/* webpackChunkName: "pathicles" */ '@pathicles/viewer').then(
        ({ ReglViewerInstance }) => {
          this.reglInstance = new ReglViewerInstance({
            canvas: this.$refs.canvas,
            pixelRatio: this.pixelRatio,
            control: {
              viewRange: this.viewRange,
              cameraMode: this.cameraMode,
              scenes: this.story.scenes
            }
          })
          this.$nextTick(() => {
            this.storyHeight = this.$refs.scrollContainer.clientHeight
          })

          this.story.scenes.forEach((scene, s) => {
            scene.cameraSploints = {
              position: scene.pathicles.camera
                ? [0, 1, 2, 3].map(() => scene.pathicles.camera.position)
                : [
                    ...[0, 1].map(
                      () => this.story.scenes[s - 1].pathicles.camera.position
                    ),
                    ...[2, 3].map(
                      () => this.story.scenes[s + 1].pathicles.camera.position
                    )
                  ],
              target: scene.pathicles.camera
                ? [0, 1, 2, 3].map(() => scene.pathicles.camera.target)
                : [
                    ...[0, 1].map(
                      () => this.story.scenes[s - 1].pathicles.camera.target
                    ),
                    ...[2, 3].map(
                      () => this.story.scenes[s + 1].pathicles.camera.target
                    )
                  ]
            }
          })
        }
      )
      this.story.scenes.forEach(scene => {
        if (scene.pathicles) {
          if (scene.pathicles.data) {
            scene.data = () =>
              import(
                /* webpackChunkName: "pathicles" */ './../data/' +
                  scene.pathicles.data
              ).then(data => {
                if (scene.pathicles.data.endsWith('.dat')) {
                  // return binarySchema.decode(data)
                }

                return data
              })
          }
        }
      })

      watchViewport(this.handleViewportChange)
    }
  },

  computed: {
    viewportState() {
      return getViewportState()
    },
    canvasStyles() {
      return {
        width: this.canvasWidth + 'px',
        height: this.canvasHeight + 'px'
      }
    }
  },
  destroyed() {
    if (typeof window !== 'undefined' && window.document) {
      this.reglInstance.destroy()
      unwatchViewport(this.handleViewportChange)
    }
  },

  methods: {
    handleViewportChange({ size, scroll }) {
      if (size.changed) {
        this.canvasWidth =
          this.$refs.canvasContainer.clientWidth * this.pixelRatio
        this.canvasHeight =
          this.$refs.canvasContainer.clientHeight * this.pixelRatio
        this.screenWidth = window.innerWidth
        this.screenHeight = window.innerHeight
        this.storyHeight = this.$refs.scrollContainer.clientHeight
      }

      if (scroll.changed) {
        this.progress = clamp(
          (scroll.top + 0 * this.screenHeight) / this.storyHeight
        )

        if (this.reglInstance) {
          this.reglInstance.story.setPosition(this.progress)
          this.activeScene = this.reglInstance.story.getState().sceneIdx
          this.activeSceneProgress = this.reglInstance.story
            .getState()
            .activeSceneProgress.toFixed(2)
        }
      }
      if (scroll.changed || size.changed) {
        this.vp = JSON.stringify(
          {
            scenceCount: this.story.scenes.length,
            activeScene: this.activeScene,
            activeSceneProgress: this.activeSceneProgress,
            progress: this.progress.toFixed(2),
            storyHeight: this.storyHeight,
            duration: this.story.scenes.duration,
            dt: this.duration,
            scrollTop: scroll.top + this.screenHeight
          },
          null,
          2
        )
      }
    }
  }
}
</script>

<style lang="stylus">
/*@import '~@theme/styles/mixins/'*/

.frame
  border solid calc(0.5 * var(--page__padding__x)) white
  //border-right-width var(--page__padding__x)
  position fixed
  top 0
  left 0
  right 0
  bottom 0

.debug
  position fixed
  top 0
  left 0
  z-index 1000000


.scroll-down-icon
  position absolute
  transform scale(2)


.frame
  z-index 1100
  pointer-events none

.canvas-container
  z-index 1000
  pointer-events none
  position fixed
  width 100vw
  height 100vh


.scene
  position relative
  padding-right: var(--page__padding__x)
  padding-left var(--page__padding__x)


.scene-content-wrapper
  z-index 10000
  padding var(--page__padding__x)
  //padding-bottom $bl(1)
  //padding-top $bl(1)
  position absolute
  top 0
  left 0
  right 0
  background-color rgba(white, .8)
  display flex

#scrolly-story__scene--0, #scrolly-story__scene--4
.scene-content-wrapper
  top initial
  bottom 0
</style>
