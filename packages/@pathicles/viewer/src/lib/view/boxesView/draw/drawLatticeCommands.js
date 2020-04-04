import createCube from 'primitive-cube'
import { identity } from 'gl-mat4'

export default function(regl, { lattice }) {
  const cube = createCube(1)

  const transformations = lattice.transformations

  const command = mode =>
    regl({
      primitive: 'triangles',
      elements: cube.cells,
      instances: lattice.beamline.length,
      uniforms: {
        model: identity([])
      },

      vert: `
  precision mediump float;
  attribute vec3 aPosition;
  attribute float aVertexColorCorrection;
  attribute vec3 aColor;
  attribute vec3 normal;
  attribute vec2 uv;
  varying vec2 vUv;
  // These three are instanced attributes.
  attribute vec3 aTranslation;
  attribute vec3 aScale;
  attribute float aPhi;
  uniform mat4 projection;
  uniform mat4 model;
  uniform mat4 view;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vColor;

  mat4 fromYRotation (float phi) {
    float s = sin(phi);
    float c = cos(phi);
    return mat4(
      c,
      0.,
      -s,
      0.,
      0.,
      1.,
      0.,
      0.,
      s,
      0.,
      c,
      0.,
      0.,
      0.,
      0.,
      1.);
  }
  void main () {
    vUv = uv;
    vNormal = normal;
    vPosition = (fromYRotation(aPhi) * vec4((aScale * aPosition), 1.)).xyz + aTranslation;
    vColor = aColor * aVertexColorCorrection;
    gl_Position = projection * view * model * vec4(
      vPosition,
      1.0);
  }`,
      frag: `
  #define ${mode} 1
  precision mediump float;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vColor;
  varying vec2 vUv;

  void main () {

      #ifdef depthNormal
        gl_FragColor = vec4(gl_FragCoord.z, vNormal);
      #endif

      #ifdef diffuse
        vec3 color = vColor;
        gl_FragColor = vec4(vColor, 1.);
        // gl_FragColor = vec4(0., 0., 0., 1.);
      #endif
      
      #ifdef lighting
        vec3 color = vColor;
        gl_FragColor = vec4(vColor, 1.);
        // gl_FragColor = vec4(0., 0., 0., 1.);
      #endif

      #ifdef position
        gl_FragColor = vec4(vPosition, 1);
      #endif

    }`,
      attributes: {
        aPosition: cube.positions,
        uv: cube.uvs,
        normal: cube.normals,
        aColor: {
          buffer: regl.buffer([
            [1, 0, 0],
            [1, 1, 0],
            [1, 0, 1]
          ]),
          divisor: 1
        },
        aTranslation: {
          buffer: regl.buffer(transformations.map(t => t.translation)),
          divisor: 1
        },
        aPhi: {
          buffer: regl.buffer(lattice.transformations.map(t => -t.phi)),
          divisor: 1
        },
        aScale: {
          buffer: regl.buffer(lattice.transformations.map(t => t.scale)),
          divisor: 1
        },
        aVertexColorCorrection: [
          0,
          1,
          1,
          0,
          0,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          1,
          0,
          1
        ]
      }
    })

  return {
    depthNormal: command('depthNormal'),
    position: command('position'),
    lighting: command('lighting'),
    diffuse: command('diffuse')
  }
}

// function createTexture({ dark = 0.1, light = 0.3, resolution = 512 } = {}) {
//   const texData = []
//   // make cube texture.
//   for (let y = 0; y < resolution; ++y) {
//     for (let x = 0; x < resolution; ++x) {
//       let ind = 4 * (y * resolution + x)

//       var borderWidth = 2 / resolution
//       var uvx = x / resolution
//       var uvy = y / resolution

//       var k = Math.min(uvx, Math.min(uvy, Math.min(1.0 - uvx, 1.0 - uvy)))

//       if (k > borderWidth) {
//         texData[ind + 0] = dark * 255
//         texData[ind + 1] = dark * 255
//         texData[ind + 2] = dark * 255
//         texData[ind + 3] = 255
//       } else {
//         texData[ind + 0] = light * 255
//         texData[ind + 1] = light * 255
//         texData[ind + 2] = light * 255
//         texData[ind + 3] = 255
//       }

//       if (Math.floor(uvx * 10) - uvx * 10 > 0.1) {
//         texData[ind + 0] = dark * 255
//         texData[ind + 1] = dark * 9
//         texData[ind + 2] = dark * 0
//       }
//     }
//   }

//   return texData
// }
