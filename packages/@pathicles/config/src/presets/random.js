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
    iterationsPerSnapshots: 2,
    iterations: 512
  },

  model: {
    boundingBoxSize: 1.1,
    // boundingBoxCenter: [0, 2, 0],
    snapshots: 128,
    iterationDurationOverC: 0.1,
    emitter: {
      position: [0, 1, 0],
      direction: [0, 0, 0],
      bunchShape: 'ROW',
      particleSeparation: 0,
      directionJitter: [1, 1, 1],
      positionJitter: [0.1, 0, 0.1],
      gamma: 2,
      particleCount: 64,
      particleType: 'PHOTON ELECTRON PROTON'
    }
  }
}
