export const freePhotons = {
  name: 'free-photons',
  view: {
    camera: {
      position: [2.5, 0.2, 2.5],
      target: [0, 0, 0]
    }
  },

  runner: {
    prerender: true,
    loops: 1,

    mode: 'framewise',
    stepsPerTick: 8,
    stepCount: 200
  },

  model: {
    bufferLength: 200,
    tickDurationOverC: 0.1,
    emitter: {
      // particleCount: 484,
      particleCount: 220,
      particleType: 'PHOTON',
      bunchShape: 'SQUARE',
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
