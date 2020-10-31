import { getters } from './getters.gsls.js'
import { latticeChunk } from '../lattice/lattice.gsls.js'

export default function (regl, { variables, model, channelsPerValueCount }) {
  // console.log('channelsPerValueCount', channelsPerValueCount)
  const pushFactory = (variableName, bufferVariableName) =>
    regl({
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
        boundingBoxSize: model.boundingBoxSize,
        bufferLength: model.bufferLength,
        particleCount: model.particleCount,
        tick: regl.prop('pathiclesTick'),
        rgbaFloatChannel: regl.prop('rgbaFloatChannel'),
        rgbaFloatChannels: regl.prop('rgbaFloatChannels'),
        halfDeltaTOverC: model.halfDeltaTOverC,

        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        gravityConstant: model.interactions.gravityConstant,
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

      vert: `
        precision highp float;
        attribute vec2 aXY;
        void main () {
          gl_Position = vec4(aXY, 0, 1);
        }
        `,
      frag: `
        precision highp float;
        //#extension WEBGL_color_buffer_float : enable

        const highp float c = 2.99792458e+8;
        //uniform sampler2D utParticleColorAndType;
        uniform sampler2D utParticleChargesMassesChargeMassRatios;
        uniform sampler2D utPositionBuffer;
        uniform sampler2D utVelocityBuffer;
        uniform float tick;
        uniform float rgbaFloatChannel;
        uniform float rgbaFloatChannels;
        uniform float halfDeltaTOverC;
        uniform float boundingBoxSize;
        uniform float particleCount;
        uniform float bufferLength;
        uniform float gravityConstant;
        uniform vec3 electricField;
        uniform vec3 magneticField;
        uniform float particleInteraction;

        ${getters}
        ${latticeChunk(model.lattice)}

        float insideBox3D(vec3 v, vec3 bottomLeft, vec3 topRight) {
          vec3 s = step(bottomLeft, v) - step(topRight, v);
          return s.x * s.y * s.z;
        }

        vec3 getE(vec3 position) {

          vec3 E = electricField;
          return E;

          // if (particleInteraction != 0.) {
          //   for ( int p2 = 0; p2 < 24; p2++ ) {
          //     if ( p == float(p2) ) { continue; }
          //       ParticleData particleData2 = getParticleData(float(p2));
          //     if (particleData2.charge > 0.) {
          //       vec3 position2 = readVariable(utPositionBuffer, float(p2), bufferPosition).xyz;
          //       // float particleCharge2 = 1.; // POSITRON / PROTRON
          //       // if (particleType == 1.) { // ELECTRON
          //       //     particleCharge2 = charge_unit_qe[1];
          //       //  }
          //       vec3 dPosition = position2 - position;
          //       float distance = length( dPosition );
          //       E += .000000000001 *  particleData.charge * particleData2.charge / (distance * distance) * normalize(dPosition);
          //     }
          //   }
          // }

        }

        vec3 getB(vec3 position) {

          BeamlineElement ble = getClosestBeamlineElement(position);

          vec3 B = magneticField;

          if (ble.type == BEAMLINE_ELEMENT_TYPE_DIPOLE) {
            B += vec3(0., ble.strength, 0.);
          } else if (ble.type == BEAMLINE_ELEMENT_TYPE_QUADRUPOLE) {
          B += (ble.strength > 0.) ?
              ble.strength * vec3(0, position.z, position.y - 1.5)
              : abs(ble.strength) * vec3(0, -position.z, -(position.y- 1.5));
              }
           return B;
        }

        vec4 push_position(float p, float bufferHead, float bufferPosition) {

          ParticleData particleData = getParticleData(p);
          vec4 fourPosition = readVariable(utPositionBuffer, p, bufferPosition);

          vec3 position = fourPosition.xyz;
          float time  = fourPosition.w;

          vec3 fourMomentum = readVariable(utVelocityBuffer, p, bufferPosition).xyz;
          vec3 nextMomentum = readVariable(utVelocityBuffer, p, bufferHead).xyz;

          float nextTime = time + 2. * halfDeltaTOverC;

          return (particleData.particleType < .1)
            // photon
            ? vec4(position + fourMomentum / sqrt(1. + dot(fourMomentum, fourMomentum)) * halfDeltaTOverC + nextMomentum / sqrt(1. + dot(nextMomentum, nextMomentum)) * halfDeltaTOverC, nextTime)
            // massive particles
            : vec4(position + fourMomentum / sqrt(1. + dot(fourMomentum, fourMomentum)) * halfDeltaTOverC + nextMomentum / sqrt(1. + dot(nextMomentum, nextMomentum)) * halfDeltaTOverC, nextTime);
        }


        vec4 push_velocity(float p, float bufferHead, float bufferPosition) {

          ParticleData particleData = getParticleData(p);
          vec3 momentum;

          vec4 fourPosition = readVariable(utPositionBuffer, p, bufferPosition);
          vec4 fourVelocity = readVariable(utVelocityBuffer, p, bufferPosition);
          vec3 velocity = fourVelocity.xyz;
          float gamma = fourVelocity.w;

          vec3 intermediatePosition = fourPosition.xyz + velocity * halfDeltaTOverC;
          vec3 E = getE(intermediatePosition);
          vec3 B = getB(intermediatePosition);

          momentum = velocity;
          if (particleData.particleType < .1) {

          } else {

          float chargeMassRatio = particleData.chargeMassRatio;
          float charge = particleData.charge;
          float mass = particleData.mass;
          momentum += 0.5 * halfDeltaTOverC * chargeMassRatio * E;
          float gamma = sqrt(1.0 + dot(momentum, momentum));
          vec3 t_ =  halfDeltaTOverC * charge  * c / (gamma * mass) * B ;
          vec3 w_ = momentum + cross(momentum, t_);
          vec3 s_ = 2.0 / (1.0 + dot(t_, t_)) * t_;
          momentum += cross(w_, s_);
          momentum +=  halfDeltaTOverC * chargeMassRatio * E;

          }

          if (boundingBoxSize > 0.) {
            vec3 reflect = step(vec3(-boundingBoxSize), intermediatePosition) - step(vec3(boundingBoxSize), intermediatePosition);
            momentum *= 2. * reflect * reflect - 1.;
          }
          return vec4( momentum, gamma );
        }

        void main () {
          initLatticeData();
          float texelParticleIndex, texelBufferIndex, texelRgbaFloatChannel;

          texelParticleIndex = floor(gl_FragCoord.x);
          texelBufferIndex = floor(gl_FragCoord.y/4.);
          texelRgbaFloatChannel = (rgbaFloatChannels == 4.) ? fract(gl_FragCoord.y/4.)*4. - .5 : 0.;

          float nextBufferPosition = floor(mod(tick, bufferLength + 1.));
          float bufferPosition = (texelBufferIndex == 0.) ? bufferLength : texelBufferIndex - 1.;

          if (nextBufferPosition == texelBufferIndex) {
            gl_FragColor = push_${variableName}(texelParticleIndex, nextBufferPosition, bufferPosition);

          } else {
            gl_FragColor = readVariable(${bufferVariableName}, texelParticleIndex, texelBufferIndex);

          }
             // gl_FragColor = vec4(texelParticleIndex * 10. + texelBufferIndex + texelRgbaFloatChannel/10.);
             // gl_FragColor = vec4( texelRgbaFloatChannel );
            // gl_FragColor = readVariable(${bufferVariableName}, texelParticleIndex, texelBufferIndex);

        }
        `
    })

  const pushVelocity = pushFactory(
    'velocity',
    'utVelocityBuffer',
    channelsPerValueCount
  )
  const pushPosition = pushFactory(
    'position',
    'utPositionBuffer',
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
