export const freePhotons = {
  name: 'free-photons',
  view: {
    camera: {
      eye: [-1.5, 1, -4.5],
      center: [2, 1, 0]
    }
  },

  runner: {
    prerender: false,
    loops: 1,

    mode: 'stepwise',
    stepsPerTick: 1,
    stepCount: 200
  },

  model: {
    bufferLength: 200,
    tickDurationOverC: 0.1,
    emitter: {
      // particleCount: 484,
      particleCount: 220,
      particleType: 'PHOTON',
      bunchShape: 'SPIRAL_XY',
      direction: [0, 0, 1],
      position: [0, 1, -10],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 1
    },

    interactions: {
      electricField: [0, 0, 0],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
}
