import vert from './boris.vert'
import frag from './boris.frag'
import { latticeChunk } from '../lattice/lattice.gsls.js'

export default function (regl, { runner, variables, model }) {
  const pushFactory = (variableName, bufferVariableName, variableSlot) => {
    const latticeChunkGLSL = latticeChunk(model.lattice)

    return regl({
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
        snapshotCount: runner.snapshotCount,
        iterationsPerSnapshot: runner.iterationsPerSnapshot,
        halfDeltaTOverC: runner.halfDeltaTOverC,

        variableIdx: variableSlot,
        particleCount: variables.particleCount,
        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        electricField: model.interactions.electricField || [0, 0, 0],
        magneticField: model.interactions.magneticField || [0, 0, 1],

        boundingBoxSize: model.boundingBoxSize,
        boundingBoxCenter: model.boundingBoxCenter || [0, 1, 0],
        iteration: regl.prop('iteration'),
        takeSnapshot: regl.prop('takeSnapshot'),

        utParticleChargesMassesChargeMassRatios: () =>
          variables.particleChargesMassesChargeMassRatios,
        ut_position: (context, props) =>
          variables.position.buffers[(props.iteration + 1) % 2],
        utVelocityBuffer: (context, props) =>
          variableName === 'position'
            ? variables.velocity.buffers[props.iteration % 2]
            : variables.velocity.buffers[(props.iteration + 1) % 2]
      },

      vert,
      frag: frag
        .replace('/*__latticeDefinition__*/', model.lattice.toGLSLDefinition())
        .replace('/*__latticeChunkGLSL__*/', latticeChunkGLSL)
        .replace(
          '/*__latticeSize__*/',
          `const int BEAMLINE_ELEMENT_COUNT_OR_1 = ${
            model.lattice.beamline.length || 1
          }; const int BEAMLINE_ELEMENT_COUNT = ${
            model.lattice.beamline.length
          };`
        )
    })
  }

  const pushVelocity = pushFactory('velocity', 'utVelocityBuffer', 1)
  const pushPosition = pushFactory('position', 'ut_position', 0)

  return (n = 1) => {
    for (let i = 0; i < n; i++) {
      variables.iteration++
      variables.position.pingPong = variables.iteration % 2
      variables.velocity.pingPong = variables.iteration % 2

      const z = variables.iteration * runner.halfDeltaTOverC * 2

      variables.referencePoint =
        model.lattice.beamline.length &&
        model.lattice.beamline[model.lattice.segmentIndexForZ(z)].start

      const snapshots = Math.floor(
        variables.iteration / variables.iterationsPerSnapshot
      )

      const segments = (variables.segments =
        variables.particleCount *
        Math.min(
          // variables.iteration,
          variables.iteration < variables.iterationsPerSnapshot
            ? variables.iteration
            : snapshots +
                ((variables.iteration + 1) % variables.iterationsPerSnapshot),
          variables.snapshotCount - 1
        ))
      // console.log({
      //   iteration: variables.iteration,
      //   segments,
      //   snapshots
      // })

      const takeSnapshot =
        variables.iteration % runner.iterationsPerSnapshot === 0 ? 1 : 0
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
