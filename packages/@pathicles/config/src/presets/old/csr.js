export default {
  particleCount: 8 ** 2,
  particleType: 'ELECTRON',
  bunchShape: 'SQUARE',
  emitterPosition: [0, 0, 0],
  emitterDirection: [0, 0, 0.5],
  particleSeparation: 0.01,
  relativeEmitterDirectionJitter: [0, 0, 0],
  gamma: 700,
  particleInteraction: false,
  quadrupole_1_strength: 0,
  quadrupole_1_minZ: 0,
  quadrupole_1_maxZ: 1,
  quadrupole_1_rotated: false,
  quadrupole_2_strength: 0,
  quadrupole_2_minZ: 1,
  quadrupole_2_maxZ: 2,
  quadrupole_2_rotated: true,
  runner: {
    // looping: false,
    stepCount: 256
  },
  view: {
    isLatticeVisible: true,
    camera: {
      center: [0.5464182432175703, -0.2346930838343395, -2.9868920788122306],
      theta: -6.435299229356567,
      phi: 0.009642957915488677,
      distance: 7.842931663232314
    }
  },
  model: {
    lattice: {
      origin: {
        position: [0, -0.4, 0],
        phi: 0
      },

      elements: {
        l0: {
          type: 'DRIF',
          l: 1.43
        },
        l1: {
          type: 'DRIF',
          l: 0.25
        },
        l2: {
          type: 'DRIF',
          l: 0.35
        },
        q1: {
          type: 'QUAD',
          k1: 2.87506832355,
          l: 0.25
        },
        q2: {
          type: 'QUAD',
          k1: -6.31393492954,
          l: 0.25
        },
        q3: {
          type: 'QUAD',
          k1: 4.36962492724,
          l: 0.25
        },
        q4: {
          type: 'QUAD',
          k1: 5.5089117863,
          l: 0.25
        },
        bm: {
          type: 'SBEN',
          angle: 0.78539816,
          e1: 0.39269908,
          e2: 0.39269908,
          l: 1.8
        }
      },
      beamline: [
        'l0',
        'q1',
        'l2',
        'q2',
        'l2',
        'q3',
        'l2',
        'bm',
        'l2',
        'l1',
        'q4',
        'l1',
        'l2',
        'bm',
        'l2',
        'q3',
        'l2',
        'q2',
        'l2',
        'l0',
        'q1',
        'l2',
        'q2',
        'l2',
        'q3',
        'l2',
        'bm',
        'l2',
        'l1',
        'q4',
        'l1',
        'l2',
        'bm',
        'l2',
        'q3',
        'l2',
        'q2',
        'l2',
        'l0',
        'q1',
        'l2',
        'q2',
        'l2',
        'q3',
        'l2',
        'bm',
        'l2',
        'l1',
        'q4',
        'l1',
        'l2',
        'bm',
        'l2',
        'q3',
        'l2',
        'q2',
        'l2',
        'l0',
        'q1',
        'l2',
        'q2',
        'l2',
        'q3',
        'l2',
        'bm',
        'l2',
        'l1',
        'q4',
        'l1',
        'l2',
        'bm',
        'l2',
        'q3',
        'l2',
        'q2',
        'l2'
      ]
    }
  }
}
