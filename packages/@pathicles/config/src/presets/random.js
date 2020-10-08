export const random = {
  name: 'random',
  view: {
    camera: {
      position: [5, 1, -5],
      target: [0, 0.2, 0]
    }
  },

  runner: {
    prerender: false,
    loops: 10,

    mode: 'framewise',
    stepsPerTick: 8,
    stepCount: 128
  },

  model: {
    boundingBoxSize: 2,
    bufferLength: 64,
    tickDurationOverC: 0.1,
    emitter: {
      randomize: true,
      gamma: 2,
      particleCount: 512,
      particleType: 'PHOTON ELECTRON PROTON'
    }
  }
}
