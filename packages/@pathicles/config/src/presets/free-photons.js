import { RUNNER_MODE } from '../constants'

export const freePhotons = {
  name: 'free-photons',
  view: {
    camera: {
      center: [0, 0, 0.5]
    }
  },

  runner: {
    prerender: false,
    loops: 2,
    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerSnapshot: 2,
    iterations: 10,
    snapshotCount: 11,
    iterationDurationOverC: 0.1
  },

  model: {
    emitter: {
      particleType: 'PHOTON',
      bunchShape: 'SPIRAL_XY',
      direction: [0, 0, 1],
      position: [0, 0, 0],
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
