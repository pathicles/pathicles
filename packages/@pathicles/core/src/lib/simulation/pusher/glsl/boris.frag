precision highp float;
const highp float c = 2.99792458e+8;

uniform bool littleEndian;
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

#pragma glslify: BeamlineElement = require("@pathicles/core/src/lib/shaders/beamline-element.glsl");
const int BEAMLINE_ELEMENT_TYPE_DRIFT = 0;
const int BEAMLINE_ELEMENT_TYPE_DIPOLE = 1;
const int BEAMLINE_ELEMENT_TYPE_QUADRUPOLE = 2;
const int BEAMLINE_ELEMENT_TYPE_ESTA = 3;

/*__latticeSize__*/
/*__latticeChunkGLSL__*/

mat2 rot2D(float phi) {
  float c = cos(phi);
  float s = sin(phi);
  return mat2(c, -s, s, c);
}
float sdBox( vec3 p, vec3 s ) {
  vec3 d = abs(p) - .5 * s;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}
#pragma glslify: packFloat = require("@pathicles/core/src/lib/shaders/packFloat.glsl");
#pragma glslify: floatToRgba = require("@pathicles/core/src/lib/shaders/floatToRgba.glsl");

#pragma glslify: ParticleData = require("@pathicles/core/src/lib/shaders/ParticleData.glsl");
#pragma glslify: getParticleData = require("@pathicles/core/src/lib/shaders/getParticleData.glsl", ParticleData=ParticleData, particleCount=resolution.y, ut_particleChargesMassesChargeMassRatios=ut_particleChargesMassesChargeMassRatios);

#pragma glslify: readVariable = require("@pathicles/core/src/lib/shaders/readVariable.glsl", resolution=resolution, littleEndian=littleEndian, PACK_FLOAT=PACK_FLOAT);

vec3 reflection(vec3 v, vec3 bottomLeft, vec3 topRight) {
  return  2.*(step(bottomLeft, v) - step(topRight, v)) - vec3(1.);
}
vec3 getE(vec3 position) {

  vec3 E = electricField;
  // E += vec3(1e10);
  for (int i=0; i < BEAMLINE_ELEMENT_COUNT; i++) {
    BeamlineElement ble =  beamline[i];
    if (ble.type == BEAMLINE_ELEMENT_TYPE_ESTA) {
      vec3 localPosition = position;
      localPosition -= ble.middle;
      localPosition.xz *= rot2D(ble.phi);
      if (sdBox(localPosition, ble.size) <= 0.) {
        E += vec3(0., 0., ble.strength);
      }
    }
  }    
  return E;
}

vec3 getB(vec3 position) {
  vec3 B = magneticField;

  for (int i=0; i < BEAMLINE_ELEMENT_COUNT; i++) {
    BeamlineElement ble =  beamline[i];
    vec3 localPosition = position;
    localPosition -= ble.middle;
    localPosition.xz *= rot2D(ble.phi);
    if (sdBox(localPosition, ble.size) <= 0.) {
      if (ble.type == BEAMLINE_ELEMENT_TYPE_DIPOLE) {
        B += vec3(0., ble.strength, 0.);
      } else if (ble.type == BEAMLINE_ELEMENT_TYPE_QUADRUPOLE) {
        B += abs(ble.strength) * ((ble.strength > 0.)
        ? vec3(localPosition.y, localPosition.x, 0)
        : vec3(-localPosition.y, -localPosition.x, 0.));
      }
    }
  }

  return B;
}


vec4 push_position(int p) {

  ParticleData particleData = getParticleData(p);
  vec4 fourPosition = readVariable(ut_position, p, 0);

  vec3 position = fourPosition.xyz;
  float time  = fourPosition.w;

  vec4 fourVelocity_current = readVariable(ut_velocity, p, 1);
  vec4 fourVelocity_next = readVariable(ut_velocity, p, 0);

  float nextTime = time + deltaTOverC;

  vec4 next = vec4(position +  fourVelocity_next.xyz / fourVelocity_next.w  * deltaTOverC, nextTime);

  return next;
}


vec4 push_velocity(int p) {

  ParticleData particleData = getParticleData(p);

  vec4 fourPosition = readVariable(ut_position, p, 1);
  vec4 fourVelocity = readVariable(ut_velocity, p, 0);

  vec3 velocity = (particleData.particleType > .1)  ? fourVelocity.xyz / fourVelocity.w : fourVelocity.xyz;
  velocity = fourVelocity.xyz / fourVelocity.w;

  vec3 intermediatePosition = fourPosition.xyz + .5 *  velocity * deltaTOverC;
  vec3 E = getE(intermediatePosition);
  vec3 B = getB(intermediatePosition);

  float gamma = 1.;
  vec3 u = fourVelocity.xyz;

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


  if (boundingBoxSize > 0.) {

    velocity = (particleData.particleType > .1)  ? u / gamma / c : velocity;
    vec3 nextPosition = intermediatePosition.xyz + .5 *  velocity * deltaTOverC;
    vec3 ref = reflection(
      nextPosition.xyz,
      boundingBoxCenter - vec3(boundingBoxSize),
      boundingBoxCenter + vec3(boundingBoxSize)
    );
    u *= ref;

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


#ifdef PACK_FLOAT

  gl_FragColor =
  (fourComponentIndex == 0)
  ? packFloat(value.x)
  : (fourComponentIndex == 1)
  ? packFloat(value.y)
  : (fourComponentIndex == 2)
  ? packFloat(value.z)
  : packFloat(value.w);

  // gl_FragColor =
  // (fourComponentIndex == 0)
  // ? floatToRgba(value.x, littleEndian)
  // : (fourComponentIndex == 1)
  // ? floatToRgba(value.y, littleEndian)
  // : (fourComponentIndex == 2)
  // ? floatToRgba(value.z, littleEndian)
  // : floatToRgba(value.w, littleEndian);


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


}
