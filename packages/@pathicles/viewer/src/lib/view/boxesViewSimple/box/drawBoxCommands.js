import createCube from 'primitive-cube'
import { fromTranslation, lookAt, perspective } from 'gl-mat4'

import frag from './box.frag'
import vert from './box.vert'

export default function (regl, lightPosition = [0.0, 10.0, 0.0]) {
  const CUBE_MAP_SIZE = 1024

  const shadowFbo = regl.framebufferCube({
    radius: CUBE_MAP_SIZE,
    colorFormat: 'rgba',
    colorType: 'float'
  })

  let scale = [1, 1, 1]

  const cube = createCube(...scale)

  const debleeder = [0.0, 0.999]
  cube.uvs = cube.uvs.map(([u, v]) => [debleeder[u], debleeder[v]])
  lightPosition = [0.0, 0.0, 0.0]
  // let model = fromTranslation([], [0, -cubeGrid.size * 5, 0])
  let model = fromTranslation([], [0, 0, 0])
  const k = 4
  const n = k * k * k
  const offsets = []
  for (let ix = 0; ix < k; ix++) {
    for (let iy = 0; iy < k; iy++) {
      for (let iz = 0; iz < k; iz++) {
        // console.log(ix - k / 2)
        offsets.push(k / 2 - ix)
        offsets.push(k / 2 - iy)
        offsets.push(k / 2 - iz)
      }
    }
  }

  const command = (mode) =>
    regl({
      blend: {
        enable: false,
        color: [0, 0, 0, 0]
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
        // projection: ortho([], -10, 10, -10, 10, 0.1, 100),
        // view: () =>
        //   lookAt(
        //     [],
        //     lightPosition,
        //     [lightPosition[0] + 1.0, lightPosition[1], lightPosition[2]],
        //     [0.0, -1.0, 0.0]
        //   ),
        ...(mode === 'cubeShadow' && {
          projection: perspective([], Math.PI / 2.0, 1.0, 0.001, 50.0),
          view: (context, props, batchId) => {
            switch (batchId) {
              case 0: // +x
                return lookAt(
                  [],
                  lightPosition,
                  [lightPosition[0] + 1.0, lightPosition[1], lightPosition[2]],
                  [0.0, -1.0, 0.0]
                )
              case 1: // -x
                return lookAt(
                  [],
                  lightPosition,
                  [lightPosition[0] - 1.0, lightPosition[1], lightPosition[2]],
                  [0.0, -1.0, 0.0]
                )
              case 2: // +y
                return lookAt(
                  [],
                  lightPosition,
                  [lightPosition[0], lightPosition[1] + 1.0, lightPosition[2]],
                  [0.0, 0.0, 1.0]
                )
              case 3: // -y
                return lookAt(
                  [],
                  lightPosition,
                  [lightPosition[0], lightPosition[1] - 1.0, lightPosition[2]],
                  [0.0, 0.0, -1.0]
                )
              case 4: // +z
                return lookAt(
                  [],
                  lightPosition,
                  [lightPosition[0], lightPosition[1], lightPosition[2] + 1.0],
                  [0.0, -1.0, 0.0]
                )
              case 5: // -z
                return lookAt(
                  [],
                  lightPosition,
                  [lightPosition[0], lightPosition[1], lightPosition[2] - 1.0],
                  [0.0, -1.0, 0.0]
                )
            }
          }
        }),
        ...(mode === 'lighting' && { shadowCube: shadowFbo }),
        lightPosition: ({ time }) => [0, (Math.sin(time * 4) * k) / 2, 0],
        color: [0.92, 0.75, 0.0],
        ambientLightAmount: 0.1,
        diffuseLightAmount: 0.9
      },
      vert: [`#define ${mode} 1`, vert].join('\n'),
      frag: [`#define ${mode} 1`, frag].join('\n'),
      ...(mode === 'cubeShadow' && {
        framebuffer: (context, props, batchId) => {
          return shadowFbo.faces[batchId]
        }
      })
    })

  return {
    lighting: command('lighting'),
    cubeShadow: () => {
      Array(6).forEach((_, i) =>
        regl.clear({
          color: [1, 1, 0, 1],
          depth: 1,
          framebuffer: shadowFbo.faces[i]
        })
      )

      command('cubeShadow')([0, 1, 2, 3, 4, 5])
    }
  }
}
