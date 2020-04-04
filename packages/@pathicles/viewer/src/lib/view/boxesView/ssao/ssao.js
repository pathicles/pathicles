import scale from 'gl-vec3/scale'
import length from 'gl-vec3/length'
import normalize from 'gl-vec3/normalize'
import normalize2 from 'gl-vec2/normalize'

export default function(regl) {
  const sampleCount = 32
  const rotationCount = 4

  function createKernel(n) {
    const points = []
    let point
    for (var i = 0; i < n; i++) {
      var r = 2
      while (r > 1.0) {
        point = [
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() + 0.04
        ]
        r = length(point)
      }
      point = scale(
        [],
        normalize([], point),
        0.1 + 0.9 * Math.pow(i / (n - 1), 2)
      )
      points.push(point)
    }
    return points
  }

  function createRotations(n) {
    const rotations = []
    for (let i = 0; i < n; i++) {
      let pts = []
      for (let j = 0; j < n; j++) {
        let vec1 = normalize2([], [Math.random() - 0.5, Math.random() - 0.5])
        let vec2 = normalize2([], [Math.random() - 0.5, Math.random() - 0.5])
        pts.push(vec1.concat(vec2))
      }
      rotations.push(pts)
    }
    return rotations
  }

  const sampleUniforms = {}
  const sampleKernel = createKernel(sampleCount)
  for (let i = 0; i < sampleKernel.length; i++) {
    sampleUniforms['kernel[' + i + ']'] = sampleKernel[i]
  }

  const rotationsBuffer = regl.texture({
    format: 'rgba',
    data: createRotations(rotationCount),
    width: rotationCount,
    height: rotationCount,
    type: 'float32',
    wrapS: 'repeat',
    wrapT: 'repeat'
  })

  const ssaoBuffer = regl.framebuffer({
    color: regl.texture({
      min: 'linear',
      mag: 'linear',
      width: Math.round(regl._gl.canvas.width),
      height: Math.round(regl._gl.canvas.height),
      format: 'rgba',
      type: 'float32'
    }),
    depth: false,
    colorFormat: 'rgba',
    colorType: 'float32'
  })

  const ssaoBlurBuffer = regl.framebuffer({
    color: regl.texture({
      min: 'linear',
      mag: 'linear',
      width: Math.round(regl._gl.canvas.width),
      height: Math.round(regl._gl.canvas.height)
    }),
    depth: false,
    colorFormat: 'rgba',
    colorType: 'float32'
  })

  const drawSSAO = regl({
    // eslint-disable-next-line
    vert: require('raw-loader!glslify-loader!./ssao.vert.glsl'),
    // eslint-disable-next-line
    frag: require('raw-loader!glslify-loader!./ssao.frag.glsl'),
    attributes: {
      xy: [
        [-4, -4],
        [0, 4],
        [4, -4]
      ]
    },
    uniforms: Object.assign(
      {
        depthNormalBuffer: regl.prop('depthNormalBuffer'),
        positionBuffer: regl.prop('positionBuffer'),
        invert: regl.prop('invert'),
        sampleCount: regl.prop('ssaoSampleCount'),
        // rotationsBuf: regl.prop('rotations'),
        // iProj: ctx => {
        //   console.log(ctx)
        //   invert([], ctx.projection)},
        hRotBuf: ctx => [
          1.0 / ctx.framebufferWidth,
          1.0 / ctx.framebufferHeight
        ]
      },
      sampleUniforms
    ),
    depth: { enable: false },
    count: 3
  })

  const blurSSAO = regl({
    // eslint-disable-next-line
    vert: require('raw-loader!glslify-loader!./ssao.blur.vert.glsl'),
    // eslint-disable-next-line
    frag: require('raw-loader!glslify-loader!./ssao.blur.frag.glsl'),
    attributes: {
      xy: [
        [-4, -4],
        [0, 4],
        [4, -4]
      ]
    },
    uniforms: {
      ssaoBuffer: regl.prop('ssaoBuffer'),
      h: ctx => [1.0 / ctx.framebufferWidth, 1.0 / ctx.framebufferHeight]
    },
    depth: { enable: false },
    count: 3
  })

  return {
    ssaoBuffer,
    ssaoBlurBuffer,
    drawSSAO,
    blurSSAO,
    rotationsBuffer
  }
}
