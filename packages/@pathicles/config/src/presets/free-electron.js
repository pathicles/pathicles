import defaultConfig from './_default'

export const freeElectron = {
  name: 'free-electron',
  view: {
    camera: {
      center: [0, 0, 0.5],
      distance: 2,
      phi: (15 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI
    }
  },

  runner: {
    prerender: false,
    loops: 10,
    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 11
  },

  model: {
    bufferLength: 11,
    iterationStepDurationOverC: 0.1,
    emitter: {
      position: [
        0,
        (defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight) /
          2,
        0
      ],
      direction: [0, 0, 1],
      particleSeparation: 0.0,
      gamma: 10,
      particleCount: 1,
      particleType: 'PROTON'
    }
  }
}
