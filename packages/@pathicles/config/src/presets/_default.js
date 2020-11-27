import { RUNNER_MODE } from '../constants'

export default {
  debug: {
    logPushing: false,
    logPerformance: false,
    profile: false,
    showTextures: false,
    showTextureScale: 10
  },

  colors_float: [
    [0.92, 0.75, 0.0],
    [0.12, 0.45, 0.65],
    [0.12, 0.45, 0.65],
    [0.77, 0.2, 0.2]
  ],

  colors: [
    [235, 192, 0],
    [31, 115, 166],
    [31, 115, 166],
    [197, 51, 51]
  ],
  mass: [0, 510998.94, 510998.94, 938272081],
  charge: [0, -1, 1, 1],
  chargeMassRatio: [
    0,
    -1.75882004556243e11,
    1.75882004556243e11,
    9.57883323113770929296814695637e7
  ],

  channelsPerValueCount: 4,

  runner: {
    prerender: false,
    loops: 0,
    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerTick: 2,
    iterationCount: 127
  },

  model: {
    iterationDurationOverC: 0.25,
    bufferLength: 128,
    boundingBoxSize: -1,
    emitter: {
      // "electron", "photon", "proton", "mixed"
      particleType: 'ELECTRON',
      bunchShape: 'SPIRAL_XY',
      particleCount: 121,
      particleSeparation: 0.075,
      gamma: 1.25,
      position: [0, 0, 0],
      direction: [0, 0, 1],
      positionJitter: [0.1, 0.1, 0.1]
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
  },

  dumpData: false
}
