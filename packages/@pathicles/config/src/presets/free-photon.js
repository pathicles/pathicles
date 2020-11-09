export const freePhoton = {
  name: 'free-photon',
  view: {
    camera: {
      eye: [2, 0.25, 2],
      center: [0, 0, 0.5]
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
    bufferLength: 11,
    iterationStepDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'PHOTON',
      bunchShape: 'CUBE',
      direction: [0, 0, 1],
      position: [0, 0.01, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 1
    },

    interactions: {
      electricField: [0, 0, 0],
      particleInteraction: false,
      magneticField: [0, 0, 0]
    }
  }
}
