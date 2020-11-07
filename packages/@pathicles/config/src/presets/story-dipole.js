import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      center: [0, 0, 0],
      distance: 10,
      theta: (-90 / 360) * 2 * Math.PI,
      phi: (5 / 360) * 2 * Math.PI
    }
  },

  model: {
    tickDurationOverC: 0.15,
    emitter: {
      bunchShape: 'SQUARE_XY',
      particleType: 'ELECTRON',
      position: [0, -0.3, -2],
      direction: [-1, 0.1, 0],
      directionJitter: [0.02, 0.02, 0],
      positionJitter: [0.1, 0.1, 0.1],
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
