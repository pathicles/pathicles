import vert from './boris.vert'
import frag from './boris.frag'
import { latticeChunk } from '../lattice/lattice.gsls.js'

export default function (regl, { variables, model }) {
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
        // aParticle: {
        //   buffer: regl.buffer(particleAttributes(variables)),
        //   divisor: 1
        // },
        // aStep: {
        //   buffer: regl.buffer(stepAttributes(variables)),
        //   divisor: 1
        // },
        // aFourIndex: {
        //   buffer: regl.buffer(aFourIndexAttributes(variables)),
        //   divisor: 1
        // }
      },

      uniforms: {
        variableIdx: variableSlot,
        boundingBoxSize: model.boundingBoxSize,
        boundingBoxCenter: model.boundingBoxCenter || [0, 1, 0],
        particleCount: variables.particleCount,
        bufferLength: variables.bufferLength,
        channelsPerValueCount: variables.channelsPerValueCount,
        channel: regl.prop('channel'),
        iteration: regl.prop('iteration'),
        halfDeltaTOverC: model.halfDeltaTOverC,

        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        electricField: model.interactions.electricField || [0, 0, 0],
        magneticField: model.interactions.magneticField || [0, 0, 1],
        utParticleChargesMassesChargeMassRatios: () =>
          variables.particleChargesMassesChargeMassRatios,
        utPositionBuffer: (context, props) =>
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
  const pushPosition = pushFactory('position', 'utPositionBuffer', 0)

  return (n) => {
    for (let i = 0; i < n; i++) {
      variables.iteration++
      const z = variables.iteration * model.halfDeltaTOverC * 2

      variables.pingPong = variables.iteration % 2
      variables.referencePoint =
        model.lattice.beamline.length &&
        model.lattice.beamline[model.lattice.segmentIndexForZ(z)].start

      const jobs = Array(variables.channelsPerValueCount)
        .fill(0)
        .map((_, i) => ({
          iteration: variables.iteration,
          channel: i
        }))

      // console.log(jobs)
      pushVelocity(jobs)
      pushPosition(jobs)
    }
  }
}
