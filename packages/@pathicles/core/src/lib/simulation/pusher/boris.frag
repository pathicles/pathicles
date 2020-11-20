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
uniform int fourComponent;
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

//#pragma glslify: readVariable = require("@pathicles/core/src/lib/shaders/readVariable.glsl", particleCount=particleCount, bufferLength=bufferLength);

vec4 packFloat(float value) {
//  if (value == 0.0) return vec4(0, 0, 0, 0);
//
//  float exponent;
//  float mantissa;
//  vec4  result;
//  float sgn;
//
//  sgn = step(0.0, -value);
//  value = abs(value);
//
//  exponent =  floor(log2(value));
//
//  mantissa =  value*pow(2.0, -exponent)-1.0;
//  exponent =  exponent+127.0;
//  result   = vec4(0,0,0,0);
//
//  result.a = floor(exponent/2.0);
//  exponent = exponent - result.a*2.0;
//  result.a = result.a + 128.0*sgn;
//
//  result.b = floor(mantissa * 128.0);
//  mantissa = mantissa - result.b / 128.0;
//  result.b = result.b + exponent*128.0;
//
//  result.g =  floor(mantissa*32768.0);
//  mantissa = mantissa - result.g/32768.0;
//
//  result.r = floor(mantissa*8388608.0);
//
//  return result/255.0;

  const vec4 bitShift = vec4(
  256 * 256 * 256,
  256 * 256,
  256,
  1.0
  );
  const vec4 bitMask = vec4(
  0,
  1.0 / 256.0,
  1.0 / 256.0,
  1.0 / 256.0
  );
  vec4 comp = fract(value * bitShift);
  comp -= comp.xxyz * bitMask;
  return comp;
}

//
//#pragma glslify: packFloat = require("@pathicles/core/src/lib/shaders/pack-float.glsl");

//#pragma glslify: unpackFloat = require("@pathicles/core/src/lib/shaders/unpack-float.glsl");



float unpackFloat(vec4 texel) {

  const vec4 bitShift = vec4(
  1.0 / (256.0 * 256.0 * 256.0),
  1.0 / (256.0 * 256.0),
  1.0 / 256.0,
  1
  );
  return dot(texel, bitShift);


  float exponent;
  float mantissa;
  float sgn;
  float value;




  /* sgn will be 0 or -1 */
  sgn = -step(128.0, texel.a);
  texel.a += 128.0*sgn;


  exponent = step(128.0, texel.b);
  texel.b -= exponent*128.0;
  /* Multiple by 2 => left shift by one bit. */
  exponent += 2.0*texel.a -127.0;

  mantissa = texel.b*65536.0 + texel.g*256.0 + texel.r;

  value = sgn * exp2(exponent)*(1.0 + mantissa * exp2(-23.0));


  return value;
}

vec4 readVariable(sampler2D tex, float p, float s) {


  float ns = bufferLength;
  float np = particleCount;

  vec2 res = vec2(ns * 4., np);

//  return vec4(
//    unpackFloat(texture2D(tex, vec2(s * 4., p) / res)),
//    unpackFloat(texture2D(tex, vec2(s * 4. +1., p) / res)),
//    unpackFloat(texture2D(tex, vec2(s * 4.+2., p) / res)),
//    unpackFloat(texture2D(tex, vec2(s * 4. +3., p) / res))
//  );
//  return vec4(
//    (texture2D(tex, vec2(s * 4., p) / res).x),
//    (texture2D(tex, vec2(s * 4. +1., p) / res).x),
//    (texture2D(tex, vec2(s * 4.+2., p) / res).x),
//    (texture2D(tex, vec2(s * 4. +3., p) / res).x)
//  );
  return vec4(
    p,
    s, //unpackFloat(packFloat(s)),
    np,
    ns);
//
//  return vec4(unpackFloat(packFloat(999.)));
//  //  return vec4(res, res);
}





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



vec4 push_position(float p) {

  ParticleData particleData = getParticleData(p);
  vec4 fourPosition = readVariable(utPositionBuffer, p, 0.);

  vec3 position = fourPosition.xyz;
  float time  = fourPosition.w;

  vec3 fourMomentum = readVariable(utVelocityBuffer, p, 1.).xyz;
  vec3 nextMomentum = readVariable(utVelocityBuffer, p, 0.).xyz;

  float nextTime = time + 2. * halfDeltaTOverC;

  return (particleData.particleType < .1)
  // photon
  ? vec4(position + fourMomentum * halfDeltaTOverC  + nextMomentum * halfDeltaTOverC, nextTime)
  // massive particles
  : vec4(position + fourMomentum / sqrt(1. + dot(fourMomentum, fourMomentum)) * halfDeltaTOverC + nextMomentum / sqrt(1. + dot(nextMomentum, nextMomentum)) * halfDeltaTOverC, nextTime);
}

//  + nextMomentum / sqrt(1. + dot(nextMomentum, nextMomentum)) * halfDeltaTOverC, nextTime)

vec4 push_velocity(float p) {

  ParticleData particleData = getParticleData(p);
  vec3 momentum;

  vec4 fourPosition = readVariable(utPositionBuffer, p, 0.);
  vec4 fourVelocity = readVariable(utVelocityBuffer, p, 0.);
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

vec4 push(float p) {
  return (variableIdx == 0)
  ? push_position(p)
  : push_velocity(p);
}

vec4 readVariable(float texelParticleIndex, float texelBufferIndex) {
  return (variableIdx == 0)
  ? readVariable(utPositionBuffer, texelParticleIndex, texelBufferIndex)
  : readVariable(utVelocityBuffer, texelParticleIndex, texelBufferIndex);
}
void main () {

  initLatticeData();

  float texelParticleIndex = gl_FragCoord.y - .5;
  float texelBufferIndex = floor((gl_FragCoord.x - .5) / 4.);
  float texelFourComponent = floor(gl_FragCoord.x - .5)  - texelBufferIndex * 4.;
    ////
    ////    float nextBufferPosition = floor(mod(iteration, bufferLength + 1.));
    ////    float bufferPosition = (texelBufferIndex == 0.) ? bufferLength : texelBufferIndex - 1.;
    //
    //    float nextBufferPosition = 0.;
    //    float bufferPosition = 1.;


    vec4 value = (texelBufferIndex  < 0.1)
      ? push(texelParticleIndex)
      :  (texelBufferIndex <= iteration)
        ? readVariable(texelParticleIndex, texelBufferIndex - 1.)
        : vec4(0.);




//  vec4 value = readVariable(texelParticleIndex, texelBufferIndex);

  gl_FragColor = (texelFourComponent == 0.)
      ? packFloat(value.x)
      : (texelFourComponent == 1.)
      ? packFloat(value.y)
      : (texelFourComponent == 2.)
      ? packFloat(value.z)
      : (texelFourComponent == 3.)
      ? packFloat(value.w)
      :  vec4(-9999.);


  gl_FragColor = (texelFourComponent == 0.)
  ? packFloat(value.x)
  : (texelFourComponent == 1.)
  ? packFloat(value.y)
  : (texelFourComponent == 2.)
  ? packFloat(value.z)
  : (texelFourComponent == 3.)
  ? packFloat(value.w)
  :  vec4(-9999.);

//  gl_FragColor = vec4(.7);
//  gl_FragColor = vec4(texelParticleIndex * 10. + texelBufferIndex + .1 * texelFourComponent); //packFloat(-.5);
  gl_FragColor = packFloat(texelParticleIndex * 10. + texelBufferIndex + .1 * texelFourComponent); //packFloat(-.5);

  gl_FragColor= vec4(195./255., 245./255., 72./255., 64./255.);
  gl_FragColor= packFloat(3.14);
}
