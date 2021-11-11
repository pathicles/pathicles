export default {
  name: 'logo',
  view: {
    camera: {
      center: [0.05, 1.6, 0],
      theta: -0.12, //2.8594448957965577,
      phi: -0.13, //-0.29666042399644166,
      distance: 1
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PHOTON PROTON',
      // bunchShape: 'SQUARE_XY',
      // particleCount: 121,
      // particleSeparation: 0.01,
      position: [0, 1.5, -10],
      direction: [0, 0, 1]
    },
    lattice: {},
    beamline: [],
    // beamline: [],
    origin: {
      phi: (0 / 360) * 2 * Math.PI,
      position: [0, 1, -10]
    }
  }
}
