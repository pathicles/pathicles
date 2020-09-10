export default {
  MAX_CANVAS_SIZE: 512,
  MAX_PARTICLE_COUNT: 512,
  MAX_BUFFER_LENGTH: 256,
  logPushing: false,
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

  usePostProcessing: false,
  pusher: 'boris', // "boris", "euler"
  simulateHalfFloat: false,

  runner: {
    prerender: false,
    loops: 1,

    mode: 'framewise',
    stepsPerTick: 4,
    stepCount: 127
  },

  model: {
    bufferLength: 128,
    tickDurationOverC: .2,
    boundingBoxSize: -1,
    emitter: {
      // "electron", "photon", "proton", "mixed"
      particleType: 'ELECTRON',
      randomize: false,

      // "row", "column", "cross", "square", "disc"
      bunchShape: 'square',
      particleCount: 128,
      particleSeparation: 0.1,
      gamma: 0,
      position: [0, 0, 0],
      direction: [0, 0, 1],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0]
    },
    interactions: {
      particleInteraction: false,
      gravityConstant: 0,
      electricField: [0, 0, 0],
      magneticField: [0, 0, 0]
    },
    lattice: {
      elements: {},
      beamline: []
    }
  },

  // view
  view: {
    lightPosition: [0, 2, 0],

    ssaoEnabled: false,

    stageGrid: {
      resolution: 256,
      y: 0,
      size: 50,
      dark: 1,
      light: 0.8
    },

    sky: [0.9, 1, 0, 1],

    shadowColor: [0.8, 0.8, 0.8, 1.0],
    ambientIntensity: 0.6,
    diffuse: 0,
    //drawBoundingBox: true,
    exposure: 0.2,
    fresnel: 1.0,
    fxaa: false,
    rgbGamma: 1,

    isStageVisible: true,
    isShadowEnabled: false,
    isLatticeVisible: false,

    pathicleRelativeGap: 2,
    pathicleRelativeHeight: 10,
    pathicleWidth: 0.003,

    roughness: 0.7,
    specular: 1,
    ssaoBlurPower: 2,
    ssaoBlurRadius: 0.1,
    ssaoPower: 1,
    ssaoSampleCount: 32,

    showTextures: true,
    texelSize: 1,
    viewRange: [0, 1],

    lights: [
      {
        position: [0, 1, 0],
        direction: [1, 1, 0],
        color: new Array(3).fill(0)
      },
      {
        position: [0, 1, 0],
        direction: [-1, -1, 0],
        color: new Array(3).fill(0)
      }
    ],

    camera: {
      position: [1, 1, 0],
      target: [0, 1, 0],

      fovY: (2 * Math.PI) / (360 / 60),
      dTheta: 0.01,
      autorotate: true,
      // rotationDecayTime: 0,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 0.1,
      // panDecayTime: 0,
      far: 50,
      near: 0.0001,

      minDistance: 0.1,
      maxDistance: 10
    }
  },

  dumpData: false
}
