precision highp float;
attribute vec3 aPosition;

attribute vec3 aNormal;
attribute vec2 aUV;

attribute float aParticle;
attribute float aStep;

uniform float particleCount;
uniform float bufferLength;
uniform float iterationCount;

uniform float iteration;
uniform float dt;
uniform vec2 viewRange;

uniform float pathicleWidth;
uniform float pathicleGap;
uniform float pathicleHeight;
uniform float stageGrid_size;

uniform sampler2D utColorCorrections;
uniform sampler2D utParticleColorAndType;
uniform sampler2D utPositionBuffer;
uniform sampler2D utVelocityBuffer;
uniform mat4 projection, view, model;
uniform vec3 eye;

uniform mat4 shadowProjectionMatrix;
uniform mat4 shadowViewMatrix;
uniform vec3 shadowDirection;

varying float v_visibility;
varying vec3 vScale;
varying vec3 vPosition;
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
#pragma glslify: readVariable = require("@pathicles/core/src/lib/shaders/readVariable.glsl", particleCount=particleCount, bufferLength=bufferLength);



float get_colorCorrection(float p) {
  vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
  return texture2D(utColorCorrections, coords).r;
}

vec4 get_color(float p) {
  vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
  return texture2D(utParticleColorAndType, coords);
}


float calculateToBeDiscarded(vec4 previousFourPosition, vec4 fourPosition) {

  float undefinedBuffer = (fourPosition.w == 0. || previousFourPosition.w > fourPosition.w) ? 1.0 : 0.0;
  float beyondProgressLower = (fourPosition.w / dt < viewRange[0] * iterationCount) ? 1.0 : 0.0;
  float beyondProgressUpper =  (fourPosition.w / dt > viewRange[1] * iterationCount) ? 1.0 : 0.0;

  float outsideGrid = (fourPosition.x > stageGrid_size || fourPosition.x < -stageGrid_size
  || fourPosition.y > stageGrid_size || fourPosition.y < -stageGrid_size
  || fourPosition.z > stageGrid_size || fourPosition.z < -stageGrid_size) ? 1.0 : 0.0;


  return (bufferLength-aStep-iteration)/bufferLength * ((outsideGrid > 0. ||   beyondProgressLower > 0. || beyondProgressUpper > 0.) ? 0. : 1.);
}

void main () {

  float previousStep = aStep + 1.;
  vec4 previousFourPosition = readVariable(utPositionBuffer, aParticle, previousStep) + vec4(0.,0. *.1, 0., 0.);
  vec4 fourPosition = readVariable(utPositionBuffer, aParticle, aStep) + vec4(0., 0. *.1, 0., 0.);

  mat4 lookAtMat4 = lookAt(fourPosition.xyz, previousFourPosition.xyz, vec3(0., 1, 0.));

  #ifdef lighting
  vScale = vec3(pathicleWidth, pathicleHeight, length(previousFourPosition.xyz - fourPosition.xyz) - pathicleGap);
  #endif

  #ifdef shadow
  vScale = vec3(pathicleWidth*5., pathicleHeight, length(previousFourPosition.xyz - fourPosition.xyz) - 0.*pathicleGap);
  #endif



  vec3 scaledPosition = aPosition * vScale;

  vPosition = vec3(1., 1., 1.) *
  (((lookAtMat4 * vec4(scaledPosition, 1.)).xyz
  + 0.5 * (fourPosition.xyz + previousFourPosition.xyz)));


  vNormalOrig = aNormal;
  vNormal = normalize((transpose(inverse(lookAtMat4)) * vec4(aNormal, 0.)).xyz);

  vUv = aUV;

  vColor = get_color(aParticle).rgb;
  vColorCorrection = get_colorCorrection(aParticle);

  v_visibility = calculateToBeDiscarded(previousFourPosition, fourPosition);

  vShadowCoord = (shadowProjectionMatrix *  shadowViewMatrix * model * vec4(vPosition, 1.0)).xyz;


  vec3 vShadowCoord2 = (shadowProjectionMatrix *  shadowViewMatrix * model * vec4(fourPosition.xyz, 1.0)).xyz;


  vec3 readShadowProjectionMatrix =  (texUnitConverter * shadowProjectionMatrix *  shadowViewMatrix * model * vec4(fourPosition.xyz, 1.0)).xyz;


  #ifdef lighting

  float amountInLight = (texture2D(shadowMap, readShadowProjectionMatrix.xy).r - vShadowCoord2.z < 0.01) ? .5 : 0.;
  gl_Position = projection * view *  model * vec4(vPosition, 1.0);


  #endif// lighting

  #ifdef shadow
  gl_Position =vec4(vShadowCoord, 1.0);

  #endif// shadow
}

