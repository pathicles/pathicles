import createCube from 'primitive-cube'
// import rotateX from 'gl-mat4/rotateX'
// import translate from 'gl-mat4/translate'
import identity from 'gl-mat4/identity'

import frag from './sky.frag'
import vert from './sky.vert'

export default function(regl) {
  const stage = createCube(50, 50, 50)

  let model = identity([])
  // mat4.fromXRotation(model, 90)
  // translate(model, model, [0, 0, 0])
  // rotateX(model, model, Math.PI / 3)

  return regl({
    primitive: 'triangles',
    elements: stage.cells,
    attributes: {
      aPosition: stage.positions,
      uv: stage.uvs
    },
    uniforms: {
      iResolution: context => [context.viewportHeight, context.viewportWidth],
      iMouse: context => [
        context.viewportHeight / 2,
        context.viewportWidth / 2
      ],
      model
    },
    vert,
    frag
  })
}
