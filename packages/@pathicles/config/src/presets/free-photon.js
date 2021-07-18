import defaultConfig from './_default'
import { RUNNER_MODE } from '../constants'

export default {
  name: 'free-photon',
  view: {
    camera: {
      center: [0, 0, 0.5],
      distance: 2,
      phi: (15 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI
    }
  },

  debug: {
    logPushing: false
  },

  runner: {
    prerender: false,
    mode: RUNNER_MODE.NOBREAK,

    loops: 0,
    iterationsPerSnapshot: 1,
    iterationCount: 10,
    snapshotCount: 11,
    iterationDurationOverC: 0.1
  },

  model: {
    emitter: {
      gamma: 1.1,
      particleCount: 1,
      bunchShape: 'ROW_X',
      particleType: 'PHOTON',
      positionJitter: [0, 0, 0]
    },
    lattice: {
      origin: {
        position: [
          0,
          defaultConfig.view.pathicleWidth *
            defaultConfig.view.pathicleRelativeHeight,
          0
        ]
      }
    }
  }
}
