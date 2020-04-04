import { getters, latticeChunk, particleDataChunk } from '../../utils/utils'

export default function(regl, { variables, model }) {
  const pushFactory = variableName =>
    regl({
      framebuffer: (context, props) =>
        variables[variableName][props.pathiclesTick % 2],
      primitive: 'triangles',
      elements: null,
      offset: 0,
      count: 3,
      attributes: {
        aPosition: [0, -4, 0, 4, 4, 0, -4, 4, 0]
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

        utPositionBuffer: (context, props) =>
          variables.position[(props.pathiclesTick + 1) % 2],
        utVelocityBuffer: (context, props) =>
          variableName === 'position'
            ? variables.velocity[props.pathiclesTick % 2]
            : variables.velocity[(props.pathiclesTick + 1) % 2]
      },

      vert: `

        precision mediump float;
        attribute vec3 aPosition;

        void main () {
          gl_Position = vec4(aPosition, 1.);
        }
        `,
      frag: `
        precision highp float;

        const highp float c = 2.99792458e+8;
        uniform sampler2D utParticleColorAndType;
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
        ${particleDataChunk(model.particleTypes)}
        ${latticeChunk(model.lattice)}


        vec3 get_efield(vec3 position, ParticleData particleData, float p, float previousBufferHead) {

          vec3 E = electricField * particleData.charge;



          // if (particleInteraction != 0.) {
          //
          //   for ( int p2 = 0; p2 < 24; p2++ ) {
          //
          //     if ( p == float(p2) ) { continue; }
          //
          //       ParticleData particleData2 = getParticleData(float(p2));
          //
          //     if (particleData2.charge > 0.) {
          //
          //       vec3 position2 = get_position(float(p2), previousBufferHead).xyz;
          //
          //       // float particleCharge2 = 1.; // POSITRON / PROTRON
          //       // if (particleType == 1.) { // ELECTRON
          //       //     particleCharge2 = charge_unit_qe[1];
          //       //  }
          //
          //       vec3 dPosition = position2 - position;
          //       float distance = length( dPosition );
          //
          //       E += .000000000001 *  particleData.charge * particleData2.charge / (distance * distance) * normalize(dPosition);
          //
          //     }
          //   }
          // }
          return E;
        }

        vec3 get_bfield(vec3 position) {

          BeamlineElement ble = getClosestBeamlineElement(position);

          vec3 B = magneticField;

          if (ble.type == BEAMLINE_ELEMENT_TYPE_DIPOLE) {
            B += vec3(0., ble.strength, 0.);
          } else if (ble.type == BEAMLINE_ELEMENT_TYPE_QUADRUPOLE) {
          B += (ble.strength > 0.) ?
              ble.strength * vec3(0, position.z, position.y-1.)
              : abs(ble.strength) * vec3(0, -position.z, -(position.y-1.));
              }

          // if (position.z > dipole_minZ && position.z < dipole_maxZ ) {
          //    B += vec3(0., dipole_strength, 0);
          //  }
          //
          //  if (position.z >  quadrupole_1_minZ && position.z < quadrupole_1_maxZ ) {
          //    float orientation = (quadrupole_1_rotated > 0.) ? -1. : 1.;
          //    B += quadrupole_1_strength * vec3(position.y-1., position.x, 0);
          //  }
          //
          // if (position.z >  quadrupole_2_minZ && position.z < quadrupole_2_maxZ ) {
          //    float orientation = (quadrupole_2_rotated > 0.) ? -1. : 1.;
          //    B +=  quadrupole_2_strength * vec3( position.y-1., -position.x, 0);
          //  }
           return B;

        }

        vec4 push_position(float p, float bufferHead, float previousBufferHead) {

          vec4 previousValue = get_position(p, previousBufferHead);

          vec3 previousPosition = previousValue.xyz;
          float previousTime  = previousValue.w;

          vec3 previousVelocity = get_velocity(p, previousBufferHead).xyz;
          vec3 currentVelocity = get_velocity(p, bufferHead).xyz;

          return vec4(
            previousPosition + previousVelocity * halfDeltaTOverC + currentVelocity * halfDeltaTOverC,
            previousTime + 2. * halfDeltaTOverC);
        }


        vec4 push_velocity(float p, float bufferHead, float previousBufferHead) {

          ParticleData particleData = getParticleData(p);

          vec4 previous4Position = get_position(p, previousBufferHead);

          vec4 previous4Velocity = get_velocity(p, previousBufferHead);
          vec3 previousVelocity = previous4Velocity.xyz;
          float previousGamma = previous4Velocity.w;

          vec3 intermediatePosition = previous4Position.xyz + previousVelocity * halfDeltaTOverC;

          vec3 E = get_efield(intermediatePosition, particleData, p, previousBufferHead);
          vec3 B = get_bfield(intermediatePosition);
          // vec3 G = vec3(0., -gravityConstant, 0.);


          vec3 dv_el_unit_c_1 = particleData.chargeMassRatio / c * E * halfDeltaTOverC;
          vec3 v_el1_unit_c_1 = previousVelocity + dv_el_unit_c_1;

          float gamma_el1_unit_c_1 = 1.0 / (sqrt(1.0 - dot( v_el1_unit_c_1, v_el1_unit_c_1)));
          gamma_el1_unit_c_1 = previousGamma;

          vec3 b_0_unit_c_1 =  particleData.chargeMassRatio / gamma_el1_unit_c_1 *  halfDeltaTOverC / c * B;
          float b_0_unit_c_1_square = dot(b_0_unit_c_1, b_0_unit_c_1);

          vec3 v_mag_unit_c_1 = v_el1_unit_c_1 + (2.0 / 1.0 + b_0_unit_c_1_square) * cross(  v_el1_unit_c_1 + cross(  v_el1_unit_c_1, b_0_unit_c_1), b_0_unit_c_1) ;

          vec3 nextVelocity_unit_c_1 = v_mag_unit_c_1 + dv_el_unit_c_1;




          if (boundingBoxSize > 0.) {
            if (intermediatePosition.x < -boundingBoxSize || intermediatePosition.x > boundingBoxSize) {
              nextVelocity_unit_c_1.x *= -1.0;
            }
            if (intermediatePosition.y < -boundingBoxSize || intermediatePosition.y > boundingBoxSize) {
              nextVelocity_unit_c_1.y *= -1.0;
            }
            if (intermediatePosition.z < -boundingBoxSize || intermediatePosition.z > boundingBoxSize) {
              nextVelocity_unit_c_1.z *= -1.0;
            }
          }

          return vec4( nextVelocity_unit_c_1, gamma_el1_unit_c_1 );
        }

        void main () {

          initLatticeData();
          initParticleData();
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
