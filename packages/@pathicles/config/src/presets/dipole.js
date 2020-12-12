import { LATTICE_ELEMENT_TYPES, RUNNER_MODE } from '../constants.js'

export const dipole = {
  name: 'dipole',
  view: {
    camera: {
      center: [0, 1.5, 0],
      distance: 8,
      phi: (0 / 360) * 2 * Math.PI,
      theta: (90 / 360) * 2 * Math.PI
    }
  },
  runner: {
    prerender: true,
    loops: 0,
    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerSnapshot: 1,
    iterationsPerTick: 4,
    iterationDurationOverC: 0.25,
    snapshotCount: 512,
    iterations: 512
  },

  model: {
    emitter: {
      particleCount: 121,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE_XY',
      particleSeparation: 0.05,
      position: [-1.5, 0, 0],
      direction: [0, 0.1, 1],
      positionJitter: [0.0, 0.0, 0.5],

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
