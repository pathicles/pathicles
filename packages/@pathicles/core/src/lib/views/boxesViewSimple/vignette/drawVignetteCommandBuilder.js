import frag from './vignette.frag'

export default function (regl) {
  // eslint-disable-next-line no-unused-vars
  const command = () => {
    return regl({
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 0,
          dstRGB: 'one',
          dstAlpha: 1
        },
        equation: {
          rgb: 'add',
          alpha: 'add'
        },
        color: [1, 0, 0, 1]
      },
      frag: frag,
      vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`,

      // Here we define the vertex attributes for the above shader
      attributes: {
        // regl.buffer creates a new array buffer object
        position: regl.buffer([-4, -4, 4, -4, 0, 4])
        // regl automatically infers sane defaults for the vertex attribute pointers
      },

      uniforms: {
        screenSize: ({ viewportWidth, viewportHeight }) => [
          viewportWidth,
          viewportHeight
        ],
        size: [0.01, 0.01],
        roundness: 0.5,
        smoothness: 0.99
      },

      // This tells regl the number of vertices to draw in this command
      count: 3,
      depth: {
        enable: true
      }
    })
  }
  return {
    lighting: command()
  }
}
