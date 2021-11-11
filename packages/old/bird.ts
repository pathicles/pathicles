export const bird = {
  tickDurationOverC: 0.1,
  particleCount: 256,
  particleType: 'ELECTRON ELECTRON ELECTRON PHOTON  PROTON ELECTRON',
  bunchShape: 'SQUARE',
  emitterPosition: [0, 0, -2],
  emitterDirection: [0, 0, 1],
  //particleSeparation: 0.01,
  relativeEmitterDirectionJitter: [0, 0, 0],
  gamma: 700,
  particleInteraction: false,
  quadrupole_1_strength: 2,
  quadrupole_1_minZ: 0,
  quadrupole_1_maxZ: 1,
  quadrupole_1_rotated: false,
  quadrupole_2_strength: 2,
  quadrupole_2_minZ: 1,
  quadrupole_2_maxZ: 2,
  quadrupole_2_rotated: true,
  // bufferLength: 128,
  view: {},
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
