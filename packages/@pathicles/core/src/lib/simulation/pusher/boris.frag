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
uniform sampler2D ut_position;
uniform sampler2D utVelocityBuffer;
uniform int takeSnapshot;
uniform int iteration;
uniform int variableIdx;
uniform int iterationsPerSnapshot;
uniform float halfDeltaTOverC;
uniform float boundingBoxSize;
uniform vec3 boundingBoxCenter;
uniform int particleCount;
uniform int snapshotCount;
uniform vec3 electricField;
uniform vec3 magneticField;
uniform float particleInteraction;

/*__latticeChunkGLSL__*/


#pragma glslify: getClosestBeamlineElement = require("@pathicles/core/src/lib/shaders/get-closest-beamline-element.glsl", beamline=beamline, BeamlineElement=BeamlineElement, BEAMLINE_ELEMENT_COUNT=BEAMLINE_ELEMENT_COUNT);
#pragma glslify: ParticleData = require("@pathicles/core/src/lib/shaders/ParticleData.glsl");
#pragma glslify: getParticleData = require("@pathicles/core/src/lib/shaders/getParticleData.glsl", ParticleData=ParticleData, particleCount=particleCount, utParticleChargesMassesChargeMassRatios=utParticleChargesMassesChargeMassRatios);
#pragma glslify: readVariable = require("@pathicles/core/src/lib/shaders/readVariable.glsl", particleCount=particleCount, snapshotCount=snapshotCount);

#pragma glslify: encodeFloat = require("@pathicles/core/src/lib/shaders/encodeFloat.glsl");
#pragma glslify: packFloat = require("@pathicles/core/src/lib/shaders/packFloat.glsl");

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
  //       vec3 position2 = readVariable(ut_position, float(p2), bufferPosition).xyz;
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
    : vec3(-localPosition.y, -localPosition.x, 0.));
  }
  return B;
}



vec4 push_position(int p) {

  ParticleData particleData = getParticleData(p);
  vec4 fourPosition = readVariable(ut_position, p, 0);

  vec3 position = fourPosition.xyz;
  float time  = fourPosition.w;

  vec3 fourMomentum = readVariable(utVelocityBuffer, p, 1).xyz;
  vec3 nextMomentum = readVariable(utVelocityBuffer, p, 0).xyz;

  float nextTime = time + 2. * halfDeltaTOverC;

  return (particleData.particleType < .1)
  // photon
  ? vec4(position + fourMomentum * halfDeltaTOverC  + nextMomentum * halfDeltaTOverC, nextTime)
  // massive particles
  : vec4(position + fourMomentum / sqrt(1. + dot(fourMomentum, fourMomentum)) * halfDeltaTOverC + nextMomentum / sqrt(1. + dot(nextMomentum, nextMomentum)) * halfDeltaTOverC, nextTime);
}

//  + nextMomentum / sqrt(1. + dot(nextMomentum, nextMomentum)) * halfDeltaTOverC, nextTime)

vec4 push_velocity(int p) {

  ParticleData particleData = getParticleData(p);
  vec3 momentum;

  vec4 fourPosition = readVariable(ut_position, p, 0);
  vec4 fourVelocity = readVariable(utVelocityBuffer, p, 0);
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

vec4 push(int p) {
  return (variableIdx == 0)
  ? push_position(p)
  : push_velocity(p);
}

vec4 readVariable(int particle, int snapshot) {
  return (variableIdx == 0)
  ? readVariable(ut_position, particle, snapshot)
  : readVariable(utVelocityBuffer, particle, snapshot);
}


void main () {

  int particle = int(gl_FragCoord.y - .5);
  int snapshot = int(floor((gl_FragCoord.x - .5) / 4.));
  int fourComponentIndex = int(floor(gl_FragCoord.x - .5))  - snapshot * 4;

  initLatticeData();

  vec4 value = (snapshot == 0)
    ? push(particle)
    : (takeSnapshot == 1)
      ? readVariable(particle, snapshot)
      : readVariable(particle, snapshot -1);



#ifdef LITTLE_ENDIAN


  gl_FragColor =
  (fourComponentIndex == 0)
  ? packFloat(value.x)
  : (fourComponentIndex == 1)
  ? packFloat(value.y)
  : (fourComponentIndex == 2)
  ? packFloat(value.z)
  : packFloat(value.w);

#else

  gl_FragColor =
  (fourComponentIndex == 0)
  ? vec4(value.x, 0., 0., 0.)
  : (fourComponentIndex == 1)
  ? vec4(value.y, 0., 0., 0.)
  : (fourComponentIndex == 2)
  ? vec4(value.z, 0., 0., 0.)
  : vec4(value.w, 0., 0., 0.);

#endif


//  gl_FragColor = packFloat(float(particle+1)*10.  + float(snapshot) + float(fourComponentIndex)/10.);

}


