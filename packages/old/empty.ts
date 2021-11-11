export default {
  particleCount: 0,
  bufferLength: 0,

  particleType: 'ELECTRON',
  bunchShape: 'SQUARE',
  emitterPosition: [0, 1, 0],
  emitterDirection: [0, 0, 1],
  particleSeparation: 0.015,
  relativeEmitterDirectionJitter: [0.05, 0.05, 0],
  gamma: 100,
  particleInteraction: false,
  quadrupole_1_strength: 0.15,
  quadrupole_1_minZ: -1,
  quadrupole_1_maxZ: 0,
  quadrupole_1_rotated: false,
  quadrupole_2_strength: 0.15,
  quadrupole_2_minZ: 0,
  quadrupole_2_maxZ: 1,
  quadrupole_2_rotated: true,
  // bufferLength: 128,
  view: {
    camera: {
      theta: (-1 * Math.PI) / 4
    }
  },
  model: {
    lattice: {
      elements: {},
      beamline: []
    }
  }
}
