'use strict'

export default function showBuffers(regl, buffer, { x0 = 5, y0 = 5 }) {
  return regl({
    vert: `
      precision mediump float;
      attribute vec2 position;
      varying vec2 uv;
      void main () {
        uv = position;
        gl_Position = vec4(-1.0 + 2.0 * position, 0, 1);
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
      texture: () => buffer
    },

    viewport: {
      x: x0,
      y: y0,
      width: ({ viewportWidth }) => viewportWidth / 8,
      height: ({ viewportHeight }) => viewportHeight / 8
    },

    count: 3
  })
}
