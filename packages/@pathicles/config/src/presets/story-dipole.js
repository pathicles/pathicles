export const storyDipole = {
  view: {
    camera: {
      center: [0, 0.1, 0],
      theta: (2 * Math.PI) / (360 / 90),
      phi: (2 * Math.PI) / (360 / 15),
      distance: 9
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0.15, -1],
      position: [3.2, -1.5, 0],
      directionJitter: [0.05, 0.0, 0.05],
      positionJitter: [0.5, 0.5, 0.1],

      gamma: 900
    },
    interactions: {
      magneticField: [0, 0.5, 0],
      particleInteraction: false
    },

    lattice: {
      elements: {
        l2: {
          type: 'DRIF',
          l: 0
        },
        bm: {
          type: 'SBEN',
          angle: 0.78539816,
          e1: 0.39269908,
          e2: 0.39269908,
          l: 10,
          k1: -0.5
        }
      },
      beamline: [],
      origin: {
        phi: 0,
        position: [-5, 1, 0]
      }
    }
  }
}
