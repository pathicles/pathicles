import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      position: [0, 1, 5],
      target: [0, 1, 0]
    }
  },

  model: {
    tickDurationOverC: 0.2,
    emitter: {
      particleType: 'ELECTRON ELECTRON',
      bunchShape: 'SQUARE',
      //particleCount: 1,
      direction: [0, 0, 1],
      position: [1, 1, 0],
      // particleSeparation: 0.1,
      directionJitter: [0.1, 0.1, 0.0],
      positionJitter: [0.1, 0.1, 0.0],
      gamma: 1.05
    },
    interactions: {
      magneticField: [0, 0, 0],
      particleInteraction: false
    },

    lattice: {
      elements: {
        l: {
          type: LatticeElementTypes.DRIF,
          l: 9.5
        },
        d: {
          type: LatticeElementTypes.SBEN,
          l: 1,
          strength: -0.0005
        }
      },
      beamline: ['l', 'd', 'l'],
      origin: {
        phi: 0,
        position: [-2, 0, -10]
      }
    }
  }
}
