import createCube from 'primitive-cube'
import { fromTranslation } from 'gl-mat4'

import frag from './box.frag'
import vert from './box.vert'

export default function (regl, options, shadow) {
  let scale = [1, 1, 1]

  const cube = createCube(...scale)

  const debleeder = [0.0, 0.999]
  cube.uvs = cube.uvs.map(([u, v]) => [debleeder[u], debleeder[v]])
  // lightPosition = [0.0, 0.0, 0.0]
  // let model = fromTranslation([], [0, -cubeGrid.size * 5, 0])
  let model = fromTranslation([], [0, 3, 0])
  const k = 3
  const n = k * k * k
  const offsets = []
  for (let ix = 0; ix < k; ix++) {
    for (let iy = 0; iy < k; iy++) {
      for (let iz = 0; iz < k; iz++) {
        // console.log(ix - k / 2)
        offsets.push((k - 1) / 2 - ix)
        offsets.push((k - 1) / 2 - iy)
        offsets.push((k - 1) / 2 - iz)
      }
    }
  }

  // console.log(offsets)

  const command = (mode) => {
    return regl({
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
      primitive: 'triangles',
      elements: cube.cells,
      depth: true,
      // cull: {
      //   enable: true,
      //   face: 'back'
      // },
      instances: n,
      attributes: {
        aPosition: cube.positions,
        aNormal: cube.normals,
        uv: cube.uvs,
        aOffset: {
          buffer: regl.buffer(
            // [1,0,0,2,0,0,3,0,0]
            offsets
          ),
          divisor: 1
        },
        aScale: {
          buffer: regl.buffer(
            // [1,0,0,2,0,0,3,0,0]
            Array(n * 3).fill(0.3)
          ),
          divisor: 1
        }
      },
      uniforms: {
        model,
        ...shadow.uniforms,

        ...(mode === 'shadow' && {
          projection: shadow.shadowProjectionMatrix,
          view: shadow.shadowViewMatrix
        }),
        ...(mode === 'lighting' && { shadowMap: shadow.fbo }),
        // projection: shadow.shadowProjectionMatrix,
        // view: shadow.shadowViewMatrix,

        color: [0.92, 0.75, 0.0]
        // ambientLightAmount: 0.3,
        // diffuseLightAmount: 0.7
      },
      vert: [`#define ${mode} 1`, vert].join('\n'),
      frag: [`#define ${mode} 1`, frag].join('\n'),
      ...(mode === 'shadow' && {
        framebuffer: shadow.fbo
      })
    })
  }

  return {
    lighting: command('lighting'),
    shadow: command('shadow')
  }
}
