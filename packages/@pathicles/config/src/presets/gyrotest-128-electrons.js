import { RUNNER_MODE, LATTICE_ELEMENT_TYPES } from '../constants'
import { defaultConfig } from './_default'

export default {
  name: 'gyrotest-128-electrons',
  view: {
    camera: {
      center: [1.5, 0, 0],
      distance: 4,
      //   center: [0.5, 0, 0],
      theta: -(2 * Math.PI) / (360 / 90),
      phi: (2 * Math.PI) / (360 / 10)
      //   distance: 0.5
    }
  },

  debug: {
    logPushing: false
  },

  runner: {
    prerender: true,
    loops: 0,
    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerSnapshot: 1,
    iterations: 170,
    snapshotCount: 256,
    iterationDurationOverC: (2 * Math.PI) / 10
  },

  model: {
    emitter: {
      particleCount: 64,
      particleSeparation: 0.0,
      particleType: 'ELECTRON',
      bunchShape: 'ROW',
      direction: [0, 0, 1],
      position: ({ p }) => [
        -p / 30,
        (defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight) /
          2 +
          0 / 200,
        0
      ],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: ({ p }) => 1 / Math.sqrt(1 - Math.pow(0.0125, 2)) + p / 3000 //1.55
    },

    lattice: {
      elements: {
        l0: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 20,
          strength: 0.0001
        }
      },
      beamline: ['l0'],
      origin: {
        phi: 0,
        position: [0, 0, -10]
      }
    }
  }
}
