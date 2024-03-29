precision highp float;

/*__latticeSize__*/

const highp float c = 2.99792458e+8;
#pragma glslify: BeamlineElement = require("@pathicles/core/src/lib/shaders/beamline-element.glsl");

const int BEAMLINE_ELEMENT_TYPE_DRIFT = 0;
const int BEAMLINE_ELEMENT_TYPE_DIPOLE = 1;
const int BEAMLINE_ELEMENT_TYPE_QUADRUPOLE = 2;

uniform float boundingBoxSize;
uniform float deltaTOverC;
uniform float particleInteraction;
uniform int takeSnapshot;
uniform int variableIdx;
uniform sampler2D ut_particleChargesMassesChargeMassRatios;
uniform sampler2D ut_position;
uniform sampler2D ut_velocity;
uniform vec2 resolution;
uniform vec3 boundingBoxCenter;
uniform vec3 electricField;
uniform vec3 magneticField;

/*__latticeChunkGLSL__*/

#pragma glslify: getClosestBeamlineElement = require("@pathicles/core/src/lib/shaders/get-closest-beamline-element.glsl", beamline=beamline, BeamlineElement=BeamlineElement, BEAMLINE_ELEMENT_COUNT=BEAMLINE_ELEMENT_COUNT);
#pragma glslify: ParticleData = require("@pathicles/core/src/lib/shaders/ParticleData.glsl");
#pragma glslify: getParticleData = require("@pathicles/core/src/lib/shaders/getParticleData.glsl", ParticleData=ParticleData, particleCount=particleCount=resolution.y, ut_particleChargesMassesChargeMassRatios=ut_particleChargesMassesChargeMassRatios);
#pragma glslify: readVariable = require("@pathicles/core/src/lib/shaders/readVariable__uint.glsl", resolution=resolution, LITTLE_ENDIAN=LITTLE_ENDIAN, LITTLE_ENDIAN=LITTLE_ENDIAN);


#pragma glslify: packFloat = require("@pathicles/core/src/lib/shaders/packFloat.glsl");

vec3 getE(vec3 position) {

  vec3 E = electricField;
  return E;

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

  vec3 fourMomentum = readVariable(ut_velocity, p, 1).xyz;
  vec3 nextMomentum = readVariable(ut_velocity, p, 0).xyz;

  float nextTime = time + 2. * deltaTOverC;

  return (particleData.particleType < .1)
  // photon
  ? vec4(position + fourMomentum * deltaTOverC  + nextMomentum * deltaTOverC, nextTime)
  // massive particles
  : vec4(position + fourMomentum / sqrt(1. + dot(fourMomentum, fourMomentum)) * deltaTOverC + nextMomentum / sqrt(1. + dot(nextMomentum, nextMomentum)) * deltaTOverC, nextTime);
}

//  + nextMomentum / sqrt(1. + dot(nextMomentum, nextMomentum)) * deltaTOverC, nextTime)

vec4 push_velocity(int p) {

  ParticleData particleData = getParticleData(p);
  vec3 momentum;

  vec4 fourPosition = readVariable(ut_position, p, 0);
  vec4 fourVelocity = readVariable(ut_velocity, p, 0);
  vec3 velocity = fourVelocity.xyz;
  float gamma = fourVelocity.w;

  vec3 intermediatePosition = fourPosition.xyz + velocity * deltaTOverC;
  vec3 E = getE(intermediatePosition);
  vec3 B = getB(intermediatePosition);

  momentum = velocity;

  // for all particles with  mass
  if (particleData.particleType > .1) {

    float chargeMassRatio = particleData.chargeMassRatio;
    float charge = particleData.charge;
    float mass = particleData.mass;
    momentum += 0.5 * deltaTOverC * chargeMassRatio * E;
    float gamma = sqrt(1.0 + dot(momentum, momentum));
    vec3 t_ =  deltaTOverC * charge  * c / (gamma * mass) * B;
    vec3 w_ = momentum + cross(momentum, t_);
    vec3 s_ = 2.0 / (1.0 + dot(t_, t_)) * t_;
    momentum += cross(w_, s_);
    momentum +=  deltaTOverC * chargeMassRatio * E;
  }

  if (boundingBoxSize > 0.) {
    vec3 reflect =
      step(boundingBoxCenter-vec3(boundingBoxSize), intermediatePosition)
      - step(boundingBoxCenter+vec3(boundingBoxSize), intermediatePosition);
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
    : readVariable(ut_velocity, particle, snapshot);
}


//
vec4 readVariableRaw(sampler2D tex, int p, int s) {

  return vec4(
  texture2D(tex, vec2(4*s, p) / resolution).r,
  texture2D(tex, vec2(4*s+1, p) / resolution).r,
  texture2D(tex, vec2(4*s+2, p) / resolution).r,
  texture2D(tex, vec2(4*s+3, p) / resolution).r
  );
}


vec4 readVariableRaw(int particle, int snapshot) {
  return (variableIdx == 0)
  ? readVariableRaw(ut_position, particle, snapshot)
  : readVariableRaw(ut_velocity, particle, snapshot);
}


void main () {

  int particle = int(gl_FragCoord.y - .5);
  int snapshot = int(floor((gl_FragCoord.x - .5) / 4.));
  int fourComponentIndex = int(floor(gl_FragCoord.x - .5))  - snapshot * 4;

  initLatticeData();

  vec4 value = (snapshot == 0)
  ? push(particle)
  : (takeSnapshot == 0)
  ? readVariable(particle, snapshot)
  : readVariable(particle, snapshot-1);


  gl_FragColor =
  (fourComponentIndex == 0)
  ? packFloat(value.x)
  : (fourComponentIndex == 1)
  ? packFloat(value.y)
  : (fourComponentIndex == 2)
  ? packFloat(value.z)
  : packFloat(value.w);


}


