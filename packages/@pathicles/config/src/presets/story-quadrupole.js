import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyQuadrupole = {
  name: 'story-quadrupole',
  view: {
    camera: {
      center: [0, 1, 0],
      distance: 10,
      theta: (-135 / 360) * 2 * Math.PI,
      phi: (5 / 360) * 2 * Math.PI
    }
  },
  model: {
    emitter: {
      particleType: 'PROTON',
      bunchShape: 'SQUARE_YZ',
      // particleCount: 81,
      direction: [1, 0, 0],
      position: [-7.5, 1.5, 0],
      directionJitter: [0.02, 0.02, 0],
      positionJitter: [0.1, 0.1, 0.1],

      gamma: 4.5
    },

    lattice: {
      elements: {
        q1: {
          type: LatticeElementTypes.QUAD,
          strength: 1.5,
          l: 2
        },
        q2: {
          type: LatticeElementTypes.QUAD,
          strength: -1.5,
          l: 2
        },
        l_4: {
          type: LatticeElementTypes.DRIF,
          l: 4
        },
        l_1: {
          type: LatticeElementTypes.DRIF,
          l: 1
        },
        l_2: {
          type: LatticeElementTypes.DRIF,
          l: 2
        }
      },
      beamline2: ['l_4', 'q1', 'q2', 'l_4', 'q3', 'q4', 'l_4'],
      beamline: ['l_4', 'q1', 'l_1', 'q2', 'l_2', 'q1', 'l_1', 'q2', 'l_4'],
      origin: {
        phi: -Math.PI / 2,
        position: [-10, 0, 0]
      }
    }
  }
}
