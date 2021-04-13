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
#pragma glslify: getParticleData = require("@pathicles/core/src/lib/shaders/getParticleData.glsl", ParticleData=ParticleData, particleCount=resolution.y, ut_particleChargesMassesChargeMassRatios=ut_particleChargesMassesChargeMassRatios);
#pragma glslify: readVariable = require("@pathicles/core/src/lib/shaders/readVariable__float.glsl", resolution=resolution);

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

  //  vec3 velocity = readVariable(ut_velocity, p, 1).xyz;
  vec4 fourVelocity_current = readVariable(ut_velocity, p, 1);
  vec4 fourVelocity_next = readVariable(ut_velocity, p, 0);
  //  vec3 nextGamma = readVariable(ut_velocity, p, 0).xyz;

  float nextTime = time + deltaTOverC;

  return (particleData.particleType < .1)
  ? vec4(position +  fourVelocity_next.xyz / fourVelocity_next.w  * deltaTOverC, nextTime)
  : vec4(position + fourVelocity_next.xyz / fourVelocity_next.w  * deltaTOverC, nextTime);
  //  : vec4(position + velocity / sqrt(1. + dot(velocity, velocity)) * deltaTOverC + nextVelocity / sqrt(1. + dot(nextVelocity, nextVelocity)) * deltaTOverC, nextTime);
}


vec4 push_velocity(int p) {

  ParticleData particleData = getParticleData(p);


  vec4 fourPosition = readVariable(ut_position, p, 1);
  vec4 fourVelocity = readVariable(ut_velocity, p, 0);

  vec3 velocity = (particleData.particleType > .1)  ? fourVelocity.xyz / fourVelocity.w : fourVelocity.xyz;

  vec3 intermediatePosition = fourPosition.xyz + .5 *  velocity * deltaTOverC;
  vec3 E = getE(intermediatePosition);
  vec3 B = getB(intermediatePosition);

  float gamma = 1.;
  vec3 u = fourVelocity.xyz;
  if (boundingBoxSize > 0.) {
    vec3 reflect =
    step(boundingBoxCenter-vec3(boundingBoxSize), fourPosition.xyz)
    -step(boundingBoxCenter+vec3(boundingBoxSize), fourPosition.xyz);
    //        u *= (2. * reflect * reflect - 1.);
    if (fourPosition.x  < -1. || fourPosition.x  > 1.) u.x = -u.x;
  }

  if (particleData.particleType > .1) {

    float chargeMassRatio = particleData.chargeMassRatio;
    float hdtc_m =   chargeMassRatio * deltaTOverC / c / 2.;


    u +=  hdtc_m * E;

    gamma = sqrt(1. + dot(u/c, u/c));

    vec3 t_ =  hdtc_m  * B  / gamma;
    u += cross(u, t_);
    vec3 s_ = 2.0 / (1.0 + t_*t_) * t_;
    u += cross(u, s_);
    u += hdtc_m * E;
    gamma = sqrt(1. + dot(u/c, u/c));
  }


  return vec4(u, gamma * c);
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
  ? vec4(value.x, 0., 0., 0.)
  : (fourComponentIndex == 1)
  ? vec4(value.y, 0., 0., 0.)
  : (fourComponentIndex == 2)
  ? vec4(value.z, 0., 0., 0.)
  : vec4(value.w, 0., 0., 0.);


}

