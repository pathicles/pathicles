/* eslint-env browser */

<template lang="pug">
.pathicles.pathicles-simulator(ref="scrollContainer")
  dl.debug.debug-only
    div(v-for="(value, key) in vp" :key="key")
      dt {{ key }}
      dd {{ value }}
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
      vp: null,
      story: {
        scenes: []
      }
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

    this.loadConfig()

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
    loadConfig() {
      this.config = loadConfig(this.presetName)
      this.vp = {
        np: this.config.model.emitter.particleCount,
        ns: this.config.runner.snapshotCount,
        n: this.config.runner.iterations,
        dt: this.config.runner.iterationDurationOverC + ' c',
        ɣ: this.config.model.emitter.gamma.toString().replace(/=>/, '=>\n')
      }
    },
    handleViewportChange({ size, scroll }) {
      if (size.changed) {
        this.windowWidth = size.x
        this.windowHeight = size.y
        this.storyHeight = this.$refs.scrollContainer.clientHeight
        if (this.reglInstance) this.reglInstance.resize()
      }

      if (scroll.changed) {
        this.progress = scroll.top + this.windowHeight / this.storyHeight
      }
    }
  },
  watch: {
    presetName(presetName) {
      this.loadConfig(presetName)
      this.reglInstance.loadConfig(this.config)
    }
  }
}
</script>

<style lang="stylus">
.print dl
  display none

dl
  margin-top 2em
  margin-left 0em
  z-index 10000
  position fixed

  div
    width 11rem
    display flex
    font-size 10px

    dt
      flex 0 0 1rem
      background-color rgba(white, .5)
      text-align right
      padding .25em
      margin .25em

    dd
      flex 4
      padding .25em
      margin .25em
      background-color rgba(white, .5)
      white-space pre
      font-family monospace


.pathicles
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  overflow hidden


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
