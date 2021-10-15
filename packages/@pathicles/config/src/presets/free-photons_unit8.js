import { RUNNER_MODE } from '../constants'

export const freePhotons2 = {
  name: 'free-photons_unit8',
  view: {
    camera: {
      center: [0, 0.5, 0.5]
    }
  },

  runner: {
    loops: 0,
    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerSnapshot: 1,
    snapshotCount: 64,
    iterationDurationOverC: 0.1,
    iterations: undefined
  },

  model: {
    emitter: {
      particleCount: 512,
      particleType: 'PHOTON',
      bunchShape: 'SPIRAL_XY',
      direction: [0, 0, 1],
      position: [0, 0.5, -5],
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
