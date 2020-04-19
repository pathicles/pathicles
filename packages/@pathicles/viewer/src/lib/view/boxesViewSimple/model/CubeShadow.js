// render point-light shadows into a cubemap
import { perspective, lookAt } from 'gl-mat4'

export const CUBE_MAP_SIZE = 1024
export const TEXEL_SIZE = 1

export class CubeShadow {
  constructor(regl, lightPosition) {
    this.regl = regl
    this.fbo = regl.framebufferCube({
      radius: CUBE_MAP_SIZE,
      colorFormat: 'rgba',
      colorType: 'uint8'
    })

    this.lightPosition = lightPosition

    this.shadowViewMatrix_x = lookAt(
      [],
      lightPosition,
      [lightPosition[0] + 1.0, lightPosition[1], lightPosition[2]],
      [0.0, -1.0, 0.0]
    )
    this.shadowViewMatrix_x_ = lookAt(
      [],
      lightPosition,
      [lightPosition[0] - 1.0, lightPosition[1], lightPosition[2]],
      [0.0, -1.0, 0.0]
    )
    this.shadowViewMatrix_y = lookAt(
      [],
      lightPosition,
      [lightPosition[0], lightPosition[1] + 1.0, lightPosition[2]],
      [0.0, 0.0, 1.0]
    )
    this.shadowViewMatrix_y_ = lookAt(
      [],
      lightPosition,
      [lightPosition[0], lightPosition[1] - 1.0, lightPosition[2]],
      [0.0, 0.0, -1.0]
    )
    this.shadowViewMatrix_z = lookAt(
      [],
      lightPosition,
      [lightPosition[0], lightPosition[1], lightPosition[2] + 1.0],
      [0.0, -1.0, 0.0]
    )
    this.shadowViewMatrix_z_ = lookAt(
      [],
      lightPosition,
      [lightPosition[0], lightPosition[1], lightPosition[2] - 1.0],
      [0.0, -1.0, 0.0]
    )

    this.shadowProjectionMatrix = perspective(
      [],
      Math.PI / 2.0,
      1.0,
      0.25,
      70.0
    )
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
      uniform samplerCube texture;
      varying vec2 uv;
      float unpackRGBA (vec4 v) {
        return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
      }
      void main () {
        vec3 texCoord = vec3(uv.xy, 0.);
        vec4 texel = vec4(unpackRGBA(textureCube(texture, texCoord)));
        gl_FragColor = texel;
      }`,

      attributes: { position: [2, 0, 0, 2, -2, -2] },

      uniforms: {
        texture: this.fbo
      },

      viewport: {
        x: (_, __, batchId) => {
          batchId * CUBE_MAP_SIZE * TEXEL_SIZE
        },
        y: 0,
        width: CUBE_MAP_SIZE * TEXEL_SIZE,
        height: CUBE_MAP_SIZE * TEXEL_SIZE
      },
      depth: {
        enable: false
      },

      count: 3
    })

    return command()
  }
}
