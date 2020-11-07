export const storyElectric = {
  name: 'story-electric',
  view: {
    camera: {
      theta: (-30 / 360) * 2 * Math.PI,
      phi: (-5 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PHOTON PROTON',
      bunchShape: 'SQUARE_XY',
      position: [0, 1.5, -10],
      direction: [0, 0, 1],
      directionJitter: [0.02, 0.02, 0.02],
      positionJitter: [0.2, 0.2, 0.2],
      gamma: 1.2
    },

    interactions: {
      electricField: [0, 0, -0.000000000001],
      particleInteraction: false,
      magneticField: [0, 0, 0]
    },
    lattice: {
      elements: {},
      beamline: [],
      origin: {
        phi: 0,
        position: [0, 1, -6]
      }
    }
  }
}
