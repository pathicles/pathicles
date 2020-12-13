import { RUNNER_MODE } from '../constants'

export default {
  name: 'free-electrons',
  view: {
    camera: {
      center: [0, 1, 0],
      // theta: 0,
      phi: 0,
      distance: 1.75
    }
  },

  runner: {
    loops: 0,
    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerSnapshot: 1,
    snapshotCount: 128,
    iterationDurationOverC: 0.1
  },

  model: {
    emitter: {
      particleCount: 900,
      particleType: 'ELECTRON',
      bunchShape: 'SPIRAL_XY',
      particleSeparation: 0.5,
      direction: [0, 0, 1],
      position: [0, 1, -5],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 10
    },

    interactions: {
      electricField: [0, 0, 0],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
}
