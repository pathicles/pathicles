export const storyEmpty = {
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
      gamma: 1.2
    },

    interactions: {
      electricField: [0, 0, 0],
      particleInteraction: false
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
