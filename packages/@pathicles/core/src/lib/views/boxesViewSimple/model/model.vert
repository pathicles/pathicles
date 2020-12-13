precision highp float;
attribute vec3 aPosition;

attribute vec3 aNormal;
attribute vec2 aUV;

attribute float a_particle;
attribute float a_snapshot;

uniform int particleCount;
uniform int snapshotCount;
uniform int iterations;
uniform int packFloat2UInt8;

uniform vec2 viewRange;

uniform float pathicleWidth;
uniform float pathicleGap;
uniform float pathicleHeight;
uniform float stageGrid_size;

uniform sampler2D utColorCorrections;
uniform sampler2D utParticleColorAndType;
uniform sampler2D ut_position;
uniform sampler2D utVelocityBuffer;
uniform mat4 projection, view, model;
uniform vec3 eye;

uniform mat4 shadowProjectionMatrix;
uniform mat4 shadowViewMatrix;
uniform vec3 shadowDirection;
uniform int littleEndian;
varying float v_visibility;
varying vec3 vScale;
varying vec3 v_position;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec2 vUv;
varying vec3 vShadowCoord;
varying vec3 vColor;
varying float vColorCorrection;
uniform sampler2D shadowMap;
const mat4 texUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);

#pragma glslify: inverse = require(glsl-inverse)
#pragma glslify: transpose = require(glsl-transpose)
#pragma glslify: lookAt = require("@pathicles/core/src/lib/shaders/look-at.glsl");

#pragma glslify: decodeFloat = require("@pathicles/core/src/lib/shaders/decodeFloat.glsl");
#pragma glslify: encodeFloat = require("@pathicles/core/src/lib/shaders/encodeFloat.glsl");

#pragma glslify: readVariable = require("@pathicles/core/src/lib/shaders/readVariable.glsl", particleCount=particleCount, snapshotCount=snapshotCount, LITTLE_ENDIAN=LITTLE_ENDIAN);



float insideBox3D(vec3 v, vec3 bottomLeft, vec3 topRight) {
  vec3 s = step(bottomLeft, v) - step(topRight, v);
  return s.x * s.y * s.z;
}


float get_colorCorrection(int p) {
  vec2 coords = vec2(float(p), 0.) / vec2(float(particleCount), 1.);
  return texture2D(utColorCorrections, coords).r;
}

vec4 get_color(int p) {
  vec2 coords = vec2(float(p), 0.) / vec2(float(particleCount), 1.);
  return texture2D(utParticleColorAndType, coords);
}
float visibility(vec4 fourPosition) {

  bool outsideBox = insideBox3D(fourPosition.xyz, vec3(stageGrid_size), vec3(-stageGrid_size)) == 0.;
  bool beyondProgressLower = (viewRange[0] * float(snapshotCount) >= float(snapshotCount)-a_snapshot);
  bool beyondProgressUpper =  (viewRange[1] * float(snapshotCount) < float(snapshotCount)-a_snapshot);
  return  (outsideBox || beyondProgressLower || beyondProgressUpper ) ? 0. : 1.;
}

void main () {

  vec4 fourPosition = readVariable(ut_position, int(a_particle), int(a_snapshot));
  vec4 previousFourPosition = readVariable(ut_position, int(a_particle), int(a_snapshot) + 1);

  mat4 lookAtMat4 = lookAt(fourPosition.xyz, previousFourPosition.xyz, vec3(0., 1, 0.));

  #ifdef lighting
  vScale = vec3(
  pathicleWidth  * 1.,
  pathicleHeight,
  length(previousFourPosition.xyz - fourPosition.xyz) - pathicleGap);
  #endif


  #ifdef shadow
    vScale = vec3(
      pathicleWidth * 5.,
      pathicleHeight,
      length(previousFourPosition.xyz - fourPosition.xyz) );
  #endif

  vec3 scaledPosition = aPosition * vScale;

  v_position = vec3(1., 1., 1.) *
    (((lookAtMat4 * vec4(scaledPosition, 1.)).xyz
    + 0.5 * (fourPosition.xyz + previousFourPosition.xyz)));


  vNormalOrig = aNormal;
  vNormal = normalize((transpose(inverse(lookAtMat4)) * vec4(aNormal, 0.)).xyz);

  vUv = aUV;

  vColor = get_color(int(a_particle)).rgb;
  vColorCorrection = get_colorCorrection(int(a_particle));

  v_visibility = visibility(fourPosition);

  vShadowCoord = (shadowProjectionMatrix *  shadowViewMatrix * model * vec4(v_position, 1.0)).xyz;


#ifdef lighting
  //  vec3 vShadowCoord2 = (shadowProjectionMatrix *  shadowViewMatrix * model * vec4(fourPosition.xyz, 1.0)).xyz;
//
//  vec3 readShadowProjectionMatrix =  (texUnitConverter * shadowProjectionMatrix *  shadowViewMatrix * model * vec4(fourPosition.xyz, 1.0)).xyz;
//
//  //  float amountInLight = (texture2D(shadowMap, readShadowProjectionMatrix.xy).r - vShadowCoord2.z < 0.01) ? 1. : 0.;
//  vColorCorrection = amountInLight;
  gl_Position = projection * view *  model * vec4(v_position, 1.0);
#endif// lighting

#ifdef shadow
  gl_Position =vec4(vShadowCoord, 1.0);
#endif// shadow
}




