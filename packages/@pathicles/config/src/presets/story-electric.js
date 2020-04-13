export const storyElectric = {
  name: 'story-electric',
  view: {
    camera: {
      center: [0, 0, -1],
      theta: Math.PI / 4 * 1,
      phi: 0,
      distance: 2
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PROTON  PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 1, -10],
      directionJitter: [0.2, 0.2, 0],
      positionJitter: [0.1, 0.1, 0],

      gamma: 1.3
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
