import { RUNNER_MODE } from '../constants'

export const freeElectrons = {
  name: 'free-electrons',
  view: {
    camera: {
      center: [0, 0, 0],
      theta: 0,
      phi: -0.1,
      distance: 1
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
      particleCount: 900,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE_XY',
      particleSeparation: 0.05,
      direction: [0, 0, 1],
      position: [0, 0, -3],
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
