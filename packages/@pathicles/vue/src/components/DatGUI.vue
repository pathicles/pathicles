<template></template>

<script>
import * as dat from 'dat.gui'

export default {
  name: 'dat-gui',

  props: {
    model: {
      type: Object,
      default: () => {}
    }
  },
  destroyed() {
    if (typeof window !== 'undefined' && window.document) {
      this.reglInstance.destroy()
      this._gui.destroy()
    }
  },

  mounted() {
    // const configModel = (this.configModel = {
    //   stepCount: 128,
    //   tickDuration__c_1: 0.1,
    //   stepHistoryLength: 128,
    //   ticksPerFrame: 2,
    //   looping: config.runner.looping,
    //   prerender: config.runner.prerender,
    //   stepWise: config.runner.mode,
    //   particleType: config.model.emitter.particleType,
    //   bunchShape: config.model.emitter.bunchShape,
    //   particleCount: config.model.emitter.particleCount,
    //   electricField_z: config.model.interactions.electricField[2],
    //   magneticField_y: config.model.interactions.magneticField[1],
    //   electricFieldStrength: 0,
    //   particleInteraction: false,
    //   particleSeparation: 1e-1
    // })
    //
    // const update = this.update
    // const gui = new dat.GUI({
    //   // load: guiDatPreset,
    //   width: 100,
    //   closed: true,
    //   closeOnTop: true
    // })
    // // gui.remember(this.configModel)
    //
    // this.guiFolders = {}
    // this.controllers = {}
    //
    // this.guiFolders.integrator = gui.addFolder('Integrator')
    //
    // // this.guiFolders.integrator.add(this._parentConfiguration, 'changeBunch')
    // // this.guiFolders.integrator.add(this._parentConfiguration, 'start')
    // // this.guiFolders.integrator.add(this._parentConfiguration, 'stop')
    // // this.guiFolders.integrator
    // //   .add(configuration,
    // //     'integrator',
    // //     {
    // //       'simple': "simple",
    // //       'Boris': "boris",
    // //     }
    // //   )
    // // .onChange(() => { update(configModel, true) })
    //
    // this.guiFolders.integrator
    //   .add(configModel, 'stepCount', 0, 512)
    //   .step(1)
    //   .onFinishChange(() => {
    //     this.configuration = configModel
    //   })
    // // this.guiFolders.integrator.add(configModel, 'name')
    // // .onFinishChange(() => { update(configModel, true) })
    //
    // this.guiFolders.integrator.add(configModel, 'tickDuration__c_1', {
    //   '.01/c': 0.01,
    //   '.1/c': 0.1,
    //   '.25/c': 0.25,
    //   '.5/c': 0.5,
    //   '.75/c': 0.75,
    //   '1/c': 1
    // })
    // // .onChange(() => { update(configModel, true) })
    //
    // this.guiFolders.integrator
    //   .add(configModel, 'stepHistoryLength', 0, 512)
    //   .step(2)
    // // .onFinishChange(() => { update(configModel, true) })
    // this.guiFolders.integrator
    //   .add(configModel, 'ticksPerFrame', 1, 10)
    //   .step(1)
    //   .onChange(() => {
    //     // update(configModel, true)
    //   })
    //
    // this.controllers.looping = this.guiFolders.integrator
    //   .add(configModel, 'looping')
    //   .onChange(() => {
    //     this._parentConfiguration.looping = configModel.looping
    //   })
    //
    // this.controllers.stepWise = this.guiFolders.integrator
    //   .add(configModel, 'stepWise')
    //   .onChange(() => {
    //     this._parentConfiguration.stepWise = configModel.stepWise
    //   })
    //
    // this.guiFolders.bunch = gui.addFolder('Bunch')
    //
    // this.guiFolders.bunch.add(configModel, 'particleCount', 1, 512).step(1)
    // // .onFinishChange(() => { console.log(); update(configModel, true) })
    //
    // this.guiFolders.bunch.add(configModel, 'particleType', {
    //   ELECTRON: 'electrons',
    //   PROTON: 'protons',
    //   PHOTON: 'photons',
    //   'PHOTON ELECTRON PROTON': 'PHOTON ELECTRON PROTON'
    // })
    // // .onFinishChange(() => { update(configModel, true) })
    //
    // this.guiFolders.bunch.add(configModel, 'bunchShape', {
    //   row: 'ROW',
    //   // 'column': "column",
    //   // 'cross': "cross",
    //   square: 'SQUARE'
    //   // 'disc': "disc",
    // })
    // // .onFinishChange(() => { update(configModel, true) })
    //
    // this.guiFolders.bunch.add(configModel, 'particleSeparation', {
    //   '.1 m': 1e-1,
    //   '10 mm': 1e-2,
    //   '20 mm': 2e-2,
    //   '1 mm': 1e-3,
    //   '1 µm': 1e-6,
    //   '1 nm': 1e-9
    // })
    // // .onFinishChange(() => { update(configModel, true) })
    //
    // // this.guiFolders.bunch.add(configModel, 'emitterZ', -0.5, 0.5).step(0.1)
    // // .onFinishChange(() => { update(configModel, false) })
    //
    // // this.guiFolders.bunch.add(configModel, 'emitterDirection', {
    // //   '0, 0, 1': [0, 0, 1],
    // //   '0, .1, 1': [0, 0.1, 1]
    // // })
    // // this.guiFolders.bunch.add(configModel, 'relativeEmitterDirectionJitter', {
    // //   "0, 0, 0": [0, 0, 0],
    // //   "0.1, 0.1, 0": [0.1, 0.1, 0],
    // //   "0.1, 0, 0": [0.1, 0, 0],
    // // })
    // // .onFinishChange(() => { update(configModel, true) })
    //
    // // this.guiFolders.bunch.add(configModel, 'bunchVelocityZ', .0, 1.0)
    // // .onFinishChange(() => { update(configModel, true) })
    //
    // // this.guiFolders.bunch.add(configModel, 'gamma', 1, 100000).onFinishChange(() => { update(configModel, false) })
    // // this.guiFolders.bunch.add(configModel, 'gamma', {
    // //   '1': 1,
    // //   '2': 2,
    // //   '3': 3,
    // //   '4': 4,
    // //   '5': 5,
    // //   '10': 10,
    // //   '100': 100,
    // //   '2000': 2000,
    // //   '1000': 1000,
    // //   '10000': 10000
    // // })
    // // .onFinishChange(() => { update(configModel, true) })
    //
    // this.guiFolders.interaction = gui.addFolder('Interaction')
    //
    // this.guiFolders.interaction
    //   .add(configModel, 'particleInteraction')
    //   .onFinishChange(() => {
    //     update(configModel, false)
    //   })
    //
    // this.guiFolders.interaction
    //   .add(configModel, 'electricField_z', {
    //     '0.0000001': 0.0000001,
    //     '0.000001': 0.000001,
    //     '0.00001': 0.00001,
    //     '0.0001': 0.0001,
    //     '0.001': 0.001,
    //     '0.01': 0.01,
    //     '0': 0,
    //     '1': 1,
    //     '10': 10,
    //     '100': 100,
    //     '1000': 1000,
    //     '10000': 10000,
    //     '100000': 100000,
    //     '1000000': 1000000,
    //     '10000000': 10000000,
    //     '100000000': 100000000
    //   })
    //   .onChange(() => {
    //     update(configModel, false)
    //   })
    //
    // this.guiFolders.interaction
    //   .add(configModel, 'magneticField_y', {
    //     // '.0000001': 0.0000001,
    //     // '0.000001': 0.000001,
    //     // '0.00001': 0.00001,
    //     // '0.0001': 0.0001,
    //     '.001': 0.001,
    //     '.01': 0.01,
    //     '.5': 0.5,
    //     '.1': 0.1,
    //     '0': 0,
    //     '1': 1,
    //     '10': 10
    //     // '100': 100,
    //     // '1000': 1000,
    //     // '10000': 10000,
    //     // '100000': 100000,
    //     // '1000000': 1000000,
    //     // '10000000': 10000000,
    //   })
    //   .onChange(() => {
    //     update(configModel, false)
    //   })
    //
    // // this.guiFolders.interaction
    // //   .add(configModel, 'dipole_minZ', -100, 100)
    // //   .onFinishChange(() => {
    // //     update(configModel)
    // //   })
    // // this.guiFolders.interaction
    // //   .add(configModel, 'dipole_maxZ', -100, 100)
    // //   .onFinishChange(() => {
    // //     update(configModel)
    // //   })
    //
    // // var this.guiFolders.interaction = gui.addFolder('quadrupole')
    // //     this.guiFolders.interaction.add(configModel,
    // //       'quadrupoleStrength',
    // //       {
    // //         // '.0000001': 0.0000001,
    // //         // '0.000001': 0.000001,
    // //         // '0.00001': 0.00001,
    // //         // '0.0001': 0.0001,
    // //         '.001': 0.001,
    // //         '.01': 0.01,
    // //         '.1': 0.1,
    // //         '0': 0,
    // //         '1': 1,
    // //         '10': 10,
    // //         // '100': 100,
    // //         // '1000': 1000,
    // //         // '10000': 10000,
    // //         // '100000': 100000,
    // //         // '1000000': 1000000,
    // //         // '10000000': 10000000,
    // //       },
    // //       )
    // //       .onChange(() => { update(configModel, false) })
    // //
    // //
    // // this.guiFolders.interaction.add(
    // //   configModel,
    // //   'quadrupole_1_strength',
    // //   0,
    // //   10000.0
    // // )
    // // this.guiFolders.interaction.add(
    // //   configModel,
    // //   'quadrupole_1_minZ',
    // //   0,
    // //   10.0
    // // )
    // // this.guiFolders.interaction.add(
    // //   configModel,
    // //   'quadrupole_1_maxZ',
    // //   0,
    // //   10.0
    // // )
    // // this.guiFolders.interaction.add(
    // //   configModel,
    // //   'quadrupole_1_rotated',
    // //   0,
    // //   10.0
    // // ) /
    // //   this.guiFolders.interaction.add(
    // //     configModel,
    // //     'quadrupole_2_strength',
    // //     0,
    // //     10000.0
    // //   )
    // // this.guiFolders.interaction.add(
    // //   configModel,
    // //   'quadrupole_2_minZ',
    // //   0,
    // //   10.0
    // // )
    // // this.guiFolders.interaction.add(
    // //   configModel,
    // //   'quadrupole_2_maxZ',
    // //   0,
    // //   10.0
    // // )
    // // this.guiFolders.interaction.add(
    // //   configModel,
    // //   'quadrupole_2_rotated',
    // //   0,
    // //   10.0
    // // )
    // //     this.guiFolders.interaction.add(configModel,
    // //       'quadrupoleLength', 0, 1.0).onFinishChange(() => { update(configModel) })
    //
    // //   this.guiFolders.view = gui.addFolder('view')
    // //
    // //   this.guiFolders.view
    // //     .add(configModel, 'pathicleWidth', {
    // //       '0.3': 0.3,
    // //       '0.2': 0.2,
    // //       '0.1': 0.1,
    // //       '0.01': 0.01
    // //     })
    // //     .onChange(() => {
    // //       update(configModel, false)
    // //     })
    // //
    // //   this.controllers.cameraX = this.guiFolders.view.add(
    // //     configModel,
    // //     'cameraX',
    // //     -1.9,
    // //     2
    // //   )
    // //   this.controllers.cameraY = this.guiFolders.view.add(
    // //     configModel,
    // //     'cameraY',
    // //     -2,
    // //     2
    // //   )
    // //   this.controllers.cameraZ = this.guiFolders.view.add(
    // //     configModel,
    // //     'cameraZ',
    // //     -2,
    // //     2
    // //   )
    // //   this.controllers.targetX = this.guiFolders.view.add(
    // //     configModel,
    // //     'targetX',
    // //     -1.9,
    // //     2
    // //   )
    // //   this.controllers.targetY = this.guiFolders.view.add(
    // //     configModel,
    // //     'targetY',
    // //     -2,
    // //     2
    // //   )
    // //   this.controllers.targetZ = this.guiFolders.view.add(
    // //     configModel,
    // //     'targetZ',
    // //     -2,
    // //     2
    // //   )
    // return gui
  }
}
</script>

<style scoped></style>
