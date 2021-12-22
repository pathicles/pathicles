import vert from './boris.vert.glsl'
import frag from './boris.frag.glsl'
// import frag__uint from './boris__uint.frag'
import { latticeChunk } from '../../lattice/lattice.gsls.js'
import { PerformanceLogger } from '../../../utils/PerformanceLogger'
import { isLittleEndian } from '../../../utils/little-endian'
export function glslBorisPush(regl, {runner, variables, model, debug, initialData}) {
  const performanceLogger = new PerformanceLogger()
  performanceLogger.entries = []

  const pushFactory = (variableName, bufferVariableName, variableSlot) => {
    const latticeChunkGLSL = latticeChunk(model.lattice)

    return regl({
      profile: true,
      framebuffer: () => variables[variableName].value(),
      primitive: 'triangles',
      elements: null,
      offset: 0,
      dither: false,
      count: 3,
      attributes: {
        aXY: [-4, -4, 4, -4, 0, 4]
      },

      uniforms: {
        variableIdx: variableSlot,

        resolution: [variables.snapshotCount * 4, variables.particleCount],
        snapshotCount: variables.snapshotCount,
        particleCount: variables.particleCount,
        deltaTOverC: variables.iterationDurationOverC,

        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        electricField: model.interactions.electricField || [0, 0, 0],
        magneticField: model.interactions.magneticField || [0, 0, 1],
        takeSnapshot: () => variables.takeSnapshot,

        boundingBoxSize: model.boundingBoxSize,
        boundingBoxCenter: model.boundingBoxCenter || [0, 1, 0],

        littleEndian: isLittleEndian(),

        ut_particleChargesMassesChargeMassRatios: () =>
          variables.particleChargesMassesChargeMassRatios,
        ut_position: () =>
          variables.position.buffers[(variables.iteration + 1) % 2],
        ut_velocity: () =>
          variableName === 'position'
            ? variables.velocity.buffers[variables.iteration % 2]
            : variables.velocity.buffers[(variables.iteration + 1) % 2]
      },

      vert,
      frag: [
        ...(variables.packFloat2UInt8
          ? [
              // `#define LITTLE_ENDIAN ${runner.littleEndian}`,
              `#define PACK_FLOAT`
            ]
          : []),
        (variables.packFloat2UInt8 ? frag : frag)
          .replace(
            '/*__latticeDefinition__*/',
            model.lattice.toGLSLDefinition()
          )
          .replace('/*__latticeChunkGLSL__*/', latticeChunkGLSL)
          .replace(
            '/*__latticeSize__*/',
            `const int BEAMLINE_ELEMENT_COUNT_OR_1 = ${
              model.lattice.activeBeamlineElements().length || 1
            }; const int BEAMLINE_ELEMENT_COUNT = ${
              model.lattice.activeBeamlineElements().length
            };`
          )
      ].join('\n')
    })
  }

  const pushVelocity = pushFactory('velocity', 'ut_velocity', 1)
  const pushPosition = pushFactory('position', 'ut_position', 0)

  return {
    push: (n = 1, profile = false) => {
      for (let i = 0; i < n; i++) {
        variables.iteration++
        variables.position.pingPong = variables.iteration % 2
        variables.velocity.pingPong = variables.iteration % 2

        const snapshots = Math.floor(
          variables.iteration / variables.iterationsPerSnapshot
        )
        variables.segments =
          variables.particleCount *
          Math.min(
            snapshots +
              variables.iteration -
              snapshots * variables.iterationsPerSnapshot,
            variables.snapshotCount - 1
          )

        variables.takeSnapshot =
          variables.iterationsPerSnapshot === 1 ||
          variables.iteration % variables.iterationsPerSnapshot === 1
            ? 1
            : 0

        pushVelocity()
        pushPosition()
      }

      if (profile) {
        regl.poll()
        performanceLogger.entries.push({
          name: 'pushVelocity',
          particleCount: variables.particleCount,
          snapshotCount: variables.snapshotCount,
          packFloat2UInt8: variables.packFloat2UInt8,
          iterations: variables.iteration,
          stats: pushVelocity.stats
        })
        performanceLogger.entries.push({
          name: 'pushPosition',
          particleCount: variables.particleCount,
          snapshotCount: variables.snapshotCount,
          packFloat2UInt8: variables.packFloat2UInt8,
          iterations: variables.iteration,
          stats: pushPosition.stats
        })
      }
    },
    reset() {}
  }
}
