<template lang="pug">
.pathicles.pathicles-simulator
  pathicles-params( :presetName="presetName" :prerender="prerender")
  .debug.debug-only {{vp}}
  .pathicles.pathicles-simulator(ref="scrollContainer")
    .canvas-container(ref="container")
      canvas#canvas(ref="canvas" :style="canvasStyles" :width="canvasWidth" :height="canvasHeight")
</template>

<script>
import { ReglSimulatorInstance } from '@pathicles/core'
import PathiclesParams from './PathiclesParams.vue'

import { unwatchViewport, watchViewport } from 'tornis'

export default {
  name: 'PathiclesSimulator',
  components: { 'pathicles-params': PathiclesParams },

  props: {
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
    },
    presetName: {
      type: String,
      default: 'free-electron'
    },
    prerender: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      progress: 0.5,
      cameraMode: 'free',
      viewRange: [0, 1],
      config: {},
      configModel: {},
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
  async mounted() {
    // getGPUTier().then((tier) => {
    //   console.log(tier)
    // window.addEventListener('resize', this.onWindowResize)

    const presetConfig = await this.$store.dispatch('LOAD_PRESET', {
      presetName: this.presetName
    })

    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    // this.params = { ...this.params, ...loadConfig(this.presetName) }
    // this.config = loadConfig(this.presetName)
    // const parsedUrl = new URL(window.location.href)
    // if (parsedUrl.searchParams.get('prerender')) {
    //   this.config.runner.prerender = true
    // }
    // if (parsedUrl.searchParams.get('debug') === '0') {
    //   this.config.view.showTextures = false
    // }

    await this.$nextTick(() => {
      watchViewport(this.handleViewportChange)
      this.reglInstance = new ReglSimulatorInstance({
        canvas: this.$refs.canvas,
        params: presetConfig,
        pixelRatio: this.pixelRatio,
        simulate: true
      })
    })
  },

  methods: {
    handleViewportChange: function ({ size }) {
      if (size.changed) {
        this.windowWidth = size.x
        this.windowHeight = size.y
        if (this.reglInstance) {
          this.reglInstance.resize()
        }
      }
    }
  }
}
</script>

<style lang="stylus">

//.pathicles
//
//  position fixed
//  top 0
//  left 0
//  bottom 0
//  right 0
//  overflow hidden
//
//  //.configurator
//  //  padding 1em
//  //  display none
//  //
//  //select
//  //  position fixed
//  //  z-index 10000
//  //  top 0
//  //  left 0
//  //  right 0
//  //  padding 1em
//  //  font-size 16px
//  //  width 100%
//
//  .canvas-container
//    height: 100vh
//    position absolute
//    top 0
//    left 0
//    z-index 1000
//
//    canvas
//      image-rendering crisp-edges
//
//  .pathicles-simulator
//    touch-action pinch-zoom

:root
  --tp-font-family "Barlow"

.tweakpane
  position absolute
  top 0
  right 0
  overflow-y scroll
  width 300px
  height 100vh
  z-index 10000


@media screen and (max-width: 600px)
  .tweakpane
    width 190px
    height 100vh
</style>
