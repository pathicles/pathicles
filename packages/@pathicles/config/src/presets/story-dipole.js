import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      // center: [-2, 1, 0],

      position: [1, 2, 6],
      target: [1, 2, 0]
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON ELECTRON',
      bunchShape: 'DISC',
      direction: [0, 0.4, -1],
      position: [1, -1.5, 0],
      directionJitter: [0.05, 0.0, 0.05],
      positionJitter: [0.5, 0.5, 0.1],
      gamma: 2
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
          strength: 0.002
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
