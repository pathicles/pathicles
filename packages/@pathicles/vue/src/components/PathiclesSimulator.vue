/* eslint-env browser */

<template lang="pug">
  div
    select(v-model="presetName" v-on:change="onChange($event)")
      option(v-for="p of presets" :value="p.name" :selected="p === presetName" ) {{p.name}}
    .pathicles__scroll-container(ref="scrollContainer"
      :style="{height: scrollHeight}")
      .pathicles__container(
        ref="container"
        :style="cssStyles")
        canvas(ref="canvas" :style="cssStyles" :width="canvasWidth" :height="canvasHeight")

</template>

<script>
import { ReglSimulatorInstance } from '@pathicles/core'
import { config as loadConfig, presets } from '@pathicles/config'
import * as dat from 'dat.gui'
export default {
  name: 'PathiclesSimulator',
  props: {
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
      viewRange: [0, 1],
      presets,
      presetName: 'story-electric',
      config: {}
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
      const parsedUrl = new URL(window.location.href)
      if (parsedUrl.searchParams.get('presetName') !== null)
        this.presetName = parsedUrl.searchParams.get('presetName')

      this.config = loadConfig(this.presetName)

      this._gui = this.initGui(loadConfig(this.presetName))
      this.screenWidth = window.innerWidth
      this.screenHeight = window.innerHeight

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
    }
    this.$nextTick(() => {
      this.scrollyHeight = this.$refs.scrollContainer.clientHeight
    })
  },
  destroyed() {
    if (typeof window !== 'undefined' && window.document) {
      this.reglInstance.destroy()
      this._gui.destroy()
    }
  },

  methods: {
    handleResize() {
      this.scrollyHeight = document.documentElement.clientHeight
    },
    onChange() {
      const params = { presetName: this.presetName }
      history.pushState(
        {},
        null,
        this.$route.path +
          '?' +
          Object.keys(params)
            .map(key => {
              return (
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
              )
            })
            .join('&')
      )
      this.config = loadConfig(this.presetName)
      this.reglInstance.loadConfig(this.config)
    },
    update() {
      this.reglInstance.loadConfig(this.config)
    },

    initGui(config) {
      console.log(config)

      const guiDatValues = (this.guiDatValues = {
        stepCount: 128,
        tickDuration__c_1: 0.1,
        stepHistoryLength: 128,
        ticksPerFrame: 2,
        looping: config.runner.looping,
        prerender: config.runner.prerender,
        stepWise: config.runner.mode,
        particleType: config.model.emitter.particleType,
        bunchShape: config.model.emitter.bunchShape,
        particleCount: config.model.emitter.particleCount,
        electricField_z: config.model.interactions.electricField[2],
        magneticField_y: config.model.interactions.magneticField[1],
        electricFieldStrength: 0,
        particleInteraction: false,
        particleSeparation: 1e-1
      })

      const update = this.update
      const gui = new dat.GUI({
        // load: guiDatPreset,
        width: 300,
        closed: false,
        closeOnTop: false
      })
      gui.remember(this.guiDatValues)

      this.guiFolders = {}
      this.controllers = {}

      this.guiFolders.integrator = gui.addFolder('Integrator')

      // this.guiFolders.integrator.add(this._parentConfiguration, 'changeBunch')
      // this.guiFolders.integrator.add(this._parentConfiguration, 'start')
      // this.guiFolders.integrator.add(this._parentConfiguration, 'stop')
      // this.guiFolders.integrator
      //   .add(configuration,
      //     'integrator',
      //     {
      //       'simple': "simple",
      //       'Boris': "boris",
      //     }
      //   )
      // .onChange(() => { update(guiDatValues, true) })

      this.guiFolders.integrator
        .add(guiDatValues, 'stepCount', 0, 512)
        .step(1)
        .onFinishChange(() => {
          this.configuration = guiDatValues
        })
      // this.guiFolders.integrator.add(guiDatValues, 'name')
      // .onFinishChange(() => { update(guiDatValues, true) })

      this.guiFolders.integrator.add(guiDatValues, 'tickDuration__c_1', {
        '.01/c': 0.01,
        '.1/c': 0.1,
        '.25/c': 0.25,
        '.5/c': 0.5,
        '.75/c': 0.75,
        '1/c': 1
      })
      // .onChange(() => { update(guiDatValues, true) })

      this.guiFolders.integrator
        .add(guiDatValues, 'stepHistoryLength', 0, 512)
        .step(2)
      // .onFinishChange(() => { update(guiDatValues, true) })
      this.guiFolders.integrator
        .add(guiDatValues, 'ticksPerFrame', 1, 10)
        .step(1)
        .onChange(() => {
          // update(guiDatValues, true)
        })

      this.controllers.looping = this.guiFolders.integrator
        .add(guiDatValues, 'looping')
        .onChange(() => {
          this._parentConfiguration.looping = guiDatValues.looping
        })

      this.controllers.stepWise = this.guiFolders.integrator
        .add(guiDatValues, 'stepWise')
        .onChange(() => {
          this._parentConfiguration.stepWise = guiDatValues.stepWise
        })

      this.guiFolders.bunch = gui.addFolder('Bunch')

      this.guiFolders.bunch.add(guiDatValues, 'particleCount', 1, 512).step(1)
      // .onFinishChange(() => { console.log(); update(guiDatValues, true) })

      this.guiFolders.bunch.add(guiDatValues, 'particleType', {
        ELECTRON: 'electrons',
        PROTON: 'protons',
        PHOTON: 'photons',
        'PHOTON ELECTRON PROTON': 'PHOTON ELECTRON PROTON'
      })
      // .onFinishChange(() => { update(guiDatValues, true) })

      this.guiFolders.bunch.add(guiDatValues, 'bunchShape', {
        row: 'ROW',
        // 'column': "column",
        // 'cross': "cross",
        square: 'SQUARE'
        // 'disc': "disc",
      })
      // .onFinishChange(() => { update(guiDatValues, true) })

      this.guiFolders.bunch.add(guiDatValues, 'particleSeparation', {
        '.1 m': 1e-1,
        '10 mm': 1e-2,
        '20 mm': 2e-2,
        '1 mm': 1e-3,
        '1 µm': 1e-6,
        '1 nm': 1e-9
      })
      // .onFinishChange(() => { update(guiDatValues, true) })

      // this.guiFolders.bunch.add(guiDatValues, 'emitterZ', -0.5, 0.5).step(0.1)
      // .onFinishChange(() => { update(guiDatValues, false) })

      // this.guiFolders.bunch.add(guiDatValues, 'emitterDirection', {
      //   '0, 0, 1': [0, 0, 1],
      //   '0, .1, 1': [0, 0.1, 1]
      // })
      // this.guiFolders.bunch.add(guiDatValues, 'relativeEmitterDirectionJitter', {
      //   "0, 0, 0": [0, 0, 0],
      //   "0.1, 0.1, 0": [0.1, 0.1, 0],
      //   "0.1, 0, 0": [0.1, 0, 0],
      // })
      // .onFinishChange(() => { update(guiDatValues, true) })

      // this.guiFolders.bunch.add(guiDatValues, 'bunchVelocityZ', .0, 1.0)
      // .onFinishChange(() => { update(guiDatValues, true) })

      // this.guiFolders.bunch.add(guiDatValues, 'gamma', 1, 100000).onFinishChange(() => { update(guiDatValues, false) })
      // this.guiFolders.bunch.add(guiDatValues, 'gamma', {
      //   '1': 1,
      //   '2': 2,
      //   '3': 3,
      //   '4': 4,
      //   '5': 5,
      //   '10': 10,
      //   '100': 100,
      //   '2000': 2000,
      //   '1000': 1000,
      //   '10000': 10000
      // })
      // .onFinishChange(() => { update(guiDatValues, true) })

      this.guiFolders.interaction = gui.addFolder('Interaction')

      this.guiFolders.interaction
        .add(guiDatValues, 'particleInteraction')
        .onFinishChange(() => {
          update(guiDatValues, false)
        })

      this.guiFolders.interaction
        .add(guiDatValues, 'electricField_z', {
          '0.0000001': 0.0000001,
          '0.000001': 0.000001,
          '0.00001': 0.00001,
          '0.0001': 0.0001,
          '0.001': 0.001,
          '0.01': 0.01,
          '0': 0,
          '1': 1,
          '10': 10,
          '100': 100,
          '1000': 1000,
          '10000': 10000,
          '100000': 100000,
          '1000000': 1000000,
          '10000000': 10000000,
          '100000000': 100000000
        })
        .onChange(() => {
          update(guiDatValues, false)
        })

      this.guiFolders.interaction
        .add(guiDatValues, 'magneticField_y', {
          // '.0000001': 0.0000001,
          // '0.000001': 0.000001,
          // '0.00001': 0.00001,
          // '0.0001': 0.0001,
          '.001': 0.001,
          '.01': 0.01,
          '.5': 0.5,
          '.1': 0.1,
          '0': 0,
          '1': 1,
          '10': 10
          // '100': 100,
          // '1000': 1000,
          // '10000': 10000,
          // '100000': 100000,
          // '1000000': 1000000,
          // '10000000': 10000000,
        })
        .onChange(() => {
          update(guiDatValues, false)
        })

      // this.guiFolders.interaction
      //   .add(guiDatValues, 'dipole_minZ', -100, 100)
      //   .onFinishChange(() => {
      //     update(guiDatValues)
      //   })
      // this.guiFolders.interaction
      //   .add(guiDatValues, 'dipole_maxZ', -100, 100)
      //   .onFinishChange(() => {
      //     update(guiDatValues)
      //   })

      // var this.guiFolders.interaction = gui.addFolder('quadrupole')
      //     this.guiFolders.interaction.add(guiDatValues,
      //       'quadrupoleStrength',
      //       {
      //         // '.0000001': 0.0000001,
      //         // '0.000001': 0.000001,
      //         // '0.00001': 0.00001,
      //         // '0.0001': 0.0001,
      //         '.001': 0.001,
      //         '.01': 0.01,
      //         '.1': 0.1,
      //         '0': 0,
      //         '1': 1,
      //         '10': 10,
      //         // '100': 100,
      //         // '1000': 1000,
      //         // '10000': 10000,
      //         // '100000': 100000,
      //         // '1000000': 1000000,
      //         // '10000000': 10000000,
      //       },
      //       )
      //       .onChange(() => { update(guiDatValues, false) })
      //
      //
      // this.guiFolders.interaction.add(
      //   guiDatValues,
      //   'quadrupole_1_strength',
      //   0,
      //   10000.0
      // )
      // this.guiFolders.interaction.add(
      //   guiDatValues,
      //   'quadrupole_1_minZ',
      //   0,
      //   10.0
      // )
      // this.guiFolders.interaction.add(
      //   guiDatValues,
      //   'quadrupole_1_maxZ',
      //   0,
      //   10.0
      // )
      // this.guiFolders.interaction.add(
      //   guiDatValues,
      //   'quadrupole_1_rotated',
      //   0,
      //   10.0
      // ) /
      //   this.guiFolders.interaction.add(
      //     guiDatValues,
      //     'quadrupole_2_strength',
      //     0,
      //     10000.0
      //   )
      // this.guiFolders.interaction.add(
      //   guiDatValues,
      //   'quadrupole_2_minZ',
      //   0,
      //   10.0
      // )
      // this.guiFolders.interaction.add(
      //   guiDatValues,
      //   'quadrupole_2_maxZ',
      //   0,
      //   10.0
      // )
      // this.guiFolders.interaction.add(
      //   guiDatValues,
      //   'quadrupole_2_rotated',
      //   0,
      //   10.0
      // )
      //     this.guiFolders.interaction.add(guiDatValues,
      //       'quadrupoleLength', 0, 1.0).onFinishChange(() => { update(guiDatValues) })

      //   this.guiFolders.view = gui.addFolder('view')
      //
      //   this.guiFolders.view
      //     .add(guiDatValues, 'pathicleWidth', {
      //       '0.3': 0.3,
      //       '0.2': 0.2,
      //       '0.1': 0.1,
      //       '0.01': 0.01
      //     })
      //     .onChange(() => {
      //       update(guiDatValues, false)
      //     })
      //
      //   this.controllers.cameraX = this.guiFolders.view.add(
      //     guiDatValues,
      //     'cameraX',
      //     -1.9,
      //     2
      //   )
      //   this.controllers.cameraY = this.guiFolders.view.add(
      //     guiDatValues,
      //     'cameraY',
      //     -2,
      //     2
      //   )
      //   this.controllers.cameraZ = this.guiFolders.view.add(
      //     guiDatValues,
      //     'cameraZ',
      //     -2,
      //     2
      //   )
      //   this.controllers.targetX = this.guiFolders.view.add(
      //     guiDatValues,
      //     'targetX',
      //     -1.9,
      //     2
      //   )
      //   this.controllers.targetY = this.guiFolders.view.add(
      //     guiDatValues,
      //     'targetY',
      //     -2,
      //     2
      //   )
      //   this.controllers.targetZ = this.guiFolders.view.add(
      //     guiDatValues,
      //     'targetZ',
      //     -2,
      //     2
      //   )
      return gui
    }
  }
}
</script>

<style lang="stylus">

select
  position absolute
  z-index 10000
  top 0

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
