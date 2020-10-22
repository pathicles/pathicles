// eslint-disable-next-line no-unused-vars
import { ortho, perspective, lookAt } from 'gl-mat4'

export const SHADOW_MAP_SIZE = 1024
export const TEXEL_SIZE = 0.1

export class Shadow {
  constructor(regl, shadowDirection) {
    this.regl = regl
    this.fbo = regl.framebuffer({
      color: regl.texture({
        width: SHADOW_MAP_SIZE,
        height: SHADOW_MAP_SIZE,
        // mag: 'nearest'
        // mag: 'linear'
        wrap: 'clamp'

        // type: 'float'
      }),
      depth: false
    })

    this.shadowDirection = shadowDirection
    this.shadowMapSize = SHADOW_MAP_SIZE

    this.shadowViewMatrix = lookAt(
      [],
      shadowDirection,
      [0.0, 0.0, 0.0],
      [0.0, 0.0, 1.0]
    )
    const SIZE = 10
    // this.shadowProjectionMatrix = ortho([], -10, 10, -10, 10, -10, 10)
    this.shadowProjectionMatrix = ortho([], -SIZE, SIZE, -SIZE, SIZE, -40.0, 30)
    // this.shadowProjectionMatrix = perspective(
    //   [],
    //   Math.PI / 2.0,
    //   1.0,
    //   0.25,
    //   70.0
    // )
    // this.shadowViewMatrix = lookAt([], [0, 1, 0], [0, 0, 0], [0, 0, 1])
    // lookAt(
    //   [],
    //   shadowDirection,
    //   [0, 0, 0],
    //   // [shadowDirection[0], shadowDirection[1] - 1.0, shadowDirection[2]],
    //   [0.0, 0.0, 1.0]
    // )
  }

  get uniforms() {
    return {
      shadowProjectionMatrix: this.shadowProjectionMatrix,
      shadowViewMatrix: this.shadowViewMatrix,
      shadowDirection: this.shadowDirection,

      minBias: () => 0.001,
      maxBias: () => 0.3
    }
  }

  drawFbo() {
    const command = this.regl({
      vert: `
      precision mediump float;
      attribute vec2 position;
      varying vec2 uv;
      void main () {
        uv = position;
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,

      frag: `
      precision mediump float;
      uniform sampler2D texture;
      varying vec2 uv;
      float decodeFloat (vec4 color) {
        const vec4 bitShift = vec4(
        1.0 / (256.0 * 256.0 * 256.0),
        1.0 / (256.0 * 256.0),
        1.0 / 256.0,
        1
        );
        return dot(color, bitShift);
      }
      float unpackRGBA (vec4 v) {
        return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
      }
      void main () {

        // vec4 texel = vec4(unpackRGBA(texture2D(texture, uv)));
        vec4 texel = texture2D(texture, uv);
        float depth = decodeFloat(texel);
        // texel = vec4(decodeFloat(texel));

        gl_FragColor = texel; //vec4(uv,uv);
        gl_FragColor = vec4(vec3(depth), 1.);
      }`,

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
