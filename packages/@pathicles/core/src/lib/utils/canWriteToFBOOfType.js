export function canWriteToFBOOfType(regl, type = 'float') {
  if (!regl.hasExtension(`oes_texture_${type.replace(' ', '_')}`)) return false

  try {
    regl.framebuffer({
      colorType: type,
      colorFormat: 'rgba',
      radius: 1
    })

    const uintFBO = regl.framebuffer({
      colorType: 'uint8',
      colorFormat: 'rgba',
      radius: 1
    })

    const draw = regl({
      vert: `
      precision highp float;
      attribute vec2 aXY;
      void main () {
        gl_Position = vec4(aXY, 0, 1);
        gl_PointSize = 1.0;
      }`,
      frag: `
      precision highp float;
      void main () {
        gl_FragColor = vec4(1, 0, 0, 1);
      }`,
      primitive: 'points',
      count: 1,
      attributes: {
        aXY: [0, 0]
      },
      depth: { enable: false }
    })

    const transfer = regl({
      vert: `
      precision highp float;
      attribute vec2 aXY;
      void main () {
        gl_Position = vec4(aXY, 0, 1);
      }`,
      frag: `
      precision highp float;
      void main () {
        gl_FragColor = vec4(1, 0, 0, 1);
      }`,
      attributes: {
        aXY: [-4, -4, 4, -4, 0, 4]
      },
      count: 3,
      primitive: 'triangles',
      depth: { enable: false }
    })

    draw()
    let data
    uintFBO.use(() => {
      transfer()
      data = regl.read()
    })

    return data[0] !== 0 && data[1] === 0 && data[2] === 0 && data[3] !== 0
  } catch (e) {
    return false
  }
}
