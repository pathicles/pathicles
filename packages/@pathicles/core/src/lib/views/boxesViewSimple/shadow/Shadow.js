import { ortho, lookAt } from 'gl-mat4'
import { normalize } from 'gl-vec3'

import shadowDrawVert from './shadow.draw.vert'
import shadowDrawFrag from './shadow.draw.frag'
import shadowBlurVert from './shadow.blur.vert'
import shadowBlurFrag from './shadow.blur.frag'
import shadowDecodeFloatVert from './shadow.decodeFloat.vert'
import shadowDecodeFloatFrag from './shadow.decodeFloat.frag'

export const SHADOW_MAP_SIZE = 1024
export const TEXEL_SIZE = 0.5

const UINT8_VIEW = new Uint8Array(4)
const FLOAT_VIEW = new Float32Array(UINT8_VIEW.buffer)

function decodeFloat(x, y, z, w) {
  UINT8_VIEW[0] = w
  UINT8_VIEW[1] = z
  UINT8_VIEW[2] = y
  UINT8_VIEW[3] = x
  return FLOAT_VIEW[0]
}

export class Shadow {
  constructor(regl, { position, size, near, far, filterRadius = 5 }) {
    this.regl = regl
    this.fbo = regl.framebuffer({
      format: 'rgba',
      colorType: 'half float',
      depthStencil: false,
      color: regl.texture({
        width: SHADOW_MAP_SIZE,
        height: SHADOW_MAP_SIZE,
        format: 'rgba',
        colorType: 'half float',
        depthStencil: false
      }),
      depth: false
    })

    this.fboBlurred = regl.framebuffer({
      format: 'rgba',
      colorType: 'half float',
      depthStencil: false,
      color: regl.texture({
        width: SHADOW_MAP_SIZE,
        height: SHADOW_MAP_SIZE,
        format: 'rgba',
        colorType: 'half float',
        depthStencil: false
      }),
      depth: false
    })

    this.filterRadius = filterRadius

    this.update(position, size, near, far)

    // this.shadowDirection = [...position]
    // // normalize(this.shadowDirection, position)
    // this.shadowMapSize = SHADOW_MAP_SIZE
    //
    // this.shadowViewMatrix = lookAt(
    //   [],
    //   position,
    //   [0.0, 0.0, 0.0],
    //   [0.0, 0.0, 1.0]
    // )
    // this.near = -10 //near
    // this.far = 10 //far
    // this.shadowProjectionMatrix = ortho(
    //   [],
    //   -size,
    //   size,
    //   -size,
    //   size,
    //   this.near,
    //   this.far
    // )
  }

  update(position, size = this.size, near = this.near, far = this.far) {
    this.shadowDirection = [...position]
    normalize(this.shadowDirection, position)

    this.shadowViewMatrix = lookAt(
      [],
      position,
      [0.0, 0.0, 0.0],
      [0.0, 0.0, 1.0]
    )
    this.size = size //near
    this.near = near //near
    this.far = far //far
    this.shadowProjectionMatrix = ortho(
      [],
      -size,
      size,
      -size,
      size,
      this.near,
      this.far
    )
  }

  get uniforms() {
    return {
      shadowProjectionMatrix: () => this.shadowProjectionMatrix,
      shadowViewMatrix: () => this.shadowViewMatrix,
      shadowDirection: () => this.shadowDirection,

      minBias: () => 0.001,
      maxBias: () => 0.3
    }
  }

  blur() {
    return this.regl({
      frag: shadowBlurFrag,
      vert: shadowBlurVert,
      attributes: {
        position: [-4, -4, 4, -4, 0, 4]
      },
      uniforms: {
        minBias: () => 0.0001,
        u_tex: () => this.fbo,
        u_texSize: () => [SHADOW_MAP_SIZE, SHADOW_MAP_SIZE],
        wRcp: () => 1.0 / SHADOW_MAP_SIZE,
        hRcp: () => 1.0 / SHADOW_MAP_SIZE
      },
      depth: { enable: false },
      count: 3,
      framebuffer: () => this.fboBlurred
    })
  }

  readFBO() {
    // const floatBuffer = this.regl.framebuffer({
    //   color: this.regl.texture({
    //     width: SHADOW_MAP_SIZE,
    //     height: SHADOW_MAP_SIZE,
    //     // mag: 'nearest'
    //     format: 'rgba',
    //     type: 'float'
    //   }),
    //   depth: false
    // })

    // const arr = new Float32Array(SHADOW_MAP_SIZE * SHADOW_MAP_SIZE * 4)
    const arrInt = new Uint8Array(SHADOW_MAP_SIZE * SHADOW_MAP_SIZE * 4)

    this.regl({ framebuffer: this.fbo })(() => {
      // this.decodeFloat()()
      this.regl.read({ data: arrInt })
    })
    // this.regl({ framebuffer: floatBuffer })(() => {
    //   this.decodeFloat()()
    //   this.regl.read({ framebuffer: floatBuffer, data: arr })
    // })

    const untypedArray = Array.prototype.slice.call(arrInt)
    const floats = []
    for (let i = 0; i < untypedArray.length / 4; i++) {
      floats.push(
        decodeFloat([
          1,
          2,
          3,
          4
          // untypedArray[i * 4],
          // untypedArray[i * 4 + 1],
          // untypedArray[i * 4 + 2],
          // untypedArray[i * 4 + 3]
        ])
      )
    }
    // .filter((_, i) => i % 4 === 0)
    // .map((v) => (v < 0.000001 ? 0 : v))
    return floats
  }

  rgbaToFloat() {}

  decodeFloat() {
    return this.regl({
      vert: shadowDecodeFloatVert,
      frag: shadowDecodeFloatFrag,
      attributes: { position: [2, 0, 0, 2, -2, -2] },
      uniforms: {
        texture: this.fbo
      },
      viewport: {
        x: 0,
        y: 0,
        width: SHADOW_MAP_SIZE * TEXEL_SIZE,
        height: SHADOW_MAP_SIZE * TEXEL_SIZE
      },
      depth: {
        enable: false
      },
      count: 3
    })
  }

  drawFbo() {
    const command = this.regl({
      vert: shadowDrawVert,
      frag: shadowDrawFrag,

      // `
      // precision mediump float;
      // attribute vec2 position;
      // varying vec2 uv;
      // void main () {
      //   uv = position;
      //   gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      // }`,
      //
      // frag: `
      // precision mediump float;
      // uniform sampler2D texture;
      // varying vec2 uv;
      // float decodeFloat (vec4 color) {
      //   const vec4 bitShift = vec4(
      //   1.0 / (256.0 * 256.0 * 256.0),
      //   1.0 / (256.0 * 256.0),
      //   1.0 / 256.0,
      //   1
      //   );
      //   return dot(color, bitShift);
      // }
      // float unpackRGBA (vec4 v) {
      //   return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
      // }
      // void main () {
      //
      //   // vec4 texel = vec4(unpackRGBA(texture2D(texture, uv)));
      //   vec4 texel = texture2D(texture, uv);
      //   float depth = decodeFloat(texel);
      //   // texel = vec4(decodeFloat(texel));
      //
      //   gl_FragColor = texel; //vec4(uv,uv);
      //   // gl_FragColor = vec4(vec3(depth), 1.);
      // }`,

      attributes: { position: [2, 0, 0, 2, -2, -2] },

      uniforms: {
        texture: this.fbo
      },

      viewport: {
        x: 0,
        y: 0,
        width: SHADOW_MAP_SIZE * TEXEL_SIZE,
        height: SHADOW_MAP_SIZE * TEXEL_SIZE
      },
      depth: {
        enable: false
      },

      count: 3
    })

    return command()
  }
}
