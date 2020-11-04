export const freeElectron = {
  name: 'free-electron',
  view: {
    camera: {
      eye: [2, 0.25, 2],
      center: [0, 0, 0.5]
    }
  },

  runner: {
    prerender: true,
    loops: 0,

    mode: 'stepwise',
    stepsPerTick: 1,
    stepCount: 11
  },

  model: {
    bufferLength: 11,
    tickDurationOverC: 0.1,
    emitter: {
      position: [0, 0.01, 0],
      direction: [0, 0, 1],
      particleSeparation: 0.0,
      gamma: 10,
      particleCount: 1,
      particleType: 'ELECTRON'
    }
  }
}
