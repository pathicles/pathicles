/* eslint-env browser */

<template lang="pug">
.pathicles.pathicles-simulator(ref="scrollContainer")
  .debug.debug-only {{vp}}
  .canvas-container(ref="container")
    canvas#canvas(ref="canvas" :style="canvasStyles" :width="canvasWidth" :height="canvasHeight")
</template>

<script>
import { ReglSimulatorInstance } from '@pathicles/core'
import { config as loadConfig } from '@pathicles/config'
import { unwatchViewport, watchViewport } from 'tornis'

export default {
  name: 'Pathicles',

  props: {
    presetName: {
      type: String,
      default: 'story-dipole'
    },
    prerender: {
      type: Boolean,
      default: true
    },
    debug: {
      type: Boolean,
      default: false
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
  data: () => {
    return {
      progress: 0.5,
      viewRange: [0, 1],
      config: {},
      windowHeight: 0,
      windowWidth: 0,
      vp: null
    }
  },
  computed: {
    pixelRatio() {
      return Math.min(
        window.devicePixelRatio,
        this.maxCanvasWidth / this.windowHeight
      )
    },
    canvasStyles() {
      return {
        width: this.windowWidth + 'px',
        height: this.windowHeight + 'px'
      }
    },
    canvasWidth() {
      return this.windowWidth * this.pixelRatio
    },
    canvasHeight() {
      return this.windowHeight * this.pixelRatio
    }
  },
  unmounted() {
    unwatchViewport(this.handleViewportChange)
    this.reglInstance.destroy()
  },
  mounted() {
    // getGPUTier().then((tier) => {
    //   console.log(tier)
    // window.addEventListener('resize', this.onWindowResize)

    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    this.config = loadConfig(this.presetName)

    this.$nextTick(() => {
      watchViewport(this.handleViewportChange)
      this.reglInstance = new ReglSimulatorInstance({
        canvas: this.$refs.canvas,
        config: this.config,
        control: {
          viewRange: this.viewRange,
          progress: this.progress,
          cameraMode: this.cameraMode
        }
      })
    })
  },

  methods: {
    handleViewportChange({ size }) {
      if (size.changed) {
        this.windowWidth = size.x
        this.windowHeight = size.y
        if (this.reglInstance) {
          this.reglInstance.resize()
        }
      }
    }
  },
  watch: {
    presetName(presetName) {
      this.config = loadConfig(presetName)
      this.reglInstance.loadConfig(this.config)
    }
  }
}
</script>

<style lang="stylus">
.pathicles
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  overflow hidden

  select
    position fixed
    z-index 10000
    top 0
    left 0
    right 0
    padding 1em
    font-size 16px
    width 100%

  .canvas-container
    height: 100vh
    position absolute
    top 0
    left 0
    z-index 1000

    canvas
      image-rendering crisp-edges

  .pathicles-simulator
    touch-action pinch-zoom
</style>
