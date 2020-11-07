import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      distance: 5,
      theta: (-135 / 360) * 2 * Math.PI,
      phi: (5 / 360) * 2 * Math.PI
    }
  },

  model: {
    tickDurationOverC: 0.15,
    emitter: {
      bunchShape: 'SQUARE_XY',
      particleType: 'ELECTRON',
      position: [0, -0.4, -2],
      direction: [-1, 0.2, 0],
      directionJitter: [0.02, 0.02, 0.02],
      positionJitter: [0.2, 0.2, 0.2],
      gamma: 11.05
    },
    interactions: {
      particleInteraction: false,
      electricField: [0, 0, 0],
      magneticField: [0, 0.01, 0]
    }
    // lattice: {
    //   elements: {
    //     l: {
    //       type: LatticeElementTypes.DRIF,
    //       l: 0
    //     },
    //     d: {
    //       type: LatticeElementTypes.SBEN,
    //       l: 10,
    //       strength: 0.004
    //     }
    //   },
    //   beamline: ['l', 'd', 'l'],
    //   origin: {
    //     phi: 0,
    //     position: [0, 0.5, -9]
    //   }
  }
  // }
}
