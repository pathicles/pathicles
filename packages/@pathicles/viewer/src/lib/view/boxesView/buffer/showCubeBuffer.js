export default function showCubeBuffer(regl, buffer, { x0 = 5, y0 = 5 }) {
  return regl({
    frag: `
      precision mediump float;
      uniform samplerCube texture;
      varying vec2 uv;
      void main () {
        gl_FragColor = vec4(textureCube(texture, uv ), textureCube(texture, uv ));
        // gl_FragColor = vec4(textureCube(texture, uv).xyz, texture2D(texture, uv).w + .5);
      }`,

    vert: `
      precision mediump float;
      attribute vec2 position;
      varying vec2 uv;
      void main () {
        uv = position;
        gl_Position = vec4(-1.0 + 2.0 * position, 0, 1);
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
