export const freePhoton = {
  name: 'free-photon',
  view: {
    camera: {
      eye: [2.5, 1.5, 2.5],
      center: [0, 1, 0]
    }
  },

  runner: {
    prerender: false,
    loops: 0,

    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 1
  },

  model: {
    bufferLength: 2,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 256,
      particleType: 'PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 1, 0],
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
