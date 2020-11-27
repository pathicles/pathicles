import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      center: [-0, 1.5, 0],
      distance: 5,
      theta: (-3 / 360) * 2 * Math.PI,
      phi: (-1 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON',
      position: [0, 1.5, -10],
      direction: [0, 0, 1]
    },
    lattice: {
      elements: {
        l: {
          type: LatticeElementTypes.DRIF,
          l: 8
        },
        l1: {
          type: LatticeElementTypes.DRIF,
          l: 0
        },
        d1: {
          type: LatticeElementTypes.SBEN,
          l: 1,
          strength: -0.0001
        },
        d2: {
          type: LatticeElementTypes.SBEN,
          l: 1,
          strength: 0.0001
        }
      },
      beamline: ['l', 'd1', 'l1', 'd2', 'l'],
      // beamline: [],
      origin: {
        phi: (0 / 360) * 2 * Math.PI,
        position: [0, 1, -10]
      }
    }
  }
}
