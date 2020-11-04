export const freePhotons = {
  name: 'free-photons',
  view: {
    camera: {
      eye: [2, 1.25, 2],
      center: [0, 1, 0.5]
    }
  },

  runner: {
    prerender: true,
    loops: 0,

    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 11
  },

  model: {
    tickDurationOverC: 0.1,
    emitter: {
      particleType: 'PHOTON',
      bunchShape: 'SPIRAL_XY',
      direction: [0, 0, 1],
      position: [0, 1, 0],
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
