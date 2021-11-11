/* eslint-disable */
import { PerformanceLogger } from '../../../utils/PerformanceLogger'

export default function (regl, { runner, variables, model }) {
  const performanceLogger = new PerformanceLogger()

  performanceLogger.entries = []

  const pushFactory = (variableName, bufferVariableName, variableSlot) => {
    const latticeChunkGLSL = latticeChunk(model.lattice)

    return regl({
      profile: true,
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
        snapshotCount: variables.snapshotCount,
        particleCount: variables.particleCount,
        iterationsPerSnapshot: variables.iterationsPerSnapshot,
        deltaTOverC: variables.iterationDurationOverC,

        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        electricField: model.interactions.electricField || [0, 0, 0],
        magneticField: model.interactions.magneticField || [0, 0, 1],

        boundingBoxSize: model.boundingBoxSize,
        boundingBoxCenter: model.boundingBoxCenter || [0, 1, 0],
        iteration: regl.prop('iteration'),
        takeSnapshot: regl.prop('takeSnapshot'),

        variableIdx: variableSlot,

        ut_particleChargesMassesChargeMassRatios: () =>
          variables.particleChargesMassesChargeMassRatios,
        ut_position: (context, props) =>
          variables.position.buffers[(props.iteration + 1) % 2],
        ut_velocity: (context, props) =>
          variables.velocity.buffers[(props.iteration + 1) % 2]
      }

      // vert,
      // frag: [
      //   frag
      //     .replace(
      //       '/*__latticeDefinition__*/',
      //       model.lattice.toGLSLDefinition()
      //     )
      //     .replace('/*__latticeChunkGLSL__*/', latticeChunkGLSL)
      //     .replace(
      //       '/*__latticeSize__*/',
      //       `const int BEAMLINE_ELEMENT_COUNT_OR_1 = ${
      //         model.lattice.beamline.length || 1
      //       }; const int BEAMLINE_ELEMENT_COUNT = ${
      //         model.lattice.beamline.length
      //       };`
      //     )
      // ].join('\n')
    })
  }

  const pushVelocity = pushFactory('velocity', 'ut_velocity', 1)
  const pushPosition = pushFactory('position', 'ut_position', 0)

  return (n = 1) => {
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

      const takeSnapshot =
        variables.iterationsPerSnapshot !== 1 &&
        variables.iteration % variables.iterationsPerSnapshot === 0
          ? 1
          : 0
      pushVelocity({
        iteration: variables.iteration,
        takeSnapshot
      })
      pushPosition({
        iteration: variables.iteration,
        takeSnapshot
      })
    }
  }
}
