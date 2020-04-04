import vectorizeText from 'vectorize-text'

const complex = vectorizeText('Beschleunigung', {
  triangles: true,
  width: 1000,
  textBaseline: 'hanging',
  font: 'Arial'
})

complex.positions.forEach(position => position.push(0))

import vert from './text.vert'
import frag from './text.frag'

export default function(regl) {
  const command = () =>
    regl({
      primitive: 'triangles',
      elements: complex.cells,
      attributes: {
        aPosition: complex.positions
      },

      vert,
      frag,

      uniforms: {}
    })

  return {
    lighting: command()
  }
}
