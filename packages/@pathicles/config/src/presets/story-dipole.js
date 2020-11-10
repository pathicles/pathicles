import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      center: [0, 1, 0],
      distance: 5,
      theta: (0 / 360) * 2 * Math.PI,
      phi: (0 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      bunchShape: 'SQUARE_XY',
      particleType: 'ELECTRON',
      position: [0, 1, -10],
      direction: [0, 0, 1]
    },
    lattice: {
      elements: {
        l: {
          type: LatticeElementTypes.DRIF,
          l: 10
        },
        d: {
          type: LatticeElementTypes.SBEN,
          l: 10,
          strength: 0.000075
        }
      },
      beamline: ['l', 'd', 'l'],
      origin: {
        phi: (0 / 360) * 2 * Math.PI,
        position: [0, 1, -10]
      }
    }
  }
}
