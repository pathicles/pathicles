export const freeElectron = {
  name: 'free-electron',
  view: {
    camera: {
      eye: [2.5, 0.2, 2.5],
      center: [0, 0, 0]
    }
  },

  runner: {
    prerender: true,
    loops: 0,

    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 5
  },

  model: {
    bufferLength: 7,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'COLUMN',
      direction: [0, 0, 1],
      position: [0, 0.1, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 100
    },

    interactions: {
      electricField: [0, 0, 0.0],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
}
