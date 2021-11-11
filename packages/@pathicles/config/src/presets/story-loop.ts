export const storyLoop = {
  view: {
    camera: {
      center: [-2, 0.1, 0],
      theta: 0.4,
      phi: 0,
      distance: 6
    }
  },

  model: {
    emitter: {
      particleType: 'PROTON ELECTRON  PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 1, -10],
      directionJitter: [0.01, 0.01, 0],
      positionJitter: [0.1, 0.1, 0],

      gamma: 1.1
    },

    interactions: {
      electricField: [0, 0, 0.0001],
      particleInteraction: false
    },
    lattice: {
      elements: {
        l1: {
          type: 'DRIF',
          l: 3
        },
        q1: {
          type: 'QUAD',
          k1: 0,
          l: 3
        },
        q2: {
          type: 'QUAD',
          k1: -0,
          l: 3
        },
        l2: {
          type: 'DRIF',
          l: 3
        }
      },
      beamline: ['l1', 'q1', 'q2', 'l2'],
      origin: {
        phi: 0,
        position: [0, 1, -6]
      }
    }
  }
}
