export const random = {
  name: 'random',
  view: {
    camera: {
      center: [0, 0, 0],
      theta: -0.6163632477299,
      phi: 0.04608544417465289,
      distance: 5
    }
  },

  model: {
    boundingBoxSize: 2,
    emitter: {
      randomize: true,
      // position: [0, 0, 0],
      // direction: [0, 0, 0],
      // particleSeparation: 0.1,
      // directionJitter: [0, 0, 0],
      // emitterDirectionJitter: [0, 0, 0],
      gamma: 100,
      particleType: 'PHOTON ELECTRON PROTON'
    },

    lattice: {
      elements: {
        l2: {
          type: 'DRIF',
          l: 5
        },
        bm: {
          type: 'SBEN',
          angle: 0.78539816,
          e1: 0.39269908,
          e2: 0.39269908,
          l: 1.8,
          k1: -0.4
        }
      },
      beamline: [], //'l2', 'bm', 'l2'],
      origin: {
        phi: -Math.PI,
        position: [0, 1, 5]
      }
    }
  }
}
