export const storyElectric = {
  name: 'story-electric',
  view: {
    camera: {
      position: [2.5, 2, -2.5],
      target: [0, 2.1, 0]
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PROTON PHOTON',
      bunchShape: 'SQUARE',
      position: [0, 2, -10],
      direction: [0, 0, 1],
      directionJitter: [0, 0, 0],
      positionJitter: [0.1, 0.1, 0],

      gamma: 1.2
    },

    interactions: {
      electricField: [0, 0, -0.00000000001],
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
