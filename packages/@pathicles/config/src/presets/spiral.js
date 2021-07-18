import { LATTICE_ELEMENT_TYPES, RUNNER_MODE } from '../constants.js'

export default {
  name: 'spiral',
  view: {
    camera: {
      center: [0, 1.5, 0],
      distance: 5,
      theta: 90 * (Math.PI / 180),
      phi: 1 * (Math.PI / 180)
    }
  },
  runner: {
    iterationDurationOverC: 0.01,
    iterationsPerSnapshot: 8,
    iterationCount: 512 * 8 - 1,
    snapshotCount: 512
  },

  model: {
    emitter: {
      bunchShape: 'SPIRAL_XY',
      direction: [0, 0.1, 1],

      gamma: 4
    },
    interactions: {
      magneticField: [0, 0.005, 0],
      particleInteraction: false
    },
    lattice: {
      beamline: [],
      origin: {
        phi: 0,
        position: [0, 0, 0]
      }
    }
  }
}
