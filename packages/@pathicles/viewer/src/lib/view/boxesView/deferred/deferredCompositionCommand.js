import deferredFrag from './deferredCompositionCommand.frag.glsl'

export default function (regl) {
  return regl({
    vert: `
      precision mediump float;
      attribute vec2 xy;
      varying vec2 uv;
      void main () {
        uv = 0.5 * (1.0 + xy);
        gl_Position = vec4(xy, 0, 1);
      }
    `,
    frag: deferredFrag,
    attributes: {
      xy: [
        [-4, -4],
        [0, 4],
        [4, -4]
      ]
    },
    uniforms: {
      diffuseBuffer: (ctx, props) => props.diffuseBuffer,
      positionBuffer: (ctx, props) => props.positionBuffer,
      depthNormalBuffer: (ctx, props) => props.depthNormalBuffer,
      shadowBufferCube: (ctx, props) => props.shadowBufferCube,
      ssaoBuffer: (ctx, props) => props.ssaoBuffer,
      ssaoEnabled: (ctx, props) => (props.ssaoEnabled ? 1 : 0),
      isShadowEnabled: (ctx, props) => (props.isShadowEnabled ? 1 : 0),
      'lights[0].color': (ctx, props) => props.lights[0].color,
      'lights[0].position': (ctx, props) => props.lights[0].position,
      'lights[0].direction': (ctx, props) => props.lights[0].direction,
      'lights[1].color': (ctx, props) => props.lights[1].color,
      'lights[1].position': (ctx, props) => props.lights[1].position,
      'lights[1].direction': (ctx, props) => props.lights[1].direction,
      referencePoint: (ctx, props) => props.referencePoint
    },
    blend: {
      enable: true,
      func: {
        srcRGB: 'src alpha',
        srcAlpha: 1,
        dstRGB: 'one minus src alpha',
        dstAlpha: 1
      },
      equation: {
        rgb: 'add',
        alpha: 'add'
      },
      color: [1, 1, 1, 1]
    },
    depth: {
      enable: false
    },
    count: 3
  })
}
