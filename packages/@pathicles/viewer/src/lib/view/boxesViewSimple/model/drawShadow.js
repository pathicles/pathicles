// render point-light shadows into a cubemap
import { perspective, lookAt } from 'gl-mat4'

export default function (regl, { lightPosition }, shadowFbo) {
  return regl({
    uniforms: {
      projection: perspective([], Math.PI / 2.0, 1.0, 0.25, 70.0),
      view: function (context, props, batchId) {
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

    frag: `
  precision mediump float;
  varying vec3 vPosition;
  uniform vec3 lightPosition;
  void main () {
    gl_FragColor = vec4(vec3(distance(vPosition, lightPosition)), 1.0);
  }`,

    vert: `
  precision mediump float;
  attribute vec3 position;
  varying vec3 vPosition;
  uniform mat4 projection, view, model;
  void main() {
    vec4 p = model * vec4(position, 1.0);
    vPosition = p.xyz;
    gl_Position = projection * view * p;
  }`,

    framebuffer: function (context, props, batchId) {
      return shadowFbo.faces[batchId]
    }
  })
}
