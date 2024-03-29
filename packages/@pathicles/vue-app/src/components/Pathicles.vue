/* eslint-env browser */

<template lang="pug">
.pathicles(:class='{ "is-interactive": isInteractive }', ref='scrollContainer')
  .interaction-overlay
    .button(@click='isInteractive = !isInteractive') Start
    hotkeys(
    :shortcuts='["I", "D", "A", "M", "N", "L", "S", "T", " "]',
    :debug='false',
    @triggered='onTriggeredEventHandler'
  )
  .info(v-if='showInfo')
    label preset
      select(v-model='presetName')
        option(value='story') STORY
        option(
          v-for='name of Object.keys(presets)',
          :value='name',
          :selected='name === presetName'
        ) {{ name }}
    dl.info
      div(v-for='(value, key) in info', :key='key')
        dt {{ key }}
        dd {{ value }}
  .canvas-container(ref='canvasContainer')
    canvas#canvas(
      ref='canvas',
      :style='canvasStyles',
      :height='canvasHeight',
      :width='canvasWidth'
    )
</template>

<script setup lang="ts">
import { ReglSimulatorInstance } from '@pathicles/core'
// import { ReglSimulatorInstance } from './../../../core/src/lib/simulation/simulator.js'
import { presets, config as loadConfig } from '@pathicles/config'
import Hotkeys from './Hotkeys.vue'
import saveCanvas from './saveCanvas.js'
import {
  watch,
  computed,
  ref,
  defineComponent,
  onMounted,
  nextTick,
  onUnmounted
} from 'vue'
import {
  useElementSize,
  useWindowFocus,
  watchWithFilter,
  debounceFilter
} from '@vueuse/core'

const props = defineProps({
  pusher: {
    type: String
  },
  particleCount: {
    type: Number
  },
  snapshotCount: {
    type: Number
  },
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
})
const focused = useWindowFocus()
const showInfo = ref(props.showInfo)

const canvasContainer = ref(null)
const canvas = ref(null)

const { width: canvasContainerWidth, height: canvasContainerHeight } =
  useElementSize(canvasContainer)
const canvasStyles = computed(() => ({
  width: canvasContainerWidth.value + 'px',
  height: canvasContainerHeight.value + 'px'
}))

const pixelRatio = computed(() =>
  Math.min(window.devicePixelRatio, props.maxPixelRatio)
)
const canvasWidth = computed(
  () => canvasContainerWidth.value * pixelRatio.value
)
const canvasHeight = computed(
  () => canvasContainerHeight.value * pixelRatio.value
)

const isInteractive = ref(!props.clickToInteract)

const config = ref({ debug: {}, runner: {}, model: { emitter: {} } })
const presetName = ref(props.presetName)
const reglInstance = ref(null)
onMounted(() => {
  nextTick(() => {
    loadPreset(presetName.value)

    reglInstance.value = new ReglSimulatorInstance({
      canvas: canvas.value,
      configuration: config.value,
      control: {
        // viewRange: this.viewRange,
        // cameraMode: this.cameraMode
      }
    })
  })
})

watchWithFilter(
  canvasContainerWidth,
  () => {
    reglInstance && reglInstance.value && reglInstance.value.resize()
  },
  {
    eventFilter: debounceFilter(100)
  }
)

watch(focused, () => {
  // reglInstance &&
  //   reglInstance.value &&
  //   reglInstance.value.runner.toggleActivity()
})

watch(presetName, () => {
  let url = new URL(window.location.href)

  let params = new URLSearchParams(url.search)
  params.set('presetName', presetName.value)
  history.pushState(
    {},
    null,
    document.location.pathname + '?' + params.toString()
  )

  loadPreset(presetName.value)
  reglInstance.value.loadConfig(config.value)
})

const info = computed(() => ({
  pusher: config.value.runner.pusher,
  particles: config.value.model.emitter.particleCount,
  snapshots: config.value.runner.snapshotCount,
  prerender: config.value.runner.prerender,
  snapshotsPerTick: config.value.runner.snapshotsPerTick,
  iterationsPerSnapshot: config.value.runner.iterationsPerSnapshot,
  iterations: config.value.runner.iterationCount,
  dt: config.value.runner.iterationDurationOverC + ' c',
  ɣ: config.value.model.emitter.gamma // .toString().replace(/=>/, '=>\n')
}))

const loadPreset = (presetName: String) => {
  config.value = loadConfig(presetName)

  showInfo.value = config.value.debug.showInfo
  if (props.particleCount)
    config.value.model.emitter.particleCount = props.particleCount
  if (props.snapshotCount)
    config.value.runner.snapshotCount = props.snapshotCount
  if (props.pusher) config.value.runner.pusher = props.pusher
  if (props.prerender) config.value.runner.prerender = props.prerender
}

onUnmounted(() => {
  // reglInstance.value.destroy()
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'Pathicles',

  methods: {
    onTriggeredEventHandler(payload) {
      if (payload.keyString === 'I') {
        this.showInfo = !this.showInfo
      } else if (payload.keyString === 'A') {
        this.reglInstance.camera.toggleAutorotate()
      } else if (payload.keyString === 'D') {
        console.log(this.reglInstance.simulation.dump())
        console.log(this.reglInstance.camera)
      } else if (payload.keyString === 'M') {
        // m for mode
        this.reglInstance.runner.toggleMode()
      } else if (payload.keyString === 'T') {
        // t for texture
        this.reglInstance.toggleShowTextures()
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
        this.reglInstance.runner.next()
      } else if (payload.keyString === 'L') {
        // l for loop
        this.reglInstance.runner.toggleLooping()
      } else if (payload.keyString === ' ') {
        // SPACE for Start/stop or nextStep

        this.reglInstance.runner.toggleActivity()
      }
    }
  }
})
</script>

<style lang="stylus">
.is-interactive
  .interaction-overlay
    display none

.interaction-overlay
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(white, 0.5)
  z-index 10000
  content ' '
  display flex
  justify-content center
  align-items center

  .button
    // position absolute
    // top 50%
    // left 50%
    box-shadow inset 0 1px 0 0 #ffffff
    background-color #ffffff
    border-radius 6px
    border 1px solid #dcdcdc
    display inline-block
    cursor pointer
    color #666666
    font-family Arial
    font-size 19px
    font-weight bold
    padding 13px 24px
    text-decoration none
    text-shadow 0 1px 0 #ffffff

  .button:hover
    background-color #f6f6f6

  .button:active
    position relative
    top 1px


.info
  width 200px
  height 100vh
  background-color rgba(gray, 0.5)
  z-index 10000
  position fixed

  select
    margin-left 1rem
    width 8.75rem
    cursor pointer
    display inline-block
    position relative
    font-size 15px
    color black
    border none


dl
  margin-top 2em
  margin-left 0

  div
    // width 11rem
    display flex
    // font-size 14px

    dt
      flex 0 0 1rem
      background-color rgba(white, 0.5)
      text-align right
      padding 0.25em
      margin 0.25em

    dd
      flex 4
      padding 0.25em
      margin 0.25em
      background-color rgba(white, 0.5)
      white-space pre


.pathicles
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  overflow hidden

.canvas-container
  height 100vh
  width 100vw

.pathicles-simulator
  touch-action pinch-zoom
</style>
