//import createCube from 'primitive-cube'
import * as createPlane from './plane'
// const createPlane = require('packages/@pathicles/viewer/src/lib/view/boxesViewSimple/stage/plane')

import frag from './stage.frag'
import vert from './stage.vert'

export default function(regl, { stageGrid }) {
  const stage = createPlane.createPlane(stageGrid.size, stageGrid.size)
  const texData = createTexture(stageGrid)

  const command = () => {
    return regl({
      blend: {
        enable: false,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 'src alpha',
          dstRGB: 'one minus src alpha',
          dstAlpha: 'one minus src alpha'
        },
        equation: {
          rgb: 'add',
          alpha: 'add'
        },
        color: [0, 0, 0, 1]
      },
      cull: {
        enable: true,
        face: 'front'
      },
      primitive: 'triangles',
      elements: stage.cells,
      attributes: {
        // size: stageGrid.size,
        position: stage.positions,
        uv: stage.uvs,
        normal: stage.normals
      },
      uniforms: {
        uOffset: [0, stageGrid.y - 0, 0],
        uTex: regl.texture({
          width: stageGrid.resolution,
          height: stageGrid.resolution,
          min: 'linear mipmap linear',
          wrap: 'repeat',
          mag: 'linear',
          data: texData
        })
      },
      vert,
      frag
    })
  }

  return {
    lighting: command('')
  }
}

function createTexture({ dark = 0, light = 1, resolution = 512 } = {}) {
  const dark255 = dark * 255

  const texData = []
  // make cube texture.
  for (let y = 0; y < resolution; ++y) {
    for (let x = 0; x < resolution; ++x) {
      let ind = 4 * (y * resolution + x)

      const borderWidth = 1 / resolution
      const uvx = x / resolution
      const uvy = y / resolution

      const k = Math.min(uvx, Math.min(uvy, Math.min(1.0 - uvx, 1.0 - uvy)))

      if (k < borderWidth) {
        texData[ind + 0] = light * 255
        texData[ind + 1] = light * 255
        texData[ind + 2] = light * 255
        texData[ind + 3] = 255
      } else if (
        Math.abs(uvx - 0.1) < borderWidth ||
        Math.abs(uvx - 0.2) < borderWidth ||
        Math.abs(uvx - 0.3) < borderWidth ||
        Math.abs(uvx - 0.4) < borderWidth ||
        Math.abs(uvx - 0.5) < borderWidth ||
        Math.abs(uvx - 0.6) < borderWidth ||
        Math.abs(uvx - 0.7) < borderWidth ||
        Math.abs(uvx - 0.8) < borderWidth ||
        Math.abs(uvx - 0.9) < borderWidth ||
        Math.abs(uvy - 0.1) < borderWidth ||
        Math.abs(uvy - 0.2) < borderWidth ||
        Math.abs(uvy - 0.3) < borderWidth ||
        Math.abs(uvy - 0.4) < borderWidth ||
        Math.abs(uvy - 0.5) < borderWidth ||
        Math.abs(uvy - 0.6) < borderWidth ||
        Math.abs(uvy - 0.7) < borderWidth ||
        Math.abs(uvy - 0.8) < borderWidth ||
        Math.abs(uvy - 0.9) < borderWidth

        // Math.abs(uvx - 0.125) < borderWidth ||
        // Math.abs(uvx - 0.25) < borderWidth ||
        // Math.abs(uvx - 0.375) < borderWidth ||
        // Math.abs(uvx - 0.5) < borderWidth ||
        // Math.abs(uvx - 0.625) < borderWidth ||
        // Math.abs(uvx - 0.75) < borderWidth ||
        // Math.abs(uvx - 0.875) < borderWidth ||
        // Math.abs(uvy - 0.125) < borderWidth ||
        // Math.abs(uvy - 0.25) < borderWidth ||
        // Math.abs(uvy - 0.375) < borderWidth ||
        // Math.abs(uvy - 0.5) < borderWidth ||
        // Math.abs(uvy - 0.625) < borderWidth ||
        // Math.abs(uvy - 0.75) < borderWidth ||
        // Math.abs(uvy - 0.875) < borderWidth
      ) {
        texData[ind] = (light + dark) * 255
        texData[ind + 1] = (light + dark) * 255
        texData[ind + 2] = (light + dark) * 255
        texData[ind + 3] = 255
      } else {
        texData[ind] = dark255
        texData[ind + 1] = dark255
        texData[ind + 2] = dark255
        texData[ind + 3] = 255
      }
    }
  }

  return texData
}
