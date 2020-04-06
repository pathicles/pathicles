import createCube from 'primitive-cube'
import mat4 from 'gl-mat4'

export default function(regl, stageGrid) {
  const cube = createCube(stageGrid.size, stageGrid.size, stageGrid.size)

  const stageGridOffsets = createOffsets(stageGrid)

  const texData = createTexture(stageGrid)

  const command = mode =>
    regl({
      primitive: 'triangles',
      elements: cube.cells,
      instances: stageGrid.count * stageGrid.count,
      uniforms: {
        tex: regl.texture({
          width: stageGrid.resolution,
          height: stageGrid.resolution,
          min: 'linear mipmap linear',
          mag: 'linear',
          wrap: 'repeat',
          data: texData
        }),
        model: mat4.identity([])
      },

      vert: `
  precision mediump float;
  attribute vec3 position;
  attribute vec3 normal;
  attribute vec2 uv;
  varying vec2 vUv;
  // These three are instanced attributes.
  attribute vec3 offset;
  uniform mat4 projection;
  uniform mat4 model;
  uniform mat4 view;
  varying vec3 vPosition;
  varying vec3 vNormal;

  float grid(vec2 st, float res){
    vec2 grid = fract(st*res);
    return 1.-(step(res,grid.x) * step(res,grid.y));
}

float box(in vec2 st, in vec2 size){
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,
                        size+vec2(0.001),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.001),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}
  void main () {
    vUv = uv;
    vNormal = normal;
    vPosition = position + offset;
    gl_Position = projection * view * model * vec4(
      vPosition,
      1.0);
  }`,
      frag: `
  #define ${mode} 1
  precision mediump float;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  uniform sampler2D tex;
  uniform vec3 eye;

float fog_linear(
  const float dist,
  const float start,
  const float end) {
  return 1.-clamp((end-dist)/(end-start),0.,1.);
}

  void main () {

      #ifdef depthNormal
        gl_FragColor = vec4(gl_FragCoord.z, vNormal);
      #endif

      #ifdef diffuse
        float dist = length(vPosition);
        vec3 color =  texture2D(tex, vUv.xy).rgb;
        gl_FragColor = vec4(color , 1.);
      #endif

      #ifdef lighting
        float dist = length(vPosition);
        vec3 color =  texture2D(tex, vUv.xy).rgb;

        float fogDistance=length(eye - vPosition);
        float fogAmount = fog_linear(fogDistance, 0., 20.);

        gl_FragColor = mix(
          vec4(color, 1),
          vec4(1, 1, 1, 1),
          fogAmount);
      #endif

      #ifdef position
        gl_FragColor = vec4(vPosition, 1.);
      #endif

    }`,
      attributes: {
        position: cube.positions,
        uv: cube.uvs,
        normal: cube.normals,
        offset: {
          buffer: regl.buffer(stageGridOffsets),
          divisor: 1
        }
      }
    })

  return {
    depthNormal: command('depthNormal'),
    position: command('position'),
    diffuse: command('diffuse'),
    lighting: command('lighting')
  }
}

function createTexture({ dark = 0.1, light = 0.3, resolution = 512 } = {}) {
  const texData = []
  // make cube texture.
  for (let y = 0; y < resolution; ++y) {
    for (let x = 0; x < resolution; ++x) {
      let ind = 4 * (y * resolution + x)

      const borderWidth = 10 / resolution
      const uvx = x / resolution
      const uvy = y / resolution

      const k = Math.min(uvx, Math.min(uvy, Math.min(1.0 - uvx, 1.0 - uvy)))

      if (k < borderWidth) {
        texData[ind + 0] = light * 255
        texData[ind + 1] = light * 255
        texData[ind + 2] = light * 255
        texData[ind + 3] = 255
      } else if (
        Math.abs(uvx - 0.5) < borderWidth ||
        Math.abs(uvy - 0.5) < borderWidth
      ) {
        texData[ind + 0] = ((light + dark) * 255) / 2
        texData[ind + 1] = ((light + dark) * 255) / 2
        texData[ind + 2] = ((light + dark) * 255) / 2
        texData[ind + 3] = 255
      } else {
        texData[ind + 0] = dark * 255
        texData[ind + 1] = dark * 255
        texData[ind + 2] = dark * 255
        texData[ind + 3] = 255
      }

      if (Math.floor(uvx * 10) - uvx * 10 > 0.1) {
        texData[ind + 0] = dark * 255
        texData[ind + 1] = dark * 9
        texData[ind + 2] = dark * 0
      }
    }
  }

  return texData
}

function createOffsets({ count, size, dy }) {
  const offsets = []
  const ON = (count - 1) / 2
  for (let x = -ON; x <= ON; x++) {
    for (let y = -ON; y <= ON; y++) {
      offsets.push([
        x * size,
        dy - size + (x > -1 && x < 2 && y > -10 ? (0 * size) / 2 : 0),
        y * size
      ])
    }
  }
  return offsets
}
