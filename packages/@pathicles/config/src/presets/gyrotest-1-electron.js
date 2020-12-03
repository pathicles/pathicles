import { RUNNER_MODE, LATTICE_ELEMENT_TYPES } from '../constants'
import { defaultConfig } from './_default'

export const gyrotest_1_electron = {
  name: 'gyrotest-1-electron',
  view: {
    camera: {
      center: [0, 0, 0],
      distance: 5
      //   center: [0.5, 0, 0],
      //   theta: (2 * Math.PI) / (360 / 45),
      //   phi: (2 * Math.PI) / (360 / 15),
      //   distance: 0.5
    }
  },

  debug: {
    logPushing: true
  },

  runner: {
    prerender: false,
    loops: 0,
    mode: RUNNER_MODE.STEPWISE,
    iterationsPerSnapshot: 1,
    iterations: 17,
    snapshotCount: 16,
    iterationDurationOverC: (2 * Math.PI) / 1
  },

  model: {
    emitter: {
      particleCount: 2,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE_XY',
      direction: [0, 0, 1],
      // position: [1, 2, 3],
      position: [
        -1,
        defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight *
          1,
        0
      ],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 1 / Math.sqrt(1 - 0.05867 * 0.05867) //1.55
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
