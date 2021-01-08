export default {
  name: 'logo',
  view: {
    camera: {
      center: [-0.09908819556642608, 1.618041825719298, -0.2847670131543041],
      theta: 2.8594448957965577,
      phi: -0.29666042399644166,
      distance: 0.6949426249436718
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PHOTON PROTON',
      bunchShape: 'SQUARE_XY',
      particleCount: 121,
      particleSeparation: 0.01,
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
