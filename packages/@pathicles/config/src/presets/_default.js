import { RUNNER_MODE } from '../constants'

export default {
  name: 'default',
  debug: {
    logPushing: true,
    logPerformance: false,
    showTextures: false,
    showTextureScale: 1
  },
  runner: {
    pusher: 'glsl',
    factor: 1,
    enabled: true,
    packFloat2UInt8: false,
    prerender: true,
    loops: 0,
    mode: RUNNER_MODE.NOBREAK,
    iterationsPerSnapshot: 2,
    iterationCount: 127,
    iterationDurationOverC: 0.05,
    snapshotCount: 128
  },

  model: {
    boundingBoxSize: 0,
    emitter: {
      // "electron", "photon", "proton", "mixed"
      particleType: 'ELECTRON',
      bunchShape: 'SPIRAL_XY',
      particleCount: 64,
      particleSeparation: 0.03,
      gamma: () => 2.25,
      positionJitter: [0.0, 0.0, 0]
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
        position: [0, 5, 0],
        near: -5,
        far: 10,
        size: 9
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

    showAxes: true,
    showVignette: true,
    viewRange: [0, 1],

    camera: {
      center: [0, 1, 0],

      distance: 2,
      phi: (15 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI,

      fovY: (5 * Math.PI) / (360 / 10),
      autorotate: false,
      autorotateDistance: 0.1 * 2 * Math.PI,
      autorotateSpeedTheta: 0.1 * 2 * Math.PI,
      autorotateSpeedPhi: 0.1 * 2 * Math.PI,
      zoomDecayTime: 1,
      // panDecayTime: 0,
      far: 200,
      near: 0.0001,

      minDistance: 0.1,
      maxDistance: 20
    }
  }
}
