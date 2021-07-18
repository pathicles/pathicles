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
    iterationsPerSnapshot: 2,
    iterationDurationOverC: 0.05
  },

  model: {
    emitter: {
      particleType: 'PHOTON',
      bunchShape: 'SPIRAL_XY',
      position: [0, 0.5, -10],
      gamma: 1
    }
  }
}
