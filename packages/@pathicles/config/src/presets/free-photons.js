import { RUNNER_MODE } from '../constants'

export default {
  name: 'free-photons',
  view: {
    camera: {
      center: [0, 0.5, 0.5],
      phi: (-5 / 360) * 2 * Math.PI,
      theta: (5 / 360) * 2 * Math.PI
    }
  },

  runner: {
    loops: 0,
    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerSnapshot: 1,
    snapshotCount: 64,
    iterationDurationOverC: 0.1,
    iterations: 63
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
