export default {
  particleType: 'PHOTON',
  bunchShape: 'ROW',
  particleCount: 1,
  particleSeparation: 0.1,
  emitterDirection: [0, 0, 1],
  gamma: 10,
  runner: {
    prerender: false,
    loops: 0,
    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 10
  }
}
