/* eslint-env browser */

<template lang="pug">
  .pathicles__scroll-container(ref="scrollContainer" :key="presetName"
    :style="{height: scrollHeight}")
    .pathicles__container(
      ref="container"
      :style="cssStyles")
      canvas(ref="canvas" :style="cssStyles" :width="canvasWidth" :height="canvasHeight")
      <!--    .legend-->
      <!--      dl-->
      <!--        dt Particle type-->
      <!--        dl electrons-->
      <!--        dt electric field-->
      <!--        dl 0-->
      <!--        dt magnetic field-->
      <!--        dl 0-->
</template>

<script>
import { ReglSimulatorInstance } from '@pathicles/core'
import { config } from '@pathicles/config'

export default {
  name: 'PathiclesSimulator',
  props: {
    presetName: {
      type: String,
      default: () => 'storyElectric'
    },
    maxScreenWidth: {
      type: Number,
      default: 300
    },
    maxScreenHeight: {
      type: Number,
      default: 600
    },
    scrollFactor: {
      type: Number,
      default: 1
    },
    maxPixelRatio: {
      type: Number,
      default: 2
    },
    pixelRatio: {
      type: Number,
      default: 2
    }
  },
  data: () => {
    return {
      screenWidth: 600,
      screenHeight: 600,
      progress: 0.5,
      cameraMode: 'free',
      viewRange: [0, 1]
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
      this.screenWidth = window.innerWidth
      this.screenHeight = window.innerHeight

      this.reglInstance = new ReglSimulatorInstance({
        canvas: this.$refs.canvas,
        config: config(this.$route.params.preset || this.presetName),
        pixelRatio: this.pixelRatio,
        simulate: true,
        control: {
          viewRange: this.viewRange,
          progress: this.progress,
          cameraMode: this.cameraMode
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
    }
    // setCameraMode(cameraMode) {
    //   this.cameraMode = cameraMode
    //   this.reglInstance.control.cameraMode = cameraMode
    // },
    // onScroll() {
    //   this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    //   const p = this.offsetTop / (this.scrollyHeight - window.innerHeight)
    //   this.progress = p > 1 ? 1 : p
    //   this.reglInstance.control.viewRange = [0, p]
    //   this.reglInstance.control.progress = p
    //   this.reglInstance.story.setPosition(p * 9)
    // }
  }
}
</script>

<style lang="stylus">

body
  margin 0

.pathicles__control-container
  height: 100vh
  overflow scroll
  position: fixed
  top 0
  left 0
  z-index 1000

.legend
  position fixed
  dl {
    display: flex;
    flex-flow: column;
    border: solid #333;
    border-width: 1px 1px 0 0;
  }
  dt {
  flex-basis: 20%;
  padding: 2px 4px;
  background: #333;
  text-align: right;
  color: #fff;
  }
  dd {
  flex-basis: 70%;
  flex-grow: 1;
  margin: 0;
  padding: 2px 4px;
  border-bottom: 1px solid #333;
  }


.pathicles__container
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%) scale(1);

  canvas
    image-rendering crisp-edges
</style>
