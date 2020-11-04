export const storyElectric = {
  name: 'story-electric',
  view: {
    camera: {
      eye: [-7.5, 2, 0],
      center: [0, 1, 0]
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PHOTON PROTON',
      bunchShape: 'SQUARE_XY',
      position: [0, 1.5, -7.5],
      direction: [0, 0, 1],
      directionJitter: [0, 0.01, 0.01],
      positionJitter: [0, 0.01, 0.01],

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
