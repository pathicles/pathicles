import { RUNNER_MODE, LATTICE_ELEMENT_TYPES } from '../constants'
import defaultConfig from './_default'

export default {
  name: 'gyrotest-128-electrons',
  view: {
    camera: {
      center: [0, 2, 0],
      distance: 10,
      theta: 90 * (Math.PI / 180),
      phi: 5 * (Math.PI / 180)
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
    iterations: 511,
    snapshotCount: 512,
    iterationDurationOverC: 1 / 10
  },

  model: {
    emitter: {
      particleCount: 128,
      particleSeparation: 0,
      particleType: 'ELECTRON',
      bunchShape: 'ROW',
      direction: [0, 0.15, 1],
      position: () => [
        0,
        defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight *
          2,
        0
      ],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: ({ p }) => Math.log10(1 * p + 1)
    },

    lattice: {
      elements: {
        l0: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 20,
          strength: 0.00075
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
