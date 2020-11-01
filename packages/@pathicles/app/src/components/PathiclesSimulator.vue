/* eslint-env browser */

<template lang="pug">
.pathicles.pathicles-simulator(ref="scrollContainer")
  .configurator
    select(v-model="presetName" v-on:change="onChange($event)")
      option(v-for="p of presets" :value="p.name" :selected="p === presetName" ) {{p.name}}
      option(value="story" ) STORY
  .canvas-container(ref="container")
    canvas(ref="canvas" :style="canvasStyles" :width="canvasWidth" :height="canvasHeight")
    <!--      dat-gui(:model="configModel" @change="onChange")-->
</template>

<script>
import { ReglSimulatorInstance } from '@pathicles/core'
import { config as loadConfig, presets } from '@pathicles/config'
// import { getGPUTier } from 'detect-gpu'
// import DatGUI from './DatGUI'
export default {
  name: 'PathiclesSimulator',
  props: {
    maxScreenWidth: {
      type: Number,
      default: 1000
    },
    maxScreenHeight: {
      type: Number,
      default: 1000
    },
    maxPixelRatio: {
      type: Number,
      default: 2
    }
  },
  data: () => {
    return {
      screenWidth: 500,
      screenHeight: 500,
      progress: 0.5,
      cameraMode: 'free',
      viewRange: [0, 1],
      presets,
      presetName: 'story-electric',
      config: {},
      configModel: {}
    }
  },
  computed: {
    pixelRatio() {
      return !window || Math.min(this.maxPixelRatio, window.devicePixelRatio)
    },
    width() {
      return Math.min(this.screenWidth, this.maxScreenWidth)
    },
    height() {
      return Math.min(this.screenHeight, this.maxScreenHeight)
    },
    canvasStyles() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    },
    canvasWidth() {
      return this.width * this.pixelRatio
    },
    canvasHeight() {
      return this.height * this.pixelRatio
    }
  },
  unmounted() {
    this.reglInstance.destroy()
  },
  mounted() {
    // getGPUTier().then((tier) => {
    //   console.log(tier)

    const parsedUrl = new URL(window.location.href)
    if (parsedUrl.searchParams.get('presetName') !== null)
      this.presetName = parsedUrl.searchParams.get('presetName')

    this.config = loadConfig(this.presetName)

    if (parsedUrl.searchParams.get('prerender')) {
      this.config.runner.prerender = true
    }

    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight

    this.$nextTick(() => {
      this.reglInstance = new ReglSimulatorInstance({
        canvas: this.$refs.canvas,
        config: this.config,
        pixelRatio: this.pixelRatio,
        simulate: true,
        control: {
          viewRange: this.viewRange,
          progress: this.progress,
          cameraMode: this.cameraMode
        }
      })
      //this.scrollyHeight = this.$refs.scrollContainer.clientHeight
    })
    // })
  },

  methods: {
    handleResize() {
      this.scrollyHeight = document.documentElement.clientHeight
    },
    onChange() {
      const params = { presetName: this.presetName }
      if (this.presetName !== 'story') {
        history.pushState(
          {},
          null,
          this.$route.path +
            '?' +
            Object.keys(params)
              .map((key) => {
                return (
                  encodeURIComponent(key) +
                  '=' +
                  encodeURIComponent(params[key])
                )
              })
              .join('&')
        )
      } else {
        this.$router.push('story')
        // history.pushState({}, null, '/story')
      }
      this.config = loadConfig(this.presetName)
      // console.log(this.config)
      this.reglInstance.loadConfig(this.config)
    },
    update(configModel) {
      this.config.model.interactions.electricField = [
        0,
        0,
        parseFloat(configModel.electricField_z)
      ]
      this.config.model.interactions.magneticField = [
        0,
        parseFloat(configModel.magneticField_y),
        0
      ]
      this.reglInstance.loadConfig(this.config)
    }
    // initGui(config) {
    //   config
    // }
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

  .configurator
    padding 1em

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
