export default {
  particleCount: 256,
  // bufferLength: 512,

  particleType: 'ELECTRON ELECTRON PROTON ELECTRON ELECTRON ELECTRON PHOTON',
  bunchShape: 'SQUARE',
  emitterPosition: [0, 0, -5],
  emitterDirection: [0, 0, 1],
  particleSeparation: 0.03,
  relativeEmitterDirectionJitter: [0.05, 0.01, 0],
  gamma: 200,
  particleInteraction: false,
  quadrupole_1_strength: 0.15,
  quadrupole_1_minZ: -4,
  quadrupole_1_maxZ: -2,
  quadrupole_1_rotated: false,
  quadrupole_2_strength: 0.15,
  quadrupole_2_minZ: -2,
  quadrupole_2_maxZ: -0,
  quadrupole_2_rotated: true,
  // bufferLength: 128,
  view: {
    camera: {
      center: [0.6416042087674583, 0.06250985871862877, 0.1259646199530552],
      theta: -0.4192115450016987,
      phi: 0.17561497544217414,
      distance: 2.4467753206905973
    }
  },
  runner: {
    // loops: 0,
    // stepCount: 512
  },
  model: {
    lattice: {
      elements: {
        bm: {
          type: 'SBEN',
          angle: 0.78539816,
          e1: 0.39269908,
          e2: 0.39269908,
          l: 1.8
        },
        q1: {
          type: 'QUAD',
          k1: 0,
          l: 1
        },
        q2: {
          type: 'QUAD',
          k1: -0,
          l: 1
        },
        l: {
          type: 'DRIF',
          l: 1
        }
      },
      beamline: ['l']
    }
  }
}
