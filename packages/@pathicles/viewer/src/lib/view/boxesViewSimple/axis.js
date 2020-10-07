import * as mat4 from 'gl-mat4'
import { rotationTo } from 'gl-quat'

export function drawAxisCommand(regl, d) {
  const model = new Float32Array(16)
  return regl({
    frag: `
      precision highp float;
      uniform vec3 axis;
      void main () {
        gl_FragColor = vec4(axis,1);
      }
    `,
    vert: `
      precision highp float;
      uniform mat4 projection, view, model;
      uniform vec3 eye, center;
      attribute vec3 position;
      void main () {
        gl_Position = projection * view * model * vec4(position,1);
      }
    `,
    uniforms: {
      axis: regl.prop('axis'),
      model: function (context, props) {
        mat4.identity(model)
        var angle = 0
        // if (props.axis[0] > 0) {
        //   angle =
        //     Math.atan2(context.camera.state.eye[2], context.eye[1]) +
        //     Math.PI / 2
        // } else if (props.axis[1] > 0) {
        //   angle = Math.atan2(context.eye[0], context.eye[2])
        // } else if (props.axis[2] > 0) {
        //   angle = Math.atan2(context.eye[1], context.eye[0]) + Math.PI / 2
        // }
        mat4.rotate(model, model, angle, props.axis)
        var tmpm = new Float32Array(16)
        var q = [0, 0, 0, 0]
        rotationTo(q, [0, 1, 0], props.axis)
        mat4.fromQuat(tmpm, q)
        mat4.multiply(model, model, tmpm)
        return model
      }
    },
    attributes: {
      position: [
        [0, 0, 0],
        [0, d - 0.1, 0],
        [+0.05, d - 0.2, 0],
        [0, d, 0],
        [-0.05, d - 0.2, 0],
        [0, d - 0.1, 0]
      ],
      axis: regl.prop('axis')
    },
    depth: {
      enable: false
    },
    count: 6,
    primitive: 'line strip'
  })
}
