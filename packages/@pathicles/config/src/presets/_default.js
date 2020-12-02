import { RUNNER_MODE } from '../constants'

export const defaultConfig = {
  name: 'default',
  debug: {
    logPushing: false,
    logPerformance: false,
    profile: false,
    showTextures: false,
    showTextureScale: 2
  },
  runner: {
    prerender: false,
    loops: 0,
    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerSnapshot: 2,
    iterations: 127,
    iterationDurationOverC: 0.25,
    snapshotCount: 128
  },

  model: {
    boundingBoxSize: -1,
    emitter: {
      // "electron", "photon", "proton", "mixed"
      particleType: 'ELECTRON',
      bunchShape: 'SPIRAL_XY',
      particleCount: 121,
      particleSeparation: 0.1,
      gamma: 1.25,
      position: [0, 0, 0],
      direction: [0, 0, 1],
      positionJitter: [0.02, 0.02, 0.02]
    },
    interactions: {
      particleInteraction: false,
      electricField: [0, 0, 0],
      magneticField: [0, 0, 0]
    },
    lattice: {
      elements: {},
      beamline: []
    }
  },

  view: {
    lights: [
      {
        position: [0, 10, 0],
        near: -10,
        far: 10,
        size: 10
      }
    ],
    ambientLightAmount: 0.5,
    diffuseLightAmount: 0.5,

    stageGrid: {
      y: 0,
      size: 18
    },

    rgbGamma: 1,

    isStageVisible: true,
    isShadowEnabled: true,
    isLatticeVisible: false,

    pathicleRelativeGap: 3,
    pathicleRelativeHeight: 5,
    pathicleWidth: 0.0025,

    showAxes: false,
    showVignette: true,
    viewRange: [0, 1],

    // lights: [
    //   {
    //     position: [0, 1, 0],
    //     direction: [1, 1, 0],
    //     color: new Array(3).fill(0)
    //   },
    //   {
    //     position: [0, 1, 0],
    //     direction: [-1, -1, 0],
    //     color: new Array(3).fill(0)
    //   }
    // ],ª

    camera: {
      center: [0, 1, 0],

      distance: 2,
      phi: (15 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI,

      fovY: (2 * Math.PI) / (360 / 35),
      autorotate: false,
      autorotateSpeedDistance: 0.1 * 2 * Math.PI,
      autorotateSpeedTheta: 0.1 * 2 * Math.PI,
      autorotateSpeedPhi: 0.1 * 2 * Math.PI,
      // rotationDecayTime: 0,
      // rotateAboutCenter: true,
      // zoomAboutCursor: false,
      zoomDecayTime: 1,
      // panDecayTime: 0,
      far: 200,
      near: 0.0001,

      minDistance: 0.1,
      maxDistance: 20
    }
  }
}
