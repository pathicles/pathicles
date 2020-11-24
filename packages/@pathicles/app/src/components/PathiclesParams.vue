/* eslint-env browser */

<template lang="pug">
.tweakpane(ref="tp")
</template>

<script>
import Tweakpane from 'tweakpane'
import { config as loadConfig, presets } from '@pathicles/config'
import { DISTRIBUTIONS } from '@pathicles/core/src/lib/simulation/distributions/distributions'
import { x } from '@pathicles/docs/.vitepress/dist/_assets/common-e054aef3'

// const log = console.log
// console.log = function () {
//   for (var i in arguments)
//     if (arguments[i] instanceof Object || arguments[i] instanceof Array)
//       arguments[i] = sys.inspect(arguments[i])
//   log(Array.prototype.join.call(arguments, ' ') + '\n')
// }
export default {
  name: 'PathiclesParams',

  props: {
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
    return { model: {} }
  },
  computed: {},
  unmounted() {},
  mounted() {
    // this.$store.dispatch('LOAD_PRESET', this.presetName)
    //
    this.model = this.$store.getters['model']
    // getGPUTier().then((tier) => {
    //   console.log(tier)
    // window.addEventListener('resize', this.onWindowResize)

    this.createPane()
  },

  methods: {
    createPane() {
      // eslint-disable-next-line no-undef
      const tweakpane = new Tweakpane({
        title: 'Settings',
        expanded: true,
        container: this.$refs.tp
      })

      const fPresets = tweakpane.addFolder({
        title: 'Presets'
      })

      const propsMap = (obj) =>
        Object.keys(obj).reduce((sum, el) => {
          return {
            ...sum,
            [el]: el
          }
        }, {})

      const presetInput = fPresets.addInput(this.model, 'name', {
        options: propsMap(presets)
      })

      presetInput.on('change', (ev) => {
        // this.$vuex.dispatch('LOAD_PRESET', this.presetName)
        // // if (preset) this.model = { ...this.model, ...preset }
        //
        // console.log('params', this.$vuex.getters['params'])
        // // Object.assign(this.model, preset)
        // // Object.assign(this.model, preset)
        //
        // tweakpane.refresh()
        // console.log(model)
      })

      const fEmitter = tweakpane.addFolder({
        title: 'Emitter',
        expanded: false
      })

      fEmitter.addInput(this.model.model.emitter, 'particleCount', {
        step: 1,
        min: 1,
        max: 512
      })
      fEmitter.addInput(this.model.model.emitter, 'gamma', {
        step: 0.1,
        min: 1,
        max: 10
      })

      fEmitter.addInput(this.model.model.emitter, 'bunchShape', {
        options: propsMap(DISTRIBUTIONS)
      })

      const addVec3 = (title, parent, param, options) => {
        const folder = parent.addFolder({
          title: title
        })
        folder['addInput'](param, '0', options)
        folder['addInput'](param, '1', options)
        folder['addInput'](param, '2', options)
      }

      addVec3('position', fEmitter, this.model.model.emitter.position, {
        step: 0.1,
        min: -10,
        max: 10
      })

      addVec3('direction', fEmitter, this.model.model.emitter.position, {
        step: 0.1,
        min: -10,
        max: 10
      })

      const fView = tweakpane.addFolder({
        title: 'View',
        expanded: true
      })

      const fCamera = fView.addFolder({
        title: 'Camera',
        expanded: false
      })

      addVec3('center', fCamera, this.model.view.camera.center, {
        step: 0.1,
        min: -10,
        max: 10
      })

      const fAutorotate = fView.addFolder({
        title: 'Autorotate',
        expanded: false
      })

      fAutorotate
        .addInput(this.model.view.camera.autorotate, 'enabled')
        .on('change', (ev) => {
          this.$store._modules.root.state.view.camera.autorotate.enabled = ev

          console.log(
            this.$store._modules.root.state.view.camera.autorotate.enabled
          )
        })
      fAutorotate.addInput(this.model.view.camera.autorotate, 'dPhi', {
        label: 'dɸ [2π]',
        step: 0.1,
        min: 0,
        max: 1
      })
      fAutorotate.addInput(this.model.view.camera.autorotate, 'dTheta', {
        label: 'dθ [2π]',
        step: 0.1,
        min: 0,
        max: 2
      })

      const fPathicles = fView.addFolder({
        title: 'Pathicles',
        expanded: false
      })

      fPathicles.addInput(this.model.view.pathicle, 'width')
      fPathicles.addInput(this.model.view.pathicle, 'relativeHeight')
      fPathicles.addInput(this.model.view.pathicle, 'relativeGap')

      const fSimulation = tweakpane.addFolder({
        title: 'Simulation',
        expanded: false
      })
      fSimulation.addInput(this.model.runner, 'run')
      fSimulation.addInput(this.model.model, 'iterationDurationOverC', {
        step: 0.1,
        min: 0,
        max: 2
      })
      fSimulation.addInput(this.model.model, 'bufferLength', {
        step: 1,
        min: 1,
        max: 512
      })

      const toggleRunnerRun = () => {
        this.model.runner.run = !this.model.runner.run
        tweakpane.refresh()
      }
      const pauseBtn = tweakpane.addButton({
        title: 'Pause'
      })
      pauseBtn.on('click', toggleRunnerRun)

      const startBtn = tweakpane.addButton({
        title: 'Start'
      })
      startBtn.on('click', toggleRunnerRun)

      fSimulation.addInput(this.model.runner, 'stepwise')

      fSimulation.addInput(this.model.runner, 'iterationCount', {
        step: 1,
        min: 1,
        max: 512
      })
      fSimulation.addInput(this.model.runner, 'loops', {
        step: 1,
        min: 0,
        max: 100
      })
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
    // },
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


@media screen and (max-width: 600px)
  .tweakpane
    width 190px
    height 100vh
</style>
