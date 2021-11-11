export default {
  particleType: 'ELECTRON',
  bunchShape: 'SQUARE',
  emitterPosition: [0, 0, -1],
  emitterDirection: [0, 0, 1],
  particleCount: 256,

  // emitterPosition: [0, 0, 0],
  // emitterDirection: [0, 0, 1],
  // particleSeparation: 0.02,

  relativeEmitterDirectionJitter: [0.03, 0.03, 0.03],
  gamma: 100,
  particleInteraction: false,
  quadrupole_1_strength: 0.03,
  quadrupole_1_minZ: 0,
  quadrupole_1_maxZ: 1,
  quadrupole_1_rotated: false,
  quadrupole_2_strength: 0.03,
  quadrupole_2_minZ: 1,
  quadrupole_2_maxZ: 2,
  quadrupole_2_rotated: true,
  model: {
    lattice: {
      elements: {
        q1: {
          type: 'QUAD',
          k1: 5,
          l: 1
        },
        l: {
          type: 'DRIF',
          l: 1
        },
        q2: {
          type: 'QUAD',
          k1: -5,
          l: 1
        }
      },
      beamline: []
    }
  },
  view: {
    camera: {
      center: [0.9822474836191288, -0.1017444026636821, 3.829318997529806],
      theta: -0.7546919502613733,
      phi: 0.025101340398017754,
      distance: 4.1453260570578285
    }
  }
}
