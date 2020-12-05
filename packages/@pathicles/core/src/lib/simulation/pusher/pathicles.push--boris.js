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
        packFloat2UInt8: runner.packFloat2UInt8 ? 1 : 0,

        variableIdx: variableSlot,
        particleCount: variables.particleCount,
        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        electricField: model.interactions.electricField || [0, 0, 0],
        magneticField: model.interactions.magneticField || [0, 0, 1],

        boundingBoxSize: model.boundingBoxSize,
        boundingBoxCenter: model.boundingBoxCenter || [0, 1, 0],
        iteration: regl.prop('iteration'),
        takeSnapshot: regl.prop('takeSnapshot'),
        littleEndian: (function machineIsLittleEndian() {
          const uint8Array = new Uint8Array([0xaa, 0xbb])
          const uint16array = new Uint16Array(uint8Array.buffer)
          return uint16array[0] === 0xbbaa
        })()
          ? 1
          : 0,

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
      const unsnapshots =
        variables.iteration - snapshots * variables.iterationsPerSnapshot

      const segments = (variables.segments =
        variables.particleCount *
        Math.min(snapshots + unsnapshots, variables.snapshotCount - 1))

      const takeSnapshot =
        runner.iterationsPerSnapshot !== 1 &&
        variables.iteration % runner.iterationsPerSnapshot === 0
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
