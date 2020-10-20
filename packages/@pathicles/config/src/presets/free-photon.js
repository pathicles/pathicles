export const freePhoton = {
  name: 'free-photon',
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
      particleCount: 20,
      particleType: 'PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 0.2, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 0
    },

    interactions: {
      electricField: [0, 0, 0.01],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
}
