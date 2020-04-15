export const storyElectric = {
  name: 'story-electric',
  view: {
    camera: {
      center: [0, 1, -5],
      theta: (2 * Math.PI) / (360 / 25),
      phi: (2 * Math.PI) / (360 / 5),
      distance: 3
    }
  },

  model: {
    boundingBoxSize: -1,
    emitter: {
      particleType: 'ELECTRON PROTON  PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 2, -10],
      directionJitter: [0., 0., 0],
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
