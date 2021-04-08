export default {
  name: 'story-electric',
  view: {
    camera: {
      center: [-0, 1.5, 0],
      distance: 1,
      theta: 0 * (-30 / 360) * 2 * Math.PI,
      phi: 0 * (-1 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PHOTON PROTON',
      position: [0, 1.5, -8],
      direction: [0, 0, 1],
      gamma: () => 1.05
    },

    interactions: {
      electricField: [0, 0, -1e-11],
      particleInteraction: false,
      magneticField: [0, 0, 0]
    },
    lattice: {
      elements: {},
      beamline: [],
      origin: {
        phi: 0,
        position: [0, 1.5, -8]
      }
    }
  }
}
