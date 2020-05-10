import { getters } from './getters.gsls.js'
import { latticeChunk } from '../lattice/lattice.gsls.js'

export default function(regl, { variables, model }) {
  const pushFactory = variableName =>
    regl({
      framebuffer: (context, props) =>
        variables[variableName][props.pathiclesTick % 2],
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
        halfDeltaTOverC: model.halfDeltaTOverC,

        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        gravityConstant: model.interactions.gravityConstant,
        electricField: model.interactions.electricField || [0, 0, 0],
        magneticField: model.interactions.magneticField || [0, 0, 1],
        utParticleChargesMassesChargeMassRatios: () =>
          variables.particleChargesMassesChargeMassRatios,

        utPositionBuffer: (context, props) =>
          variables.position[(props.pathiclesTick + 1) % 2],
        utVelocityBuffer: (context, props) =>
          variableName === 'position'
            ? variables.velocity[props.pathiclesTick % 2]
            : variables.velocity[(props.pathiclesTick + 1) % 2]
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
        #extension WEBGL_color_buffer_float : enable

        const highp float c = 2.99792458e+8;
        uniform sampler2D utParticleColorAndType;
        uniform sampler2D utParticleChargesMassesChargeMassRatios;
        uniform sampler2D utPositionBuffer;
        uniform sampler2D utVelocityBuffer;
        uniform float tick;
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
          //       vec3 position2 = get_position(float(p2), previousBufferHead).xyz;
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
              ble.strength * vec3(0, position.z, position.y - 2.)
              : abs(ble.strength) * vec3(0, -position.z, -(position.y- 2.));
              }
           return B;
        }

        vec4 push_position(float p, float bufferHead, float previousBufferHead) {

          ParticleData particleData = getParticleData(p);
          vec4 previousValue = get_position(p, previousBufferHead);

          vec3 previousPosition = previousValue.xyz;
          float previousTime  = previousValue.w;

          vec3 previousMomentum = get_velocity(p, previousBufferHead).xyz;
          vec3 currentMomentum = get_velocity(p, bufferHead).xyz;

          float nextTime = previousTime + 2. * halfDeltaTOverC;

          return (particleData.particleType < .1)
            ? vec4(previousPosition + 2. * previousMomentum.xyz  * halfDeltaTOverC, nextTime)
            : vec4(previousPosition + previousMomentum / sqrt(1. + dot(previousMomentum, previousMomentum)) * halfDeltaTOverC + currentMomentum / sqrt(1. + dot(currentMomentum, currentMomentum)) * halfDeltaTOverC, nextTime);
        }


        vec4 push_velocity(float p, float bufferHead, float previousBufferHead) {

          ParticleData particleData = getParticleData(p);
          if (particleData.particleType < .1) { return get_velocity(p, previousBufferHead);}

          vec4 previous4Position = get_position(p, previousBufferHead);
          vec4 previous4Velocity = get_velocity(p, previousBufferHead);
          vec3 previousVelocity = previous4Velocity.xyz;
          float previousGamma = previous4Velocity.w;

          vec3 intermediatePosition = previous4Position.xyz + previousVelocity * halfDeltaTOverC;
          vec3 E = getE(intermediatePosition);
          vec3 B = getB(intermediatePosition);


          vec3 momentum = previousVelocity;
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

          if (boundingBoxSize > 0.) {
            vec3 reflect = step(vec3(-boundingBoxSize), intermediatePosition) - step(vec3(boundingBoxSize), intermediatePosition);
            momentum *= 2. * reflect * reflect - 1.;
          }
          return vec4( momentum, previous4Velocity.w );
        }

        void main () {
          initLatticeData();
          float p, b;

          p = floor(gl_FragCoord.x);
          b = floor(gl_FragCoord.y);

          float currentBufferHead = floor(mod(tick, bufferLength + 1.));
          float previousBufferHead = (b == 0.) ? bufferLength : b - 1.;

          if (currentBufferHead == b) {
            gl_FragColor = push_${variableName}(p, currentBufferHead, previousBufferHead);
          } else {
            gl_FragColor = get_${variableName}(p, b);
          }
        }
        `
    })

  const pushVelocity = pushFactory('velocity')
  const pushPosition = pushFactory('position')

  return () => {
    variables.tick.value++
    const z = variables.tick.value * model.halfDeltaTOverC * 2

    variables.pingPong = variables.tick.value % 2
    variables.referencePoint =
      model.lattice.beamline.length &&
      model.lattice.beamline[model.lattice.segmentIndexForZ(z)].start

    pushVelocity({
      pathiclesTick: variables.tick.value
    })
    pushPosition({
      pathiclesTick: variables.tick.value
    })
  }
}
