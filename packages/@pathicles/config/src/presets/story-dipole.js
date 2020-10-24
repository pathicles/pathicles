import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      eye: [3, 1, 3],
      center: [0, 1.5, 0]
    }
  },

  model: {
    tickDurationOverC: 0.2,
    emitter: {
      particleType: 'ELECTRON ELECTRON',
      bunchShape: 'SPIRAL_XY',
      position: [0, 1.5, -10],
      direction: [0, 0, 1],
      directionJitter: [0, 0, 0],
      positionJitter: [0.0, 0.05, 0],
      gamma: 10.05
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
          strength: -0.004
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
