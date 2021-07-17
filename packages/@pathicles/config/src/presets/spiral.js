import { LATTICE_ELEMENT_TYPES, RUNNER_MODE } from '../constants.js'
import defaultConfig from './_default'

export default {
  name: 'spiral',
  view: {
    camera: {
      center: [0, 1, 0],
      distance: 1,
      theta: 90 * (Math.PI / 180),
      phi: 1 * (Math.PI / 180)
    }
  },
  runner: {
    prerender: false,
    loops: 0,
    mode: RUNNER_MODE.NOBREAK,
    iterationsPerSnapshot: 50,
    iterationDurationOverC: 0.01,
    snapshotCount: 512
    // iterationCount: 63
  },

  model: {
    emitter: {
      // particleCount: 121,
      particleType: 'ELECTRON',
      bunchShape: 'SPIRAL_XY',
      // particleSeparation: 0.05,
      position: [
        -1.5,
        defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight *
          2 +
          0.02,
        0
      ],
      direction: [0, 0.1, 1],
      positionJitter: [0.0, 0.0, 0.1],

      gamma: 1.1
    },
    interactions: {
      magneticField: [0, 0.001, 0],
      particleInteraction: false
    },
    lattice: {
      elements: {
        l: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 20
        },
        d: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 10,
          strength: 1.0
        }
      },
      beamline: [],
      origin: {
        phi: 0,
        position: [0, 0.5, -9]
      }
    }
  }
}
