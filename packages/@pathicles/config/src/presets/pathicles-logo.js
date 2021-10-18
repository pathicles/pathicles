export default {
  name: 'pathicles-logo',
  view: {
    camera: {
      center: [0.12, 0.5, 0],
      distance: 2,
      theta: (-5 / 360) * 2 * Math.PI,
      phi: (-2 / 360) * 2 * Math.PI
    }
  },
  runner: {
    iterationDurationOverC: 0.05
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PHOTON PROTON',
      position: [0, 0.5, -10],
      direction: [0, 0, 1]
    },

    lattice: {},
    beamline: [],
    // beamline: [],
    origin: {
      phi: (0 / 360) * 2 * Math.PI,
      position: [0, 1, -5]
    }
  }
}
