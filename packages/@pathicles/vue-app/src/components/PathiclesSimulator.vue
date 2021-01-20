/* eslint-env browser */

<template lang="pug">
.pathicles.pathicles-simulator(ref="scrollContainer")
  pathicles-params
  dl.debug.debug-only
    div(v-for="(value,  key) in info" :key="key")
      dt {{ key }}
  .canvas-container(ref="container")
      canvas#canvas(ref="canvas" :style="canvasStyles" :width="canvasWidth" :height="canvasHeight")
      <!--      dat-gui(:model="configModel" @change="onChange")-->
</template>

<script>
import PathiclesParams from './PathiclesParams'
import { ReglSimulatorInstance } from '@pathicles/core'
import { config as loadConfig } from '@pathicles/config'
import { unwatchViewport, watchViewport } from 'tornis'

export default {
  name: 'PathiclesSimulator',

  components: { PathiclesParams },

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
    handleViewportChange({ size, scroll }) {
      if (size.changed) {
        this.windowWidth = size.x
        this.windowHeight = size.y
        this.storyHeight = this.$refs.scrollContainer.clientHeight
        if (this.reglInstance) this.reglInstance.resize()
      }

      if (scroll.changed) {
        this.progress = scroll.top + this.windowHeight / this.storyHeight
        if (this.reglInstance) {
          this.reglInstance.story.setPosition(this.progress)
          this.activeScene = this.reglInstance.story.getState().sceneIdx
          this.sceneProgress = this.reglInstance.story
            .getState()
            .sceneProgress.toFixed(2)
        }

        if (scroll.changed || size.changed) {
          this.vp = {
            // sceneCount: this.story.scenes.length,
            scene: this.activeScene + '/' + this.story.scenes.length,
            sceneProgress: this.sceneProgress,
            progress: this.progress.toFixed(2)
            // storyHeight: this.storyHeight,
            // duration: this.story.scenes.duration,
            // dt: this.duration,
            // scrollTop: scroll.top + this.screenHeight
          }
        }
      }
    }
  },

  watch: {
    presetName() {
      this.config = loadConfig(this.presetName)
      this.reglInstance.loadConfig(this.config)
    }
  }
  // onChange() {
  //   const params = { presetName: this.presetName }
  //   if (this.presetName !== 'story') {
  //     history.pushState(
  //       {},
  //       null,
  //       this.$route.path +
  //         '?' +
  //         Object.keys(params)
  //           .map((key) => {
  //             return (
  //               encodeURIComponent(key) +
  //               '=' +
  //               encodeURIComponent(params[key])
  //             )
  //           })
  //           .join('&')
  //     )
  //   } else {
  //     this.$router.push('story')
  //     // history.pushState({}, null, '/story')
  //   }
  //   this.config = loadConfig(this.presetName)
  //   this.reglInstance.loadConfig(this.config)
  // }
  // update(configModel) {
  //   this.config.model.interactions.electricField = [
  //     0,
  //     0,
  //     parseFloat(configModel.electricField_z)
  //   ]
  //   this.config.model.interactions.magneticField = [
  //     0,
  //     parseFloat(configModel.magneticField_y),
  //     0
  //   ]
  //   this.reglInstance.loadConfig(this.config)
  // }
  // initGui(config) {
  //   config
  // }
}
</script>

<style lang="stylus">

//.pathicles
//  position fixed
//  top 0
//  left 0
//  bottom 0
//  right 0
//  overflow hidden
//
//  select
//    position fixed
//    z-index 10000
//    top 0
//    left 0
//    right 0
//    padding 1em
//    font-size 16px
//    width 100%
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
</style>
