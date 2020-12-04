import frag from './drawTextureCommand.frag'
import vert from './drawTextureCommand.vert'

export function drawTextureCommand(regl) {
  return regl({
    vert,
    frag,
    attributes: {
      position: [-4, -4, 4, -4, 0, 4]
    },
    uniforms: {
      texture: (_, props) => {
        return props.texture
      }
    },
    viewport: {
      x: (_, props) => props.x0 || 0,
      y: (_, props) => props.y0 || 0,
      width: (_, props) => props.texture.width * (props.scale || 1),
      height: (_, props) => props.texture.height * (props.scale || 1)
    },
    depth: {
      enable: false
    },
    count: 3
  })
}
