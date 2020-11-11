precision highp float;
//#extension WEBGL_color_buffer_float : enable

/*__latticeSize__*/

const highp float c = 2.99792458e+8;
//uniform sampler2D utParticleColorAndType;
#pragma glslify: BeamlineElement = require("@pathicles/core/src/lib/shaders/beamline-element.glsl");

const int BEAMLINE_ELEMENT_TYPE_DRIFT = 0;
const int BEAMLINE_ELEMENT_TYPE_DIPOLE = 1;
const int BEAMLINE_ELEMENT_TYPE_QUADRUPOLE = 2;

uniform sampler2D utParticleChargesMassesChargeMassRatios;
uniform sampler2D utPositionBuffer;
uniform sampler2D utVelocityBuffer;
uniform float iteration;
uniform int variableIdx;
uniform float channel;
uniform float channelsPerValueCount;
uniform float halfDeltaTOverC;
uniform float boundingBoxSize;
uniform vec3 boundingBoxCenter;
uniform float particleCount;
uniform float bufferLength;
uniform vec3 electricField;
uniform vec3 magneticField;
uniform float particleInteraction;

/*__latticeChunkGLSL__*/


#pragma glslify: getClosestBeamlineElement = require("@pathicles/core/src/lib/shaders/get-closest-beamline-element.glsl", beamline=beamline, BeamlineElement=BeamlineElement, BEAMLINE_ELEMENT_COUNT=BEAMLINE_ELEMENT_COUNT);
#pragma glslify: ParticleData = require("@pathicles/core/src/lib/shaders/ParticleData.glsl");
#pragma glslify: getParticleData = require("@pathicles/core/src/lib/shaders/getParticleData.glsl", ParticleData=ParticleData, particleCount=particleCount, utParticleChargesMassesChargeMassRatios=utParticleChargesMassesChargeMassRatios);
#pragma glslify: readVariable = require("@pathicles/core/src/lib/shaders/readVariable.glsl", particleCount=particleCount, bufferLength=bufferLength, channelsPerValueCount=channelsPerValueCount);





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

  vec3 localPosition = position - vec3(0., 1.5, 0.);

  if (ble.type == BEAMLINE_ELEMENT_TYPE_DIPOLE) {
    B += vec3(0., ble.strength, 0.);
  } else if (ble.type == BEAMLINE_ELEMENT_TYPE_QUADRUPOLE) {
    B += abs(ble.strength)  *
    ((ble.strength > 0.)
    ? vec3(localPosition.y, localPosition.x, 0)
    : vec3(-(localPosition.y), -localPosition.x, 0.));
  }
  return B;
}



vec4 push_position(float p, float nextBufferPosition, float bufferPosition) {

  ParticleData particleData = getParticleData(p);
  vec4 fourPosition = readVariable(utPositionBuffer, p, bufferPosition);

  vec3 position = fourPosition.xyz;
  float time  = fourPosition.w;

  vec3 fourMomentum = readVariable(utVelocityBuffer, p, bufferPosition).xyz;
  vec3 nextMomentum = readVariable(utVelocityBuffer, p, nextBufferPosition).xyz;

  float nextTime = time + 2. * halfDeltaTOverC;

  return (particleData.particleType < .1)
  // photon
  ? vec4(position + fourMomentum * halfDeltaTOverC  + nextMomentum * halfDeltaTOverC, nextTime)
  // massive particles
  : vec4(position + fourMomentum / sqrt(1. + dot(fourMomentum, fourMomentum)) * halfDeltaTOverC + nextMomentum / sqrt(1. + dot(nextMomentum, nextMomentum)) * halfDeltaTOverC, nextTime);
}

//  + nextMomentum / sqrt(1. + dot(nextMomentum, nextMomentum)) * halfDeltaTOverC, nextTime)


vec4 push_velocity(float p, float nextBufferPosition, float bufferPosition) {

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
    vec3 t_ =  halfDeltaTOverC * charge  * c / (gamma * mass) * B;
    vec3 w_ = momentum + cross(momentum, t_);
    vec3 s_ = 2.0 / (1.0 + dot(t_, t_)) * t_;
    momentum += cross(w_, s_);
    momentum +=  halfDeltaTOverC * chargeMassRatio * E;

  }

  if (boundingBoxSize > 0.) {
    vec3 reflect = step(boundingBoxCenter-vec3(boundingBoxSize), intermediatePosition) - step(boundingBoxCenter+vec3(boundingBoxSize), intermediatePosition);
    momentum *= 2. * reflect * reflect - 1.;
  }
  return vec4(momentum, gamma);
}

vec4 push(float p, float nextBufferPosition, float bufferPosition) {
  return (variableIdx == 0)
  ? push_position(p, nextBufferPosition, bufferPosition)
  : push_velocity(p, nextBufferPosition, bufferPosition);
}

vec4 readVariable(float texelParticleIndex, float texelBufferIndex) {
  return (variableIdx == 0)
  ? readVariable(utPositionBuffer, texelParticleIndex, texelBufferIndex)
  : readVariable(utVelocityBuffer, texelParticleIndex, texelBufferIndex);
}


void main () {
  initLatticeData();
  float texelParticleIndex, texelBufferIndex, texelChannel;

  texelParticleIndex = floor(gl_FragCoord.x);
  texelBufferIndex = floor(gl_FragCoord.y/channelsPerValueCount);
  texelChannel = (channelsPerValueCount == 4.) ? fract(gl_FragCoord.y/4.)*4. - .5 : 0.;

  float nextBufferPosition = floor(mod(iteration, bufferLength + 1.));
  float bufferPosition = (texelBufferIndex == 0.) ? bufferLength : texelBufferIndex - 1.;

  if (abs(nextBufferPosition - texelBufferIndex) < 0.1) {
    gl_FragColor = push(texelParticleIndex, nextBufferPosition, bufferPosition);

  } else {
    gl_FragColor = readVariable(texelParticleIndex, texelBufferIndex);
  }

//    gl_FragColor = vec4(texelBufferIndex, texelChannel/10., -1., -1.);
//    gl_FragColor = vec4(texelBufferIndex, texelChannel/10., -1., -1.);
//    gl_FragColor = vec4(channel);
//  *111., texelBufferIndex*10., texelChannel/100.);
}
