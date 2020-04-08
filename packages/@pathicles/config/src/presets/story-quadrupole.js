export const storyQuadrupole = {
  name: 'story-quadrupole',
  view: {
    camera: {
      center: [0, 1, 0],
      theta: (2 * Math.PI) / (360 / 45),
      phi: (2 * Math.PI) / (360 / 5),
      distance: 6
    }
  },
  model: {
    emitter: {
      bunchShape: 'SQUARE_YZ',
      particleType:
        'ELECTRON ELECTRON ELECTRON PROTON ELECTRON ELECTRON ELECTRON ELECTRON PHOTON',
      position: [-5, 1, 0],
      direction: [1, 0, 0],
      directionJitter: [0, 0.1, 0.1],
      positionJitter: [0, 0.1, 0.1],
      gamma: 1000
    },

    lattice: {
      elements: {
        l1: {
          type: 'DRIF',
          l: 3
        },
        q1: {
          type: 'QUAD',
          k1: -0.05,
          l: 3
        },
        q2: {
          type: 'QUAD',
          k1: 0.15,
          l: 3
        },
        l2: {
          type: 'DRIF',
          l: 3
        }
      },
      beamline: ['l1', 'q1', 'q2', 'l2'],
      origin: {
        phi: -Math.PI / 2,
        position: [-10, 1, 0]
      }
    }
  }
}
