export default {
  name: 'free-photons',
  view: {
    camera: {
      center: [0, 0.4, 2],
      phi: (10 / 360) * 2 * Math.PI,
      theta: (10 / 360) * 2 * Math.PI
    }
  },

  runner: {
    pusher: 'glsl',
    packFloat2UInt8: false,
    prerender: true,
    loops: 0,
    iterationsPerSnapshot: 1,
    snapshotCount: 85,

    iterationDurationOverC: 0.1
  },

  model: {
    emitter: {
      particleType: 'PHOTON',
      bunchShape: 'SPIRAL_XY',
      position: [0, 0.5, -5],
      gamma: 1,
      particleCount: 512
    }
  }
}
