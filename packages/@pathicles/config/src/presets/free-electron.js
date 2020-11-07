export const freeElectron = {
  name: 'free-electron',
  view: {
    camera: {
      distance: 5,
      center: [0, 0, 0.5]
    }
  },

  runner: {
    prerender: false,
    loops: 1,

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
