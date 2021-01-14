import { lookAt, ortho } from 'gl-mat4'
import { normalize } from 'gl-vec3'

// import shadowDrawVert from './shadow.draw.vert'
// import shadowDrawFrag from './shadow.draw.frag'
// import shadowBlurVert from './shadow.blur.vert'
// import shadowBlurFrag from './shadow.blur.frag'

export const SHADOW_MAP_SIZE = 1024
export const TEXEL_SIZE = 0.5

export class Shadow {
  constructor(regl, { position, size, near, far }) {
    this.SHADOW_MAP_SIZE = SHADOW_MAP_SIZE
    this.regl = regl
    this.size = size
    this.fbo = regl.framebuffer({
      color: regl.texture({
        radius: SHADOW_MAP_SIZE
      }),
      depth: false
    })

    this.fboBlurred = regl.framebuffer({
      color: regl.texture({
        radius: SHADOW_MAP_SIZE
      }),
      depth: true
    })

    this.update(position, this.size, near, far)
  }

  update(position, size = this.size, near = this.near, far = this.far) {
    this.shadowDirection = [...position]
    normalize(this.shadowDirection, position)

    this.shadowViewMatrix = lookAt(
      [],
      position,
      [0.0, 0.0, 0.0],
      [0.0, 0.0, 1.0]
    )
    this.size = size //near
    this.near = near //near
    this.far = far //far
    this.shadowProjectionMatrix = ortho(
      [],
      -size,
      size,
      -size,
      size,
      this.near,
      this.far
    )
  }

  get uniforms() {
    return {
      shadowProjectionMatrix: () => this.shadowProjectionMatrix,
      shadowViewMatrix: () => this.shadowViewMatrix,
      shadowDirection: () => this.shadowDirection,

      minBias: () => 0.001,
      maxBias: () => 0.3
    }
  }
}
