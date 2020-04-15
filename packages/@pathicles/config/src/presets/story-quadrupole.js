import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyQuadrupole = {
  name: 'story-quadrupole',
  view: {
    camera: {
      center: [-1, 1, 0],
      theta: (2 * Math.PI) / (360 / 75),
      phi: (2 * Math.PI) / (360 / 5),
      distance: 5
    }
  },
  model: {
    tickDurationOverC: 0.1,
    emitter: {
      particleType: 'PROTON ',
      bunchShape: 'SQUARE_YZ',
      direction: [1, 0, 0],
      position: [-10, 1, 0],
      directionJitter: [0.0, 0.0, 0],
      positionJitter: [0.1, 0.1, 0],

      gamma: 7
    },

    lattice: {
      elements: {
        q1: {
          type: LatticeElementTypes.QUAD,
          strength: -.5,
          l: 5
        },
        q2: {
          type: LatticeElementTypes.QUAD,
          strength: .5,
          l: 5
        },
        l1: {
          type: LatticeElementTypes.DRIF,
          l: 5
        }
      },
      beamline: ['l1', 'q1', 'q2', 'l1'],
      origin: {
        phi: -Math.PI / 2,
        position: [-10, 0, 0]
      }
    }
  }
}
