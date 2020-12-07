import { RUNNER_MODE } from '../constants'

export const random = {
  name: 'random',
  view: {
    camera: {
      distance: 5
    }
  },

  runner: {
    prerender: false,
    loops: 5,

    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerTick: 1,
    iterationsPerSnapshot: 1,
    iterations: 2048,
    snapshotCount: 64 / 4,
    iterationDurationOverC: 0.1
  },

  model: {
    boundingBoxSize: 1.1,
    // boundingBoxCenter: [0, 2, 0],
    emitter: {
      position: [0, 0, 0],
      direction: [0, 0, 0],
      bunchShape: 'SQUARE_XZ',
      particleSeparation: 0.01,
      directionJitter: [1, 1, 1],
      positionJitter: [0, 0, 0],
      gamma: 2,
      particleCount: 1024,
      particleType: 'PHOTON ELECTRON PROTON'
    }
  }
}
