import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      eye: [0, 1, -7.5],
      center: [0, 1, 0]
    }
  },

  model: {
    tickDurationOverC: 0.15,
    emitter: {
      bunchShape: 'SQUARE_XY',
      particleType: 'ELECTRON ELECTRON',
      position: [0, 1.5, -7.5],
      direction: [0, 0, 1],
      directionJitter: [0.02, 0.02, 0],
      positionJitter: [0.02, 0.02, 0],
      gamma: 11.05
    },
    lattice: {
      elements: {
        l: {
          type: LatticeElementTypes.DRIF,
          l: 8
        },
        d: {
          type: LatticeElementTypes.SBEN,
          l: 2,
          strength: 0.0025
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
