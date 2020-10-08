export const freeElectron = {
  name: 'free-electron',
  view: {
    camera: {
      position: [2.5, 0.2, 2.5],
      target: [0, 0, 0]
    }
  },

  runner: {
    prerender: false,
    loops: 0,

    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 11
  },

  model: {
    bufferLength: 11,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 0.01, 0],
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
