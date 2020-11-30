import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const dipole = {
  name: 'dipole',
  view: {
    camera: {
      eye: [10, 2, 0],
      center: [0, 2, 0]
    }
  },

  model: {
    bufferLength: 512,
    iterationDurationOverC: 0.1,
    emitter: {
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE_XY',
      position: [0, 0.15, 0],
      direction: [0, 0.1, 1],
      directionJitter: [0, 0, 0],
      positionJitter: [0.01, 0.05, 0.1],
      gamma: 12.05
    },
    interactions: {
      magneticField: [0, 0.001, 0],
      particleInteraction: false
    },
    lattice: {
      elements: {
        l: {
          type: LatticeElementTypes.DRIF,
          l: 5
        },
        d: {
          type: LatticeElementTypes.SBEN,
          l: 10,
          strength: 0.0
        }
      },
      beamline: ['l', 'd', 'l'],
      origin: {
        phi: 0,
        position: [0, 0.5, -9]
      }
    }
  }
}
