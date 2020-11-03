import vert from './boris.vert'
import frag from './boris.frag'
import { latticeChunk } from '../lattice/lattice.gsls.js'

export default function (regl, { variables, model, channelsPerValueCount }) {
  const pushFactory = (variableName, bufferVariableName, variableSlot) => {
    const latticeChunkGLSL = latticeChunk(model.lattice)

    return regl({
      framebuffer: (context, props) =>
        variables[variableName].buffers[props.pathiclesTick % 2],
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
        bufferLength: model.bufferLength,
        particleCount: model.particleCount,
        tick: regl.prop('pathiclesTick'),
        rgbaFloatChannel: regl.prop('rgbaFloatChannel'),
        rgbaFloatChannels: regl.prop('rgbaFloatChannels'),
        halfDeltaTOverC: model.halfDeltaTOverC,

        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        electricField: model.interactions.electricField || [0, 0, 0],
        magneticField: model.interactions.magneticField || [0, 0, 1],
        utParticleChargesMassesChargeMassRatios: () =>
          variables.particleChargesMassesChargeMassRatios,

        utPositionBuffer: (context, props) =>
          variables.position.buffers[(props.pathiclesTick + 1) % 2],
        utVelocityBuffer: (context, props) =>
          variableName === 'position'
            ? variables.velocity.buffers[props.pathiclesTick % 2]
            : variables.velocity.buffers[(props.pathiclesTick + 1) % 2]
      },

      vert,
      frag: frag.replace('/*__latticeChunkGLSL__*/', latticeChunkGLSL)
    })
  }

  const pushVelocity = pushFactory(
    'velocity',
    'utVelocityBuffer',
    1,
    channelsPerValueCount
  )
  const pushPosition = pushFactory(
    'position',
    'utPositionBuffer',
    0,
    channelsPerValueCount
  )

  return () => {
    variables.tick.value++
    const z = variables.tick.value * model.halfDeltaTOverC * 2

    variables.pingPong = variables.tick.value % 2
    variables.referencePoint =
      model.lattice.beamline.length &&
      model.lattice.beamline[model.lattice.segmentIndexForZ(z)].start

    const jobs = Array(channelsPerValueCount)
      .fill(0)
      .map((_, i) => ({
        pathiclesTick: variables.tick.value,
        rgbaFloatChannel: i,
        rgbaFloatChannels: channelsPerValueCount
      }))

    pushVelocity(jobs)
    pushPosition(jobs)
  }
}
