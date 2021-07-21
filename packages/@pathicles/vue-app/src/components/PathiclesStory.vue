/* eslint-env browser */
<template lang="pug">
.pathicles-story__container(
  ref='scrollContainer',
  :data-active-scene='activeSceneIdx'
)
  //hotkeys(:shortcuts="['I', 'D', 'A', 'M', 'L', ' ']"
  //  :debug="false"
  //  @triggered="onTriggeredEventHandler")
  dl.info(v-if='debug')
    div
      dt progress
      dd {{ progress }}
    div
      dt sceneProgress
      dd {{ sceneProgress }}
    div
      dt activeSceneIdx
      dd {{ activeSceneIdx }}
    div
      dt focused
      dd {{ focused }}
  .canvas-container(ref='canvasContainer')
    canvas#canvas(
      ref='canvas',
      :style='canvasStyles',
      :height='canvasHeight',
      :width='canvasWidth'
    )

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
      v-for='(scene, s) in story.scenes',
      :id='"scrolly-story__scene--" + s',
      :style='{ height: scene.duration * 100 + "vh" }',
      :class='scene.type',
      v-bind:key='"scene-" + s',
      :data-scene='s',
      :data-active='s === activeSceneIdx',
      :data-status='s === activeSceneIdx ? "present" : s < activeSceneIdx ? "past" : "future"'
    )
      .scene-content-wrapper.options(v-if='scene.type === "options"')
        <!--        .option(slot-key="option-1")-->
        <!--        .option(slot-key="option-2")-->
        <!--        .option(slot-key="option-3")-->
      .scene-content-wrapper(
        :id='"scrolly-story__scene-content-wrapper--" + s',
        v-if='scene.type === "caption"',
        :style='{ opacity: s === activeSceneIdx ? 1 - sceneProgress * 4 : 1 }'
      )
        .scene-main
          .title(:data-index='scene.scene_index')
            span.pathicles(v-if='scene.title', v-html='scene.title')
          .subtitle(v-if='scene.subtitle_1_1')
            span.pathicles(v-html='scene.subtitle_1_1')
          .subtitle(v-if='scene.subtitle_1_2')
            span.pathicles(v-html='scene.subtitle_1_2')
          .body
            p(v-html='scene.body')
</template>

<script lang="ts">
import { watch, computed, ref, defineComponent } from 'vue'
import {
  useElementSize,
  useWindowScroll,
  useWindowSize,
  useWindowFocus
} from '@vueuse/core'

import { ReglViewerInstance } from '@pathicles/core'
import { config } from '@pathicles/config'

const storyDipole = () =>
  import('@pathicles/prerendered/files/story-dipole.json')
const storyElectric = () =>
  import('@pathicles/prerendered/files/story-electric.json')
const storyQuadrupole = () =>
  import('@pathicles/prerendered/files/story-quadrupole.json')

// const clampMax = 1
// const clamp = (p: Number) => (p < 0 ? 0 : p < clampMax ? p : clampMax)

export default defineComponent({
  name: 'PathiclesStory',
  setup(props) {
    const focused = useWindowFocus()
    const scrollContainer = ref(null)
    const canvasContainer = ref(null)
    const canvas = ref(null)
    const { height, width } = useWindowSize()
    const { height: scrollContainerHeight } = useElementSize(scrollContainer)

    const { y } = useWindowScroll()

    const { width: canvasContainerWidth, height: canvasContainerHeight } =
      useElementSize(canvasContainer)
    const canvasStyles = computed(() => ({
      width: canvasContainerWidth.value + 'px',
      height: canvasContainerHeight.value + 'px'
    }))

    const pixelRatio = computed(() => {
      return Math.min(window.devicePixelRatio, props.maxPixelRatio)
    })

    const canvasWidth = computed(
      () => canvasContainerWidth.value * pixelRatio.value
    )
    const canvasHeight = computed(
      () => canvasContainerHeight.value * pixelRatio.value
    )

    const activeSceneIdx = ref(0)
    const cameraMode = ref('guided')
    const progress = ref(0)
    const reglInstance = ref(null)
    watch(y, (y) => {
      progress.value =
        y / (scrollContainerHeight.value - canvasContainerHeight.value)
      if (reglInstance && reglInstance.value) {
        reglInstance.value.story.setPosition(progress.value)
        activeSceneIdx.value = reglInstance.value.story.getState().sceneIdx
        sceneProgress.value = reglInstance.value.story
          .getState()
          .sceneProgress.toFixed(2)
      }
    })

    watch(width, () => {
      reglInstance && reglInstance.value && reglInstance.value.resize()
    })
    watch(height, () => {
      reglInstance && reglInstance.value && reglInstance.value.resize()
    })

    const scenes = props.story.scenes
    scenes.forEach((scene) => {
      scene.duration =
        scene.duration || (scene.type && scene.type === 'filler' ? 1 : 1)
    })
    scenes.duration = scenes.reduce((acc, scene) => acc + scene.duration, 0)

    scenes.forEach((scene: Object) => {
      scene.presetName = scene.pathicles.preset
      scene.configuration = config(scene.presetName)

      scene.configuration.view.camera = {
        ...scene.configuration.view.camera,
        ...scene.pathicles.camera
      }
    })

    const sceneProgress = ref(0)

    return {
      canvasContainer,
      scrollContainer,
      canvas,
      focused,
      scenes,
      pixelRatio,
      canvasStyles,
      canvasWidth,
      canvasHeight,
      activeSceneIdx,
      sceneProgress,
      progress,
      reglInstance,
      cameraMode
    }
  },
  props: {
    story: {
      type: Object,
      mandatory: true
    },
    showInfo: {
      type: Boolean,
      default: false
    },
    debug: { default: true, type: Boolean },
    scrollFactor: {
      type: Number,
      default: 1
    },
    maxCanvasWidth: {
      type: Number,
      default: 2048
    },
    maxCanvasHeight: {
      type: Number,
      default: 1024
    },
    maxPixelRatio: {
      type: Number,
      default: 2
    }
  },

  mounted() {
    const cameraBSplointer = (scenes, s, key, index) => {
      return typeof index === 'undefined'
        ? [
            [scenes[s === 0 ? 0 : s - 1].configuration.view.camera[key]],
            [scenes[s].configuration.view.camera[key]],
            [
              scenes[s < scenes.length - 2 ? s + 1 : s].configuration.view
                .camera[key]
            ]
          ]
        : [
            [scenes[s === 0 ? 0 : s - 1].configuration.view.camera[key][index]],
            [scenes[s].configuration.view.camera[key][index]],
            [
              scenes[s < scenes.length - 2 && s !== 0 ? s + 1 : s].configuration
                .view.camera[key][index]
            ]
          ]
    }

    this.story.scenes.forEach((scene, s) => {
      scene.cameraSploints = {
        phi: cameraBSplointer(this.story.scenes, s, 'phi'),
        theta: cameraBSplointer(this.story.scenes, s, 'theta'),
        distance: cameraBSplointer(this.story.scenes, s, 'distance'),
        centerX: cameraBSplointer(this.story.scenes, s, 'center', 0),
        centerY: cameraBSplointer(this.story.scenes, s, 'center', 1),
        centerZ: cameraBSplointer(this.story.scenes, s, 'center', 2)
      }
    })

    this.story.scenes.forEach((scene) => {
      if (scene.pathicles && scene.pathicles.data) {
        if (scene.pathicles.data === 'story-quadrupole.js')
          scene.data = storyQuadrupole
        else if (scene.pathicles.data === 'story-dipole.js')
          scene.data = storyDipole
        else scene.data = storyElectric
      }
    })

    this.$nextTick(() => {
      this.reglInstance = new ReglViewerInstance({
        canvas: this.canvas,
        pixelRatio: this.pixelRatio,
        control: {
          viewRange: this.viewRange,
          cameraMode: this.cameraMode,
          scenes: this.story.scenes
        }
      })
    })
  },
  unmounted() {
    this.reglInstance.destroy()
  }
})
</script>

<style lang="stylus">
@import '../styles/mixins/'

.pathicles-story__container
  .canvas-container
    z-index 1000
    pointer-events none
    position fixed
    width 100vw
    height 100vh

  .scene
    position relative
    padding-right var(--page__padding__x)
    padding-left var(--page__padding__x)

  .scene-content-wrapper
    z-index -10000
    padding var(--page__padding__x)
    padding-bottom $bl(1)
    padding-top $bl(2)
    position absolute
    top 0
    left 0
    right var(--ui__sidebar__width)
    background-color rgba(white, 0.8)
    display flex
    min-height 40vh
    width calc(100vw - var(--ui__sidebar__width))

  #scrolly-story__scene--0, #scrolly-story__scene--4
    .scene-content-wrapper
      top initial
      bottom 0

  [data-status='future'] .scene-content-wrapper
    display none

  [data-status='past'] .scene-content-wrapper
    display none

  #scrolly-story__scene--1, #scrolly-story__scene--2, #scrolly-story__scene--3, #scrolly-story__scene--4
    &[data-status='present'] .scene-content-wrapper
      position fixed
      bottom 0
      top initial

  .pathicles-story__container
    .title, .subtitle
      font-size var(--baty__font-size--header-md)
      line-height $bl(1.25)

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
        position absolute
        z-index 2000
        color white
        margin-left $bl(-0.75)
        $regular()

        +mq--gte-md()
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
      flex-direction column

      section.md-section_open
        margin-bottom $bl(1)

      +mq--gte-md()
        flex-direction row

      .option
        flex 1
        padding-right $bl(0.5)

    canvas
      image-rendering crisp-edges

  .layout--PathiclesStory
    .navbar__item--next
      opacity 0

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
      padding-right var(--page__padding__x)
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
      background-color rgba(white, 0.8)
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

  [data-status='future'] .scene-content-wrapper
    display none

  [data-status='past'] .scene-content-wrapper
    display none

  #scrolly-story__scene--1, #scrolly-story__scene--2, #scrolly-story__scene--3, #scrolly-story__scene--4
    &[data-status='present'] .scene-content-wrapper
      position fixed
      bottom 0
      top initial

  .pathicles-story__container
    .title, .subtitle
      font-size var(--baty__font-size--header-md)
      line-height $bl(1.25)

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
        position absolute
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

      +mq--gte-md()
        flex-direction row

      .option
        flex 1
        padding-right $bl(0.5)

    canvas
      image-rendering crisp-edges

  .layout--PathiclesStory
    .navbar__item--next
      opacity 0
</style>
