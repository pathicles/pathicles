var map;

try {
  map = Map;
} catch (_) {}

var set;

try {
  set = Set;
} catch (_) {}

function clone(src) {
  if (!src || typeof src !== 'object' || typeof src === 'function') {
    return src;
  }

  if (src.nodeType && 'cloneNode' in src) {
    return src.cloneNode(true);
  }

  if (src instanceof Date) {
    return new Date(src.getTime());
  }

  if (src instanceof RegExp) {
    return new RegExp(src);
  }

  if (Array.isArray(src)) {
    return src.map(clone);
  }

  if (map && src instanceof map) {
    return new Map(Array.from(src.entries()));
  }

  if (set && src instanceof set) {
    return new Set(Array.from(src.values()));
  }

  if (src instanceof Object) {
    var obj = {};

    for (var key in src) {
      obj[key] = clone(src[key]);
    }

    return obj;
  }

  return src;
}

var nanoclone = clone;

var types = [{
  name: "primitive",
  is: function (el) {
    var type = typeof el;
    return type === "number" || type === "string" || type === "boolean";
  },
  default: "default",
  merge: {
    default: function (merger, a, b) {
      return b;
    }
  }
}, {
  name: "object",
  is: function (el) {
    return el !== null && typeof el === "object";
  },
  default: "deep",
  merge: {
    deep: function (merger, a, b) {
      var result = {};
      var keys = {
        a: Object.keys(a),
        b: Object.keys(b)
      };
      keys.a.concat(keys.b).forEach(function (key) {
        result[key] = merger(a[key], b[key]);
      });
      return result;
    }
  }
}, {
  name: "array",
  is: function (el) {
    return Array.isArray(el);
  },
  default: "replace",
  merge: {
    merge: function (merger, a, b) {
      var result = [];

      for (var i = 0; i < Math.max(a.length, b.length); ++i) {
        result.push(merger(a[i], b[i]));
      }

      return result;
    },
    replace: function (merger, a, b) {
      return nanoclone(b);
    },
    concat: function (merger, a, b) {
      return [].concat(a).concat(b);
    }
  }
}];
var types_1 = types;

function normalizeConfig(config) {
  return {
    strategy: config.strategy || {},
    types: {
      mode: (config.types || {}).mode || "add",
      list: (config.types || {}).list || []
    }
  };
}

function Merge(config) {
  config = normalizeConfig(config || {});
  this.types = (config.types.mode === "add" ? types_1 : []).concat(config.types.list);
  this.config = config;
}

Merge.prototype.determineType = function (a, b) {
  for (var i = this.types.length - 1; i >= 0; --i) {
    var type = this.types[i];

    if (type.is(a) && type.is(b)) {
      return type;
    } else if (type.is(a) || type.is(b)) {
      break;
    }
  }

  return null;
};

Merge.prototype.step = function (a, b) {
  if (b === void 0) {
    return nanoclone(a);
  }

  var type = this.determineType(a, b);

  if (!type) {
    return nanoclone(b);
  }

  var strategy = this.config.strategy[type.name] || type.default;
  return type.merge[strategy](this.step.bind(this), a, b);
};

Merge.prototype.merge = function () {
  var elements = Array.prototype.slice.call(arguments);
  var result;

  for (var i = elements.length; i > 0; --i) {
    result = this.step(elements.pop(), result);
  }

  return result;
};

var merge = Merge;

var merger = new merge();

var nanomerge = function nanomerge() {
  return merger.merge.apply(merger, arguments);
};

const defaultConfig = {
  MAX_CANVAS_SIZE: 1024,
  MAX_PARTICLE_COUNT: 512,
  MAX_BUFFER_LENGTH: 256,
  logPushing: false,
  logPerformance: false,
  stats: false,
  profile: false,
  colors: [[0.92, 0.75, 0.0], [0.12, 0.45, 0.65], [0.12, 0.45, 0.65], [0.77, 0.2, 0.2]],
  mass: [0, 510998.94, 510998.94, 938272081],
  charge: [0, -1, 1, 1],
  chargeMassRatio: [0, -1.75882004556243e11, 1.75882004556243e11, 9.57883323113770929296814695637e7],
  usePostProcessing: false,
  pusher: 'boris',
  runner: {
    prerender: false,
    looping: true,
    mode: 'framewise',
    stepsPerTick: 4,
    stepCount: 256
  },
  model: {
    bufferLength: 256 / 2,
    tickDurationOverC: 0.2,
    boundingBoxSize: -1,
    emitter: {
      particleType: 'ELECTRON',
      randomize: false,
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
    lights: [{
      position: [0, 1, 0],
      direction: [1, 1, 0],
      color: new Array(3).fill(0)
    }, {
      position: [0, 1, 0],
      direction: [-1, -1, 0],
      color: new Array(3).fill(0)
    }],
    camera: {
      center: [0, 0, 0],
      theta: Math.PI / 2,
      phi: 0,
      distance: 10,
      fovY: Math.PI / 2.5,
      dTheta: 0.01,
      autorotate: true,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      far: 50,
      near: 0.0001
    }
  },
  dumpData: false
};

const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      center: [0, 0.1, 0],
      theta: 2 * Math.PI / (360 / 90),
      phi: 2 * Math.PI / (360 / 15),
      distance: 5
    }
  },
  model: {
    emitter: {
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0.15, -1],
      position: [3.2, -1.5, 0],
      directionJitter: [0.05, 0.0, 0.05],
      positionJitter: [0.5, 0.5, 0.1],
      gamma: 900
    },
    interactions: {
      magneticField: [0, 0.5, 0],
      particleInteraction: false
    },
    lattice: {
      elements: {
        l2: {
          type: 'DRIF',
          l: 0
        },
        bm: {
          type: 'SBEN',
          angle: 0.78539816,
          e1: 0.39269908,
          e2: 0.39269908,
          l: 10,
          k1: -0.5
        }
      },
      beamline: [],
      origin: {
        phi: 0,
        position: [-5, 1, 0]
      }
    }
  }
};

const storyElectric = {
  name: 'story-electric',
  view: {
    camera: {
      center: [-2, 0, 0],
      theta: Math.PI / 4,
      phi: 0,
      distance: 5
    }
  },
  model: {
    emitter: {
      particleType: 'ELECTRON ELECTRON ELECTRON PROTON PROTON PROTON   PHOTON PHOTON PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 1, -10],
      directionJitter: [0.01, 0.01, 0],
      positionJitter: [0.1, 0.1, 0],
      gamma: 10
    },
    interactions: {
      electricField: [0, 0, 0.001],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    },
    lattice: {
      elements: {
        l1: {
          type: 'DRIF',
          l: 3
        },
        q1: {
          type: 'QUAD',
          k1: 0,
          l: 3
        },
        q2: {
          type: 'QUAD',
          k1: -0,
          l: 3
        },
        l2: {
          type: 'DRIF',
          l: 3
        }
      },
      beamline: ['l1', 'q1', 'q2', 'l2'],
      origin: {
        phi: 0,
        position: [0, 1, -6]
      }
    }
  }
};

const storyQuadrupole = {
  name: 'story-quadrupole',
  view: {
    camera: {
      center: [0, 1, 0],
      theta: 2 * Math.PI / (360 / 45),
      phi: 2 * Math.PI / (360 / 5),
      distance: 6
    }
  },
  model: {
    emitter: {
      bunchShape: 'SQUARE_YZ',
      particleType: 'ELECTRON ELECTRON ELECTRON PROTON ELECTRON ELECTRON ELECTRON ELECTRON PHOTON',
      position: [-5, 1, 0],
      direction: [1, 0, 0],
      directionJitter: [0, 0.1, 0.1],
      positionJitter: [0, 0.1, 0.1],
      gamma: 1000
    },
    lattice: {
      elements: {
        l1: {
          type: 'DRIF',
          l: 3
        },
        q1: {
          type: 'QUAD',
          k1: -0.05,
          l: 3
        },
        q2: {
          type: 'QUAD',
          k1: 0.15,
          l: 3
        },
        l2: {
          type: 'DRIF',
          l: 3
        }
      },
      beamline: ['l1', 'q1', 'q2', 'l2'],
      origin: {
        phi: -Math.PI / 2,
        position: [-10, 1, 0]
      }
    }
  }
};

const random = {
  name: 'random',
  model: {
    boundingBoxSize: 5,
    emitter: {
      randomize: true,
      gamma: 100,
      particleType: 'PHOTON ELECTRON PROTON'
    },
    lattice: {
      elements: {
        l2: {
          type: 'DRIF',
          l: 5
        },
        bm: {
          type: 'SBEN',
          angle: 0.78539816,
          e1: 0.39269908,
          e2: 0.39269908,
          l: 1.8,
          k1: -0.4
        }
      },
      beamline: [],
      origin: {
        phi: -Math.PI,
        position: [0, 1, 5]
      }
    }
  }
};

const freeElectron = {
  name: 'free-electron',
  view: {
    camera: {
      center: [0, 0, 0],
      theta: Math.PI / 2,
      phi: 0,
      distance: 2,
      fovY: Math.PI / 3,
      dTheta: 0.001,
      autorotate: false,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      far: 50,
      near: 0.0001
    }
  },
  runner: {
    prerender: true,
    looping: true,
    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 10
  },
  model: {
    bufferLength: 11,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 0, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 2
    },
    interactions: {
      electricField: [0, 0, 1],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
};

const freePhoton = {
  name: 'free-photon',
  view: {
    camera: {
      center: [0, -0.5, 0],
      theta: Math.PI / 2,
      phi: Math.PI / 4,
      distance: 1,
      fovY: Math.PI / 3,
      dTheta: 0.001,
      autorotate: false,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      far: 50,
      near: 0.0001
    }
  },
  runner: {
    prerender: true,
    looping: true,
    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 10
  },
  model: {
    bufferLength: 11,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 0, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 10
    },
    interactions: {
      electricField: [0, 0, 0.01],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
};

const freePhotons = {
  name: 'free-photons',
  view: {
    camera: {
      center: [0, 0, 0],
      theta: Math.PI / 2,
      phi: 0,
      distance: 2,
      fovY: Math.PI / 3,
      dTheta: 0.001,
      autorotate: false,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      far: 50,
      near: 0.0001
    }
  },
  runner: {
    prerender: true,
    looping: true,
    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 8
  },
  model: {
    bufferLength: 8,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 2,
      particleType: 'PHOTON ELECTRON PROTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, -.5, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 1.1
    },
    interactions: {
      electricField: [0, 0, 0.091],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
};

const presets = {
  [storyDipole.name]: storyDipole,
  [storyElectric.name]: storyElectric,
  [storyQuadrupole.name]: storyQuadrupole,
  [freeElectron.name]: freeElectron,
  [freePhoton.name]: freePhoton,
  [freePhotons.name]: freePhotons,
  [random.name]: random
};

const config = presetName => {
  return nanomerge(defaultConfig, presets[presetName]) || defaultConfig;
};

export { config, defaultConfig, presets };
