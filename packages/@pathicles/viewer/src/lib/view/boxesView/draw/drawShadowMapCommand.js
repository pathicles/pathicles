import mat4 from 'gl-mat4'

export default function(regl, { lightPosition, shadowBufferCube }) {
  return regl({
    uniforms: {
      projection: mat4.perspective([], (2 * Math.PI) / 4.0, 1.0, 0.01, 5.0),
      view: function(context, props, batchId) {
        switch (batchId) {
          case 0: // +x
            return mat4.lookAt(
              [],
              lightPosition,
              [lightPosition[0] + 1.0, lightPosition[1], lightPosition[2]],
              [0.0, -1.0, 0.0]
            )
          case 1: // -x
            return mat4.lookAt(
              [],
              lightPosition,
              [lightPosition[0] - 1.0, lightPosition[1], lightPosition[2]],
              [0.0, -1.0, 0.0]
            )
          case 2: // +y
            return mat4.lookAt(
              [],
              lightPosition,
              [lightPosition[0], lightPosition[1] + 1.0, lightPosition[2]],
              [0.0, 0.0, 1.0]
            )
          case 3: // -y
            return mat4.lookAt(
              [],
              lightPosition,
              [lightPosition[0], lightPosition[1] - 1.0, lightPosition[2]],
              [0.0, 0.0, -1.0]
            )
          case 4: // +z
            return mat4.lookAt(
              [],
              lightPosition,
              [lightPosition[0], lightPosition[1], lightPosition[2] + 1.0],
              [0.0, -1.0, 0.0]
            )
          case 5: // -z
            return mat4.lookAt(
              [],
              lightPosition,
              [lightPosition[0], lightPosition[1], lightPosition[2] - 1.0],
              [0.0, -1.0, 0.0]
            )
        }
      }
    },

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
    frag: `
  precision mediump float;

  varying vec3 vPosition;

  uniform vec3 pointLightPosition;

  void main () {
    gl_FragColor = vec4(vec3(distance(vPosition, pointLightPosition)), 1.0);
  }`,

    framebuffer: function(context, props, batchId) {
      return shadowBufferCube.faces[batchId]
    }
  })
}
