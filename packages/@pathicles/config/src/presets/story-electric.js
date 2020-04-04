export const storyElectric = {
  name: 'story-electric',
  view: {
    camera: {
      center: [-2, 0, 0],
      theta: Math.PI / 4,
      phi: 0,
      distance: 6
    }
  },

  model: {
    emitter: {
      particleType:
        'ELECTRON ELECTRON ELECTRON PROTON PROTON PROTON   PHOTON PHOTON PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 1, -10],
      directionJitter: [0.01, 0.01, 0],
      positionJitter: [0.1, 0.1, 0],

      gamma: 2
    },

    interactions: {
      electricField: [0, 0, 0.001],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
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
