import { RUNNER_MODE } from '../constants'

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

    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerTick: 1,
    iterationCount: 11
  },

  model: {
    bufferLength: 11,
    iterationDurationOverC: 0.2,
    emitter: {
      particleType: 'PHOTON',
      bunchShape: 'SPIRAL_XY',
      direction: [0, 0, 1],
      position: [0, 1, -1],
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
