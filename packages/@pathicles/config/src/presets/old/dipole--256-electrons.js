export default {
  particleType: 'ELECTRON',
  bunchShape: 'SQUARE',
  particleCount: Math.pow(16, 2),
  relativeEmitterPositionJitter: [0.2, 0.2, 0.1],
  gamma: 1000,
  dipole_strength: 1,
  bufferLength: 128,

  dipole_minZ: -1,
  dipole_maxZ: 1,
  runner: {
    looping: false,
    stepCount: 128
  },
  model: {
    lattice: {
      elements: {
        q1: {
          type: 'QUAD',
          k1: 5,
          l: 1
        },
        q2: {
          type: 'QUAD',
          k1: -5,
          l: 1
        },
        l: {
          type: 'DRIF',
          l: 1
        }
      },
      beamline: ['l']
    }
  },
  view: {}
}
