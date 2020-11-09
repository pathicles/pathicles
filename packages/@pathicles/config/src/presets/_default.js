export default {
  MAX_CANVAS_SIZE: 512,
  MAX_PARTICLE_COUNT: 512,
  MAX_BUFFER_LENGTH: 256,
  logPushing: true,
  logPerformance: false,

  stats: false,
  profile: false,

  colors: [
    [0.92, 0.75, 0.0],
    [0.12, 0.45, 0.65],
    [0.12, 0.45, 0.65],
    [0.77, 0.2, 0.2]
  ],
  mass: [0, 510998.94, 510998.94, 938272081],
  charge: [0, -1, 1, 1],
  chargeMassRatio: [
    0,
    -1.75882004556243e11,
    1.75882004556243e11,
    9.57883323113770929296814695637e7
  ],

  pusher: 'boris', // "boris", "euler"
  simulateHalfFloat: false,
  renderToFloat: true,
  channelsPerValueCount: 1,

  runner: {
    prerender: false,
    loops: 10,
    mode: 'framewise',
    stepsPerTick: 2,
    stepCount: 128
  },

  model: {
    iterationStepDurationOverC: 0.5,
    bufferLength: 64,
    boundingBoxSize: -1,
    emitter: {
      // "electron", "photon", "proton", "mixed"
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE_XY',
      particleCount: 121,
      particleSeparation: 0.05,
      gamma: 1.2,
      position: [0, 0, 0],
      direction: [0, 0, 1],
      directionJitter: [0.04, 0.04, 0],
      positionJitter: [0.1, 0.1, 0]
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

    pathicleRelativeGap: 1,
    pathicleRelativeHeight: 4,
    pathicleWidth: 0.003,

    showAxes: false,
    showVignette: true,
    showTextures: false,
    showTextureTexelSize: 1,
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
