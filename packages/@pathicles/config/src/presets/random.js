export const random = {
  name: 'random',
  view: {
    camera: {
      eye: [5, 2, -5],
      center: [0, 2, 0]
    }
  },

  runner: {
    prerender: false,
    loops: 10,

    mode: 'framewise',
    stepsPerTick: 4,
    stepCount: 127
  },

  model: {
    boundingBoxSize: 2,
    boundingBoxCenter: [0, 2, 0],
    bufferLength: 256,
    iterationStepDurationOverC: 0.1,
    emitter: {
      position: [0, 2, 0],
      direction: [0, 0, 0],
      bunchShape: 'CUBE',
      particleSeparation: 0.0,
      directionJitter: [1, 1, 1],
      positionJitter: [0.1, 0.1, 0.1],
      gamma: 2,
      particleCount: 128,
      particleType: 'PHOTON ELECTRON PROTON'
    }
  }
}
