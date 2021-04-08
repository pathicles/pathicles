import { LATTICE_ELEMENT_TYPES, RUNNER_MODE } from '../constants'
import defaultConfig from './_default'

export default {
  name: 'gyrotest-1-electron',
  view: {
    camera: {
      center: [0, 2, 0],
      distance: 10,
      theta: 90 * (Math.PI / 180),
      phi: 0 * (Math.PI / 180)
    }
  },

  runner: {
    prerender: true,
    loops: 0,
    mode: RUNNER_MODE.NOBREAK,
    iterationsPerSnapshot: 1,
    iterations: 200,
    snapshotCount: 256,
    iterationDurationOverC: 1 / 10
  },

  model: {
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'COLUMN',
      direction: [0, 0, 1],
      position: [
        -1.5,
        defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight *
          2 +
          0.02,
        0
      ],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 2
    },

    lattice: {
      elements: {
        l0: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 20,
          strength: 0.001
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
