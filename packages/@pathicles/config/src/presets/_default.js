export const defaultConfig = {
  MAX_CANVAS_SIZE: 1024,
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

  runner: {
    prerender: false,
    looping: true,

    mode: 'framewise',
    stepsPerTick: 2,
    stepCount: 256
  },

  model: {
    bufferLength: 256 / 2,
    tickDurationOverC: 0.2,
    boundingBoxSize: -1,
    emitter: {
      // "electron", "photon", "proton", "mixed"
      particleType: 'ELECTRON',
      randomize: false,

      // "row", "column", "cross", "square", "disc"
      bunchShape: 'disc',
      particleCount: 256,
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
    ssaoEnabled: false,

    stageGrid: {
      resolution: 256,
      y: -1,
      size: 20,
      dark: 1,
      light: 0.8
    },

    sky: [0.9, 1, 0, 1],

    shadowColor: [0.3, 0.3, 0.3],
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

    pathicleRelativeGap: 1,
    pathicleRelativeHeight: 5,
    pathicleWidth: 0.005,

    roughness: 0.7,

    specular: 1,
    ssaoBlurPower: 2,
    ssaoBlurRadius: 0.1,
    ssaoPower: 1,
    ssaoSampleCount: 32,

    showTextures: false,
    texelSize: 2,
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
      center: [0, 0, 0],
      theta: Math.PI / 2,
      phi: 0,
      distance: 10,

      fovY: Math.PI / 2.5,
      dTheta: 0.01,
      autorotate: true,
      // rotationDecayTime: 0,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      // panDecayTime: 0,
      far: 50,
      near: 0.0001
    }
  },

  dumpData: false
}
