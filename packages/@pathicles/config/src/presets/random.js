import { RUNNER_MODE } from '../constants'

export const random = {
  name: 'random',
  view: {
    camera: {
      distance: 6,
      phi: (5 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI
    }
  },

  runner: {
    prerender: true,
    loops: 5,

    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerTick: 2,
    iterationsPerSnapshot: 1,
    iterations: 2048,
    snapshotCount: 128 / 4,
    iterationDurationOverC: 0.05
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
