import createCube from 'primitive-cube'

import vert from './lattice.vert'
import frag from './lattice.frag'

export default function (regl, { variables, model, view }, shadow) {
  const geometry = createCube()

  const lattice = model.lattice
  const transformations = lattice.transformations

  const command = (mode) => {
    return regl({
      depth: {
        enable: true
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
        color: [0, 0, 0, 1]
      },
      cull: {
        enable: true,
        face: 'back'
      },
      elements: geometry.cells,
      instances: lattice.beamline.length,
      attributes: {
        aPosition: geometry.positions,
        aNormal: geometry.normals,
        aUV: geometry.uvs,
        aColor: {
          buffer: regl.buffer(lattice.colors),
          divisor: 1
        },
        aTranslation: {
          buffer: regl.buffer(transformations.map((t) => t.translation)),
          divisor: 1
        },
        aPhi: {
          buffer: regl.buffer(transformations.map((t) => -t.phi)),
          divisor: 1
        },
        aTheta: {
          buffer: regl.buffer(transformations.map((t) => -t.theta)),
          divisor: 1
        },
        // aModel: {
        //   buffer: regl.buffer(
        //     transformations.map((t) => {
        //       let model = create()
        //       identity(model)
        //       // fromTranslation(model, t.translation)
        //       return model
        //     })
        //   ),
        //   divisor: 1
        // },
        aScale: {
          buffer: regl.buffer(transformations.map((t) => t.scale)),
          divisor: 1
        },
        aVertexColorCorrection: [
          0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1
        ]
      },

      vert: [`#define ${mode} 1`, vert].join('\n'),
      frag: [`#define ${mode} 1`, frag].join('\n'),

      uniforms: {
        ...shadow.uniforms
        // model: (ctx, props) => {
        //   modelMatrix = mat4.identity([])
        //   mat4.fromRotationTranslationScale(modelMatrix, )
        //
        //   return fromTranslation(modelMatrix, [
        //     props.modelTranslateX || 0,
        //     props.modelTranslateY || 0,
        //     0
        //   ])
        // }
      }
    })
  }

  return {
    lighting: command('lighting'),
    shadow: command('shadow')
  }
}
