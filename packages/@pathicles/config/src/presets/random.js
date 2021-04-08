import { RUNNER_MODE } from '../constants'
let seed = 1
export const random = () => {
  let x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}
export const boundedRandom = (min = -1, max = 1) => random() * (max - min) + min

export default {
  name: 'random',
  view: {
    camera: {
      distance: 6,
      theta: 45 * (Math.PI / 180),
      phi: 2 * (Math.PI / 180)
    }
  },

  runner: {
    prerender: false,
    loops: 0,

    mode: RUNNER_MODE.NOBREAK,
    iterationsPerTick: 1,
    iterationsPerSnapshot: 1,
    iterations: 1024,
    snapshotCount: 32,
    iterationDurationOverC: 0.1
  },

  model: {
    boundingBoxSize: 1,
    // boundingBoxCenter: [0, 2, 0],
    emitter: {
      position: [0, 1, 0],
      direction: () => [boundedRandom(), boundedRandom(), boundedRandom()],
      // bunchShape: 'SQUARE_XZ',
      // bunchShape: 'SQUARE_XZ',
      particleSeparation: 0.00001,
      // directionJitter: [1, 1, 1],
      // positionJitter: [0, 0, 0],
      gamma: 2,
      particleCount: 1024,
      particleType: 'PHOTON ELECTRON PROTON'
    }
  }
}
