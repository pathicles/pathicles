/* eslint-env browser */

<template lang="pug">
.pathicles(:class="{'is-interactive': isInteractive }" ref="scrollContainer")
  .interaction-overlay
    .button(@click="isInteractive = !isInteractive") Start
  hotkeys(:shortcuts="['I', 'D', 'A', 'M', 'N', 'L', 'S', 'T', ' ']"
    :debug="false"
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
import saveCanvas from './saveCanvas.js'

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
      default: true
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
    },
    clickToInteract: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      isInteractive: !this.clickToInteract,
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
    console.log(this.clickToInteract)
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
      } else if (payload.keyString === 'A') {
        this.reglInstance.camera.toggleAutorotate()
      } else if (payload.keyString === 'D') {
        console.log(this.reglInstance.simulation.dump())
      } else if (payload.keyString === 'M') {
        // m for mode
        this.reglInstance.pathiclesRunner.toggleMode()
      } else if (payload.keyString === 'T') {
        // t for textures
        this.reglInstance.config.debug.showTextures = !this.reglInstance.config
          .debug.showTextures
      } else if (payload.keyString === 'S') {
        // s for image
        saveCanvas(
          this.reglInstance.regl._gl.canvas,
          'pathicles' +
            (this.reglInstance.presetName
              ? '--' + this.reglInstance.presetName
              : '')
        )
      } else if (payload.keyString === 'N') {
        // n for next
        this.reglInstance.pathiclesRunner.next()
      } else if (payload.keyString === 'L') {
        // l for loop
        this.reglInstance.pathiclesRunner.toggleLooping()
      } else if (payload.keyString === ' ') {
        // SPACE for Start/stop or nextStep

        this.reglInstance.pathiclesRunner.toggleActivity()
      }
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

.is-interactive
  .interaction-overlay
    display none

.interaction-overlay
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(white, .5)
  z-index 10000
  content " "
  display flex
  justify-content center
  align-items center

  .button {
    //position absolute
    //top 50%
    //left 50%
    box-shadow: inset 0px 1px 0px 0px #ffffff;
    background-color: #ffffff;
    border-radius: 6px;
    border: 1px solid #dcdcdc;
    display: inline-block;
    cursor: pointer;
    color: #666666;
    font-family: Arial;
    font-size: 19px;
    font-weight: bold;
    padding: 13px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #ffffff;
  }

  .button:hover {
    background-color: #f6f6f6;
  }

  .button:active {
    position: relative;
    top: 1px;
  }


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
