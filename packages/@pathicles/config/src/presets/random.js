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
      distance: 5,
      theta: 45 * (Math.PI / 180),
      phi: 2 * (Math.PI / 180)
    }
  },

  runner: {
    prerender: false,
    loops: 10,

    mode: RUNNER_MODE.NOBREAK,
    iterationsPerSnapshot: 1,
    iterationCount: 256,
    snapshotCount: 256,
    iterationDurationOverC: 0.1
  },

  model: {
    boundingBoxSize: 1,
    boundingBoxCenter: [0, 1, 0],
    emitter: {
      position: [0, 1, 0],
      // direction: () => [0, 1, 1],
      direction: () => [boundedRandom(), boundedRandom(), boundedRandom()],
      // bunchShape: 'SQUARE_XZ',
      // bunchShape: 'SQUARE_XZ',
      particleSeparation: 0.0001,
      // directionJitter: [1, 1, 1],
      // positionJitter: [0, 0, 0],
      gamma: 10,
      particleCount: 256,
      particleType: 'PHOTON ELECTRON PROTON'
    }
  }
}
