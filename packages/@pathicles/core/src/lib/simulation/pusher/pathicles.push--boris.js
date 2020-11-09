import vert from './boris.vert'
import frag from './boris.frag'
import { latticeChunk } from '../lattice/lattice.gsls.js'

export default function (regl, { variables, model }) {
  const pushFactory = (variableName, bufferVariableName, variableSlot) => {
    const latticeChunkGLSL = latticeChunk(model.lattice)
    return regl({
      framebuffer: (context, props) =>
        variables[variableName].buffers[props.iterationStep % 2],
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
        boundingBoxSize: model.boundingBoxSize,
        boundingBoxCenter: model.boundingBoxCenter || [0, 1, 0],
        particleCount: model.particleCount,
        bufferLength: variables.bufferLength,
        channelsPerValueCount: variables.channelsPerValueCount,
        channel: regl.prop('channel'),
        iterationStep: regl.prop('iterationStep'),
        halfDeltaTOverC: model.halfDeltaTOverC,

        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        electricField: model.interactions.electricField || [0, 0, 0],
        magneticField: model.interactions.magneticField || [0, 0, 1],
        utParticleChargesMassesChargeMassRatios: () =>
          variables.particleChargesMassesChargeMassRatios,
        utPositionBuffer: (context, props) =>
          variables.position.buffers[(props.iterationStep + 1) % 2],
        utVelocityBuffer: (context, props) =>
          variableName === 'position'
            ? variables.velocity.buffers[props.iterationStep % 2]
            : variables.velocity.buffers[(props.iterationStep + 1) % 2]
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
  const pushPosition = pushFactory('position', 'utPositionBuffer', 0)

  return () => {
    variables.iterationStep.value++
    const z = variables.iterationStep.value * model.halfDeltaTOverC * 2

    variables.pingPong = variables.iterationStep.value % 2
    variables.referencePoint =
      model.lattice.beamline.length &&
      model.lattice.beamline[model.lattice.segmentIndexForZ(z)].start

    const jobs = Array(variables.channelsPerValueCount)
      .fill(0)
      .map((_, i) => ({
        iterationStep: variables.iterationStep.value,
        channel: i
      }))

    // console.log(jobs)
    pushVelocity(jobs)
    pushPosition(jobs)
  }
}
