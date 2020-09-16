/* eslint-env browser */
<template lang="pug">
.pathicles-story__container(ref="scrollContainer"  :data-active-scene="activeScene")
  .debug.debug-only {{vp}}
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
      :data-active="s === activeScene"
      :data-status="(s === activeScene) ? 'present' : (s < activeScene) ? 'past' : 'future'")
      .scene-content-wrapper.options(v-if="scene.type==='options'" )
        <!--        .option(slot-key="option-1")-->
        <!--        .option(slot-key="option-2")-->
        <!--        .option(slot-key="option-3")-->
      .scene-content-wrapper(:id="'scrolly-story__scene-content-wrapper--' + s" v-if="scene.type==='caption'" :style="{opacity2: (s === activeScene) ? 1 - activeSceneProgress * 4 : 1 }")
        .scene-main
          .title(:data-index="scene.scene_index")
            span.pathicles(v-if="scene.title" v-html='scene.title')
          .subtitle(v-if="scene.subtitle_1_1")
            span.pathicles(v-html='scene.subtitle_1_1')
          .subtitle(v-if="scene.subtitle_1_2")
            span.pathicles(v-html='scene.subtitle_1_2')
          .body
            p(v-html='scene.body')
</template>

<script>
import { watchViewport, unwatchViewport, getViewportState } from 'tornis'

const clampMax = 1
const clamp = (p) => (p < 0 ? 0 : p < clampMax ? p : clampMax)

import { ReglViewerInstance } from '@pathicles/viewer'

import storyDipole from '@pathicles/config/src/data/story-dipole.json'
import storyElectric from '@pathicles/config/src/data/story-electric.json'
import storyQuadrupole from '@pathicles/config/src/data/story-quadrupole.json'

export default {
  name: 'PathiclesStory',
  props: {
    story: {
      type: Object,
      default: {
        scenes: [
          {
            type: 'caption',
            title: '<strong>Wir&nbsp;beschleunigen</strong>',
            subtitle_1_1:
              '<strong>Teilchen</strong> in&nbsp;unseren&nbsp;Berufen',
            subtitle_1_2:
              '<strong>und die Beschleunigerphysik</strong> im Berufsverband.',
            image: '/images/story/story-electric.jpg',
            pathicles: {
              preset: 'story-loop',
              data: 'story-electric.js',
              camera: {
                position: [-1, 1.5, 1],
                target: [2, 1.5, -2]
              }
            }
          },
          {
            type: 'caption',
            title: 'Beschleunigung<br><strong>macht&nbsp;schneller</strong>.',
            body:
              'Elektrische Kräfte wirken sich auf Photonen, Elektronen und Protonen verschieden aus: Masselose <span class="photon">Photonen</span> sind immer mit Lichtgeschwindigkeit unterwegs, daran ändert auch eine Kraft nichts.  <span class="electron">Elektronen</span> werden rasch auf Fast-Lichtgeschwindigkeit beschleunigt, erreichen diese aber nie ganz. <span class="proton">Protonen</span> sind schwerer und brauchen etwas länger, um in Fahrt zu kommen.\n',
            image: '/images/story/story-electric.jpg',
            scene_index: 1,
            pathicles: {
              preset: 'story-electric',
              data: 'story-electric.js',
              camera: {
                position: [-2, 1.5, 0],
                target: [0, 1.5, 0]
              }
            }
          },
          {
            type: 'caption',
            title:
              'Beschleunigung<br><strong>hält&nbsp;auf&nbsp;Spur</strong>.',
            scene_index: 2,
            body:
              'Magnetfelder wirken senkrecht zur Geschwindigkeit geladener Teilchen, die dadurch ihre Richtung ändern. Gleichförmige Magnetfelder führen zu einer Kreisbahn und kommen etwa in Ringbeschleunigern zum Einsatz.\n',
            image: '/images/story/story-dipole.jpg',
            pathicles: {
              preset: 'story-dipole',
              data: 'story-dipole.js',
              camera: {
                position: [2, 1.5, 2],
                target: [0, 1.5, 0]
              }
            }
          },
          {
            type: 'caption',
            title: 'Beschleunigung<br><strong>schafft Zusammenhalt</strong>.',
            scene_index: 3,
            body:
              'Magnetfelder, deren Stärke mit Abstand zur optimalen Teilchenbahn zunimmt, wirken wie optische Linsen: In einer Ebene bringen sie die Teilchen zusammen, in der dazu senkrechten Ebene jedoch auseinander. In modernen Beschleunigern sorgen hunderte solcher Bündelungsmagnete für den Zusammenhalt.\n',
            image: '/images/story/story-quadrupole.jpg',
            pathicles: {
              preset: 'story-quadrupole',
              data: 'story-quadrupole.js',
              camera: {
                position: [2, 1.5, 2],
                target: [0, 1.5, 0]
              }
            }
          },
          {
            type: 'options',
            pathicles: {
              preset: 'story-empty',
              camera: {
                position: [1, 5, 0],
                target: [-1, 0, 0]
              }
            }
          }
        ]
      }
    },
    scrollFactor: {
      type: Number,
      default: 1
    }
  },
  data: () => {
    return {
      screenWidth: 600,
      canvasWidth: 600,
      canvasHeight: 600,
      screenHeight: 600,
      storyHeight: 500,
      progress: 0,
      activeSceneProgress: 0,
      vp: null,
      cameraMode: 'guided',
      viewRange: [0, 0],
      activeScene: 0,
      pixelRatio: 2
    }
  },

  mounted() {
    if (typeof window !== 'undefined' && window.document) {
      this.pixelRatio = Math.min(this.pixelRatio, window.devicePixelRatio)

      this.story.scenes.forEach((scene) => {
        scene.duration =
          scene.duration || (scene.type && scene.type === 'filler' ? 1 : 1)
      })
      this.story.scenes.duration = this.story.scenes.reduce(
        (acc, scene) => acc + scene.duration,
        0
      )
      this.story.scenes.forEach((scene, s) => {
        if (scene.pathicles) {
          if (scene.pathicles.data) {
            if (scene.pathicles.data === 'story-quadrupole.js')
              scene.data = () =>
                new Promise((resolutionFunc) => {
                  resolutionFunc(storyQuadrupole)
                })
            else if (scene.pathicles.data === 'story-dipole.js')
              scene.data = () =>
                new Promise((resolutionFunc) => {
                  resolutionFunc(storyDipole)
                })
            else
              scene.data = () =>
                new Promise((resolutionFunc) => {
                  resolutionFunc(storyElectric)
                })
          }
        }
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

      watchViewport(this.handleViewportChange)

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
    }
  },

  computed: {
    viewportState() {
      return getViewportState()
    },
    canvasStyles() {
      return {
        width: this.screenWidth + 'px',
        height: this.screenHeight + 'px'
      }
    }
  },
  unmounted() {
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
        // const bcr_1 = document
        //   .getElementById('scrolly-story__scene-content-wrapper--1')
        //   .getBoundingClientRect()
        //
        // console.log(bcr_1.bottom, scroll.top, bcr_1.bottom <= scroll.top)
        //
        // this.progress = clamp(
        //   (scroll.top + 0 * this.screenHeight) / this.storyHeight
        // )
        this.progress = clamp(
          (scroll.top + this.screenHeight) / this.storyHeight
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
            sceneCount: this.story.scenes.length,
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

.pathicles-story__container

  .debug
    position fixed
    top 0
    left 0
    z-index 1000000

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
    padding-bottom $bl(1)
    padding-top $bl(2)
    position absolute
    top 0
    left 0
    right var(--ui__sidebar__width)
    background-color rgba(white, .8)
    display flex
    min-height 40vh
    width calc(100vw - var(--ui__sidebar__width))

.layout--sidebar-hidden
  .scene-content-wrapper
    right 0
    width 100vw

#scrolly-story__scene--0, #scrolly-story__scene--4
  .scene-content-wrapper
    top initial
    bottom 0

[data-status="future"] .scene-content-wrapper
  display none

[data-status="past"] .scene-content-wrapper
  display none


#scrolly-story__scene--1, #scrolly-story__scene--2, #scrolly-story__scene--3, #scrolly-story__scene--4
  &[data-status="present"] .scene-content-wrapper
    position fixed
    bottom 0
    top initial

.pathicles-story__container


  .title, .subtitle
    font-size: var(--baty__font-size--header-md)
    line-height: $bl(1.25)

    .pathicles
      strong
        $bold()
      $pathicles-span(header-md)

  .title
    span.pathicles
      background-color var(--kfb__blue)
      color white

    &[data-index]:before
      content attr(data-index)
      position: absolute
      z-index 2000
      color white
      $regular()
      margin-left $bl(-1)

  .body
    p
      $baselined-typography(body-md)
      max-width 60ch

      .photon, .electron, .proton

        display inline-block
        padding 0 5px


      .proton
        background-color var(--kfb__red)
        color white

      .photon
        background-color var(--kfb__yellow)

      .electron
        background-color var(--kfb__blue)
        color white

  .options

    section.md-section_open
      margin-bottom $bl(1)

    //+mq--gte-md()
    flex-direction row

    .option
      flex 1
      padding-right: $bl(.5)

  canvas
    image-rendering crisp-edges

.layout--PathiclesStory
  .navbar__item--next
    opacity 0
</style>
