import defaultConfig from './_default'
import { C, RUNNER_MODE } from '../constants'
import { ELECTRON } from './../particle-types.js'

function betaFromGamma(gamma = 0) {
  if (gamma === 0) return NaN
  return Math.sqrt(1 - 1 / Math.pow(gamma, 2))
}

export const B_T = 0.01
export const gamma = 2
export const R =
  ((gamma / B_T) * betaFromGamma(gamma) * C) / ELECTRON.chargeMassRatio__Ckg_1
export const T = (2 * Math.PI * R) / betaFromGamma(gamma) / C

const iterationDurationOverC = 0.001

const STEPS = 256

// const r = (3.3 * gamma * 0.0005109989461 * betaFromGamma(gamma)) / B_T

// eslint-disable-next-line no-undef

console.log({ R, C, beta: betaFromGamma(gamma), T, STEPS })

export default {
  name: 'gyrotest-1-electron',
  view: {
    camera: {
      center: [0, 0.1, 0],
      distance: 3,
      theta: 90 * (Math.PI / 180),
      phi: 0 * (Math.PI / 180)
    }
  },

  runner: {
    prerender: true,
    loops: 0,
    mode: RUNNER_MODE.NOBREAK,
    snapshotsPerTick: 5,
    iterationsPerSnapshot: 5,
    iterationCount: undefined,
    snapshotCount: STEPS,
    iterationDurationOverC: iterationDurationOverC
  },

  model: {
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'COLUMN',
      direction: [0, 0, 1],
      position: [
        0,
        defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight *
          2 +
          0.02,
        0
      ],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma
    },
    interactions: {
      particleInteraction: false,
      electricField: [0, 0, 0],
      magneticField: [0, B_T, 0]
    }
  }
}
