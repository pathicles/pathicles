import frag from './drawTextureCommand.frag'
import vert from './drawTextureCommand.vert'

const NONE = 0
const UNPACK_RGBA = 1
const R = 2

export const DECODE = {
  NONE,
  UNPACK_RGBA,
  R
}

export function drawTextureCommand(regl, decode = DECODE.NONE) {
  return regl({
    vert,
    frag,
    attributes: {
      position: [-4, -4, 4, -4, 0, 4]
    },
    uniforms: {
      texture: (_, { texture }) => {
        return texture
      },
      decode: (_, { decode = DECODE.NONE }) => decode
    },
    viewport: {
      x: (_, props) => props.x0 || 50,
      y: (_, props) => props.y0 || 50,
      width: (_, props) => props.texture.width * (props.scale || 1),
      height: (_, props) => props.texture.height * (props.scale || 1)
    },
    depth: {
      enable: false
    },
    count: 3
  })
}
