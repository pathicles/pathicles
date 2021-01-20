/* eslint-env browser */

<template lang="pug">
.pathicles.pathicles-simulator(ref="scrollContainer")
  hotkeys(:shortcuts="['I', 'D']"
    :debug="true"
    @triggered="onTriggeredEventHandler")

  dl.info(v-if="showInfoInternal")
    div(v-for="(value, key) in info" :key="key")
      dt {{ key }}
      dd {{ value }}
  .canvas-container(ref="canvasContainer")
    canvas#canvas(ref="canvas" :style="canvasStyles" :width="canvasWidth" :height="canvasHeight")
</template>

<script>
import { ReglSimulatorInstance } from '@pathicles/core'
import { config as loadConfig } from '@pathicles/config'
import { unwatchViewport, watchViewport } from 'tornis'
import Hotkeys from './Hotkeys.vue'

export default {
  name: 'Pathicles',
  components: { Hotkeys },

  props: {
    presetName: {
      type: String,
      default: 'story-dipole'
    },
    showInfo: {
      type: Boolean,
      default: false
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
  data: function () {
    return {
      showInfoInternal: this.showInfo,
      progress: 0.5,
      viewRange: [0, 1],
      config: {},
      containerHeight: 0,
      containerWidth: 0,
      info: null,
      story: {
        scenes: []
      }
    }
  },
  computed: {
    pixelRatio() {
      return Math.min(
        window.devicePixelRatio,
        this.maxCanvasWidth / this.containerHeight
      )
    },
    canvasStyles() {
      return {
        width: this.containerWidth + 'px',
        height: this.containerHeight + 'px'
      }
    },
    canvasWidth() {
      return this.containerWidth * this.pixelRatio
    },
    canvasHeight() {
      return this.containerHeight * this.pixelRatio
    }
  },
  mounted() {
    // getGPUTier().then((tier) => {
    //   console.log(tier)
    // window.addEventListener('resize', this.onWindowResize)
    watchViewport(this.handleViewportChange, true)
    this.loadConfig()

    this.$nextTick(() => {
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
  unmounted() {
    unwatchViewport(this.handleViewportChange)
    this.reglInstance.destroy()
  },

  methods: {
    onTriggeredEventHandler(payload) {
      if (payload.keyString === 'I') {
        this.showInfoInternal = !this.showInfoInternal
        console.log(payload.keyString === 'I', this.showInfoInternal)
      }

      console.log(`You have pressed CMD (CTRL) + ${payload.keyString}`)
    },
    loadConfig() {
      this.config = loadConfig(this.presetName)
      this.info = {
        np: this.config.model.emitter.particleCount,
        ns: this.config.runner.snapshotCount,
        n: this.config.runner.iterations,
        dt: this.config.runner.iterationDurationOverC + ' c',
        ɣ: this.config.model.emitter.gamma.toString().replace(/=>/, '=>\n')
      }
    },
    handleViewportChange({ size, scroll }) {
      if (size.changed) {
        this.containerWidth = this.$refs.canvasContainer.clientWidth
        this.containerHeight = this.$refs.canvasContainer.clientHeight
        this.storyHeight = this.$refs.scrollContainer.clientHeight
        if (this.reglInstance) this.reglInstance.resize()
      }

      if (scroll.changed) {
        this.progress = scroll.top + this.containerHeight / this.storyHeight
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
//dl
//  display none

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
    width: 100vw
    position absolute
    top 0
    left 0
    z-index 1000

    canvas
      image-rendering crisp-edges

  .pathicles-simulator
    touch-action pinch-zoom
</style>
