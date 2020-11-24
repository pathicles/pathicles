import { RUNNER_MODE } from '../constants'

export const random = {
  name: 'random',
  view: {
    camera: {
      eye: [5, 2, -5],
      center: [0, 2, 0]
    }
  },

  runner: {
    prerender: true,
    loops: 0,

    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerTick: 4,
    iterationCount: 127
  },

  model: {
    // boundingBoxSize: 2,
    // boundingBoxCenter: [0, 2, 0],
    bufferLength: 256,
    iterationDurationOverC: 0.1,
    emitter: {
      position: [0, 1, 0],
      direction: [1, 0, 0],
      bunchShape: 'ROW',
      particleSeparation: 0.0,
      directionJitter: [1, 1, 1],
      positionJitter: [0.1, 0, 0.1],
      gamma: 2,
      particleCount: 128,
      particleType: 'PHOTON ELECTRON PROTON'
    }
  }
}
