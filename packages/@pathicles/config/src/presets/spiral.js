import { LATTICE_ELEMENT_TYPES, RUNNER_MODE } from '../constants.js'
import defaultConfig from './_default'

export default {
  name: 'spiral',
  view: {
    camera: {
      center: [0, 2, 0],
      distance: 10,
      theta: 90 * (Math.PI / 180),
      phi: 2 * (Math.PI / 180)
    }
  },
  runner: {
    prerender: true,
    loops: 0,
    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerSnapshot: 1,
    iterationsPerTick: 1,
    iterationDurationOverC: 0.22,
    snapshotCount: 512,
    iterations: 500
  },

  model: {
    emitter: {
      particleCount: 121,
      particleType: 'ELECTRON',
      bunchShape: 'SPIRAL_XY',
      particleSeparation: 0.05,
      position: [
        -1.5,
        defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight *
          2 +
          0.02,
        0
      ],
      direction: [0, 0.05, 1],
      positionJitter: [0.0, 0.0, 0.2],

      gamma: 2.5
    },
    interactions: {
      magneticField: [0, 0.001, 0],
      particleInteraction: false
    },
    lattice: {
      elements: {
        l: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 5
        },
        d: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 10,
          strength: 0.0
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
