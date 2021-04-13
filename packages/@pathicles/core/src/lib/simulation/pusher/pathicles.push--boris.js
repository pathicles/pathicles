import vert from './boris.vert'
import frag__float from './boris__float.frag'
import frag__uint from './boris__uint.frag'
import { latticeChunk } from '../lattice/lattice.gsls.js'
import { PerformanceLogger } from '../../utils/PerformanceLogger'

export default function (regl, { runner, variables, model }) {
  const performanceLogger = new PerformanceLogger()
  performanceLogger.entries = []

  const pushFactory = (variableName, bufferVariableName, variableSlot) => {
    const latticeChunkGLSL = latticeChunk(model.lattice)

    return regl({
      profile: false,
      framebuffer: (context, props) =>
        variables[variableName].buffers[props.iteration % 2],
      primitive: 'triangles',
      elements: null,
      offset: 0,
      dither: false,
      count: 3,
      attributes: {
        aXY: [-4, -4, 4, -4, 0, 4]
      },

      uniforms: {
        resolution: [variables.snapshotCount * 4, variables.particleCount],
        snapshotCount: variables.snapshotCount,
        particleCount: variables.particleCount,
        // iterationsPerSnapshot: variables.iterationsPerSnapshot,
        deltaTOverC: variables.iterationDurationOverC,

        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        electricField: model.interactions.electricField || [0, 0, 0],
        magneticField: model.interactions.magneticField || [0, 0, 1],

        boundingBoxSize: model.boundingBoxSize,
        boundingBoxCenter: model.boundingBoxCenter || [0, 1, 0],
        // iteration: regl.prop('iteration'),
        takeSnapshot: regl.prop('takeSnapshot'),

        variableIdx: variableSlot,

        ut_particleChargesMassesChargeMassRatios: () =>
          variables.particleChargesMassesChargeMassRatios,
        ut_position: (context, props) =>
          variables.position.buffers[(props.iteration + 1) % 2],
        ut_velocity: (context, props) =>
          variableName === 'position'
            ? variables.velocity.buffers[props.iteration % 2]
            : variables.velocity.buffers[(props.iteration + 1) % 2]
      },

      vert,
      frag: [
        ...(variables.packFloat2UInt8
          ? [`#define LITTLE_ENDIAN ${runner.littleEndian}`]
          : []),
        (variables.packFloat2UInt8 ? frag__uint : frag__float)
          .replace(
            '/*__latticeDefinition__*/',
            model.lattice.toGLSLDefinition()
          )
          .replace('/*__latticeChunkGLSL__*/', latticeChunkGLSL)
          .replace(
            '/*__latticeSize__*/',
            `const int BEAMLINE_ELEMENT_COUNT_OR_1 = ${
              model.lattice.beamline.length || 1
            }; const int BEAMLINE_ELEMENT_COUNT = ${
              model.lattice.beamline.length
            };`
          )
      ].join('\n')
    })
  }

  const pushVelocity = pushFactory('velocity', 'ut_velocity', 1)
  const pushPosition = pushFactory('position', 'ut_position', 0)

  return (n = 1, profile = false) => {
    // console.log(
    //   'velocity',
    //   JSON.stringify(
    //     variables.velocity.pack(variables.velocity.toTypedArray().float32Array)
    //   )
    // )
    // console.log(
    //   'position',
    //   JSON.stringify(
    //     variables.position.pack(variables.position.toTypedArray().float32Array)
    //   )
    // )
    for (let i = 0; i < n; i++) {
      // debugger
      variables.iteration++
      variables.position.pingPong = variables.iteration % 2
      variables.velocity.pingPong = variables.iteration % 2

      // const z = variables.iteration * variables.iterationDurationOverC
      // variables.referencePoint =
      //   model.lattice.beamline.length &&
      //   model.lattice.beamline[model.lattice.segmentIndexForZ(z)].start

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

      const takeSnapshot =
        variables.iterationsPerSnapshot === 1 ||
        variables.iteration % variables.iterationsPerSnapshot === 1
          ? 1
          : 0

      // console.log('variables.iteration', variables.iteration)
      // console.log('takeSnapshot', takeSnapshot)
      pushVelocity({
        iteration: variables.iteration,
        takeSnapshot
      })
      pushPosition({
        iteration: variables.iteration,
        takeSnapshot
      })

      // console.log(
      //   'velocity**',
      //   JSON.stringify(
      //     variables.velocity.pack(
      //       variables.velocity.toTypedArray().float32Array
      //     )
      //   )
      // )
      // console.log(
      //   'position**',
      //   JSON.stringify(
      //     variables.position.pack(
      //       variables.position.toTypedArray().float32Array
      //     )
      //   )
      // )
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
  }
}
