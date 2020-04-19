// render point-light shadows into a cubemap
import { perspective, lookAt } from 'gl-mat4'

const defaultVertex = /* glsl */ `
    attribute vec3 position;
    attribute vec2 uv;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

const defaultFragment = /* glsl */ `
    precision highp float;

    vec4 packRGBA (float v) {
        vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v);
        pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;
        return pack;
    }

    void main() {
        gl_FragColor = packRGBA(gl_FragCoord.z);
    }
`

export default function(regl, { lightPosition }, fbo) {
  return regl({
    uniforms: {
      projection: perspective([], Math.PI / 2.0, 1.0, 0.25, 70.0),
      view: function(context, props, batchId) {
        switch (batchId) {
          case 0: // +x
            return lookAt(
              [],
              lightPosition,
              [lightPosition[0] + 1.0, lightPosition[1], lightPosition[2]],
              [0.0, -1.0, 0.0]
            )
          case 1: // -x
            return lookAt(
              [],
              lightPosition,
              [lightPosition[0] - 1.0, lightPosition[1], lightPosition[2]],
              [0.0, -1.0, 0.0]
            )
          case 2: // +y
            return lookAt(
              [],
              lightPosition,
              [lightPosition[0], lightPosition[1] + 1.0, lightPosition[2]],
              [0.0, 0.0, 1.0]
            )
          case 3: // -y
            return lookAt(
              [],
              lightPosition,
              [lightPosition[0], lightPosition[1] - 1.0, lightPosition[2]],
              [0.0, 0.0, -1.0]
            )
          case 4: // +z
            return lookAt(
              [],
              lightPosition,
              [lightPosition[0], lightPosition[1], lightPosition[2] + 1.0],
              [0.0, -1.0, 0.0]
            )
          case 5: // -z
            return lookAt(
              [],
              lightPosition,
              [lightPosition[0], lightPosition[1], lightPosition[2] - 1.0],
              [0.0, -1.0, 0.0]
            )
          default:
            break
        }
      }
    },

    frag: defaultFragment,
    vert: defaultVertex,

    framebuffer: function(context, props, batchId) {
      return fbo.faces[batchId]
    }
  })
}
