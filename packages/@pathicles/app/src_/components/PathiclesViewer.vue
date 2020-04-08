/* eslint-env browser */

<template lang="pug">
  .pathicles__scroll-container(ref="scrollContainer" v-scroll='onScroll' :style="{height: scrollHeight}")
    .pathicles__control-container
      button(@click="setCameraMode('free')" :disabled="cameraMode==='free'") free camera
      button(@click="setCameraMode('guided')" :disabled="cameraMode==='guided'")  guided camera
    .pathicles__canvas-container(
      ref="container"
      :style="cssStyles")
      canvas(ref="canvas" :style="cssStyles" :width="canvasWidth" :height="canvasHeight")
</template>

<script>
import { ReglViewerInstance } from '@pathicles/viewer'
import { config } from '@pathicles/config'

const cameraPositionSploints = [
  [0.5, 0.0, 1], // 0 electrtic

  [0.5, 0.0, 1], // 1 move

  [5, 0.0, 5], // 2 dipole

  [5, 0.0, 5], // 3 move

  [5, 2, -1], // 4 quadrupole

  [5, 2, -1], // 5 move

  [5, 5, -1] // 6
]

const cameraTargetSploints = [
  [0, 0.0, -2], // 0

  [0, 0.0, -2], // 1

  [-1, 1, -1], // 2 dipole

  [-1, 1, -1], // 3

  [0, 0.5, 0], // 4 quadupole

  [0, 0.5, 0], // 5

  [4.9, 0.5, -1] // 6
]

const scenes = [
  {
    //0
    dt: 1,
    preset: 'story-electric',
    data: () => import('./../data/story-electric.json')
  },
  {
    // 1
    dt: 1,
    preset: 'story-empty'
  },
  {
    // 2
    dt: 1,
    preset: 'story-dipole',
    data: () => import('./../data/story-dipole.json')
  },
  {
    // 3
    dt: 1,
    preset: 'story-empty'
  },
  {
    // 4
    dt: 1,
    preset: 'story-quadrupole',
    data: () => import('./../data/story-quadrupole.json')
  },
  {
    // 5
    dt: 1,
    preset: 'empty'
  }
]

scenes.forEach((scene, s) => {
  scene.cameraPositionSploints = [
    cameraPositionSploints[s],
    cameraPositionSploints[s],
    cameraPositionSploints[s + 1],
    cameraPositionSploints[s + 1]
  ]
  scene.cameraTargetSploints = [
    cameraTargetSploints[s],
    cameraTargetSploints[s],
    cameraTargetSploints[s + 1],
    cameraTargetSploints[s + 1]
  ]
})
export default {
  name: 'PathiclesViewer',
  props: {
    presetName: {
      type: String,
      default: 'story-electric'
    },
    scrollFactor: {
      type: Number,
      default: 5
    }
  },
  data: () => {
    return {
      screenWidth: 600,
      screenHeight: 600,
      progress: 0,
      cameraMode: 'guided',
      viewRange: [0, 0],
      activeStep: 0,
      pixelRatio: 1
    }
  },
  computed: {
    scrollHeight() {
      return this.scrollFactor * 100 + 'vh'
    },
    cssStyles() {
      return {
        width: this.screenWidth + 'px',
        height: this.screenHeight + 'px'
      }
    },
    canvasWidth() {
      return this.screenWidth * this.pixelRatio
    },
    canvasHeight() {
      return this.screenHeight * this.pixelRatio
    }
  },

  mounted() {
    if (typeof window !== 'undefined' && window.document) {
      this.pixelRatio = Math.min(this.pixelRatio, window.devicePixelRatio)
      this.screenWidth = window.innerWidth
      this.screenHeight = window.innerHeight

      this.reglInstance = new ReglViewerInstance({
        canvas: this.$refs.canvas,
        config: config(this.$route.params.preset || this.presetName),
        pixelRatio: this.pixelRatio,
        control: {
          viewRange: this.viewRange,
          cameraMode: this.cameraMode,
          scenes
        }
      })
    }
    this.$nextTick(() => {
      this.scrollyHeight = this.$refs.scrollContainer.clientHeight
    })
  },
  destroyed() {
    if (typeof window !== 'undefined' && window.document) {
      this.reglInstance.destroy()
    }
  },

  methods: {
    handleResize() {
      this.scrollyHeight = document.documentElement.clientHeight
    },
    setCameraMode(cameraMode) {
      this.cameraMode = cameraMode
      this.reglInstance.control.cameraMode = cameraMode
    },
    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      const p = this.offsetTop / (this.scrollyHeight - window.innerHeight)
      this.progress = p > 1 ? 1 : p
      this.reglInstance.control.viewRange = [0, p]
      this.reglInstance.control.progress = p
      this.reglInstance.story.setPosition(p)
    }
  }
}
</script>

<style lang="stylus" scoped>

body
  margin 0

.pathicles__control-container
  position fixed
  top 0
  right 0
  z-index 100
  overflow hidden
  height 200vh
  width 100%


.pathicles__canvas-container
  position fixed
  top 50%
  left 50%
  background-color white
  transform translate(-50%, -50%) scale(1)

  canvas
    z-index 100
</style>
