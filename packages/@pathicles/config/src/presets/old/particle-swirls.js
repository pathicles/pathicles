export default {
  particleType: 'ELECTRON',
  bunchShape: 'SQUARE_HORIZONTAL',
  particleCount: 9,
  bufferLength: 1024,
  particleSeparation: 1,
  emitterDirection: [0, 0.1, 1],
  gamma: 2,
  dipole_strength: 0.01,
  camera: {},
  runner: {
    prerender: false,
    looping: false,
    mode: 'framewise',
    stepsPerTick: 2,
    stepCount: 1024
  }
}
