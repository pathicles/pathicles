// render point-light shadows into a cubemap
// eslint-disable-next-line no-unused-vars
import { perspective, ortho, lookAt } from 'gl-mat4'

export const SIZE = 1024
export const TEXEL_SIZE = 1

export class Shadow {
  constructor(regl, lightPosition) {
    this.regl = regl
    this.fbo = regl.framebuffer({
      radius: SIZE,
      colorFormat: 'rgba',
      colorType: 'uint8'
    })

    this.lightPosition = lightPosition

    this.shadowViewMatrix = lookAt(
      [],
      lightPosition,
      [lightPosition[0] - 1.0, lightPosition[1], lightPosition[2]],
      [0.0, -1.0, 0.0]
    )

    this.shadowProjectionMatrix = perspective(
      [],
      Math.PI / 2.0,
      1.0,
      0.25,
      70.0
    )

    // this.shadowProjectionMatrix = ortho([], -1, 1, -1, 1, 0.001, 100)
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
      float unpackRGBA (vec4 v) {
        return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
      }
      void main () {

        // vec4 texel = vec4(unpackRGBA(texture2D(texture, uv)));
        vec4 texel = texture2D(texture, uv);
        gl_FragColor = texel; //vec4(uv,uv);
      }`,

      attributes: { position: [2, 0, 0, 2, -2, -2] },

      uniforms: {
        texture: this.fbo
      },

      viewport: {
        x: 0,
        y: 0,
        width: SIZE * TEXEL_SIZE,
        height: SIZE * TEXEL_SIZE
      },
      depth: {
        enable: true
      },

      count: 3
    })

    return command()
  }
}
