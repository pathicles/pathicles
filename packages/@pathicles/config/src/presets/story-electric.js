export const storyElectric = {
  name: 'story-electric',
  view: {
    camera: {
      center: [-0.5, 1.5, 0],
      distance: 5,
      theta: (1 / 360) * 2 * Math.PI,
      phi: (0 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PHOTON PROTON',
      position: [0, 1.5, -10],
      direction: [0, 0, 1]
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
