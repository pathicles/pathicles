export default {
  name: 'free-photons',
  view: {
    camera: {
      center: [0, 0.5, 2],
      phi: (0 / 360) * 2 * Math.PI,
      theta: (15 / 360) * 2 * Math.PI
    }
  },

  runner: {
    pusher: 'glsl',
    packFloat2UInt8: false,
    prerender: true,
    loops: 0,
    iterationsPerSnapshot: 1,
    snapshotCount: 101,

    iterationDurationOverC: 0.1
  },

  model: {
    emitter: {
      particleType: 'PHOTON',
      bunchShape: 'SPIRAL_XY',
      position: [0, 0.5, -5],
      gamma: 1
    }
  }
}
