'use strict'

export default function drawVariableTexture(
  regl,
  { variables, texelSize = 1, y0 = 0 }
) {
  return regl({
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
      void main () {
        gl_FragColor = vec4(texture2D(texture, uv).xyz, texture2D(texture, uv).w + .5);
      }`,

    attributes: { position: [2, 0, 0, 2, -2, -2] },

    uniforms: {
      texture: ({ tick }, props) =>
        variables[props.variableName].buffers[tick % 2]
    },

    viewport: {
      x: (_, props) => {
        return props.variableName === 'velocity'
          ? (variables.initialData.particleCount + 1) * texelSize
          : 0
      },
      y: y0,
      width: variables.initialData.particleCount * texelSize,
      height: variables.initialData.bufferLength * texelSize
    },
    depth: {
      enable: false
    },

    count: 3
  })
}
