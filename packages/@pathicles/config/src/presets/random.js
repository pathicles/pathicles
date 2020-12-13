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
    loops: 0,

    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerTick: 1,
    iterationsPerSnapshot: 1,
    iterations: 32,
    snapshotCount: 128 / 4,
    iterationDurationOverC: 0.2
  },

  model: {
    boundingBoxSize: 1,
    // boundingBoxCenter: [0, 2, 0],
    emitter: {
      position: [0, 0, 0],
      direction: [0, 1, 0],
      bunchShape: 'SQUARE_XZ',
      particleSeparation: 0.0,
      directionJitter: [1, 0, 1],
      positionJitter: [0, 0, 0],
      gamma: 2,
      particleCount: 128,
      particleType: 'PHOTON ELECTRON PROTON'
    }
  }
}
