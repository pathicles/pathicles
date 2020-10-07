import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      position: [0, 1.5, 7],
      target: [0, 1.5, 0]
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON ELECTRON',
      bunchShape: 'SQUARE',
      //particleCount: 1,
      direction: [0, 0.25, -1],
      position: [2, -2, 0],
      particleSeparation: 0.15,
      directionJitter: [0, 0, 0.0],
      positionJitter: [0.0, 0.1, 0.0],
      gamma: 1.55
    },
    interactions: {
      magneticField: [0, 0, 0],
      particleInteraction: false
    },

    lattice: {
      elements: {
        l: {
          type: LatticeElementTypes.DRIF,
          l: 0
        },
        d: {
          type: LatticeElementTypes.SBEN,
          l: 20,
          strength: 0.001
        }
      },
      beamline: ['l', 'd'],
      origin: {
        phi: 0,
        position: [0, 0, -10]
      }
    }
  }
}
