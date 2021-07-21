import { RUNNER_MODE } from '../constants'

export default {
  name: 'free-photons',
  view: {
    camera: {
      center: [0, 0.5, 2],
      phi: (0 / 360) * 2 * Math.PI,
      theta: (15 / 360) * 2 * Math.PI
    }
  },

  runner: {
    packFloat2UInt8: false,
    prerender: true
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
