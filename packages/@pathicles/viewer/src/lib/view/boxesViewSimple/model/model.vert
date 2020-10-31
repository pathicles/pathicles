precision highp float;
#pragma glslify: inverse = require(glsl-inverse)
#pragma glslify: transpose = require(glsl-transpose)
mat4 lookAt(vec3 eye, vec3 at, vec3 up) {
  vec3 zaxis = normalize(eye - at);
  vec3 xaxis = normalize(cross(zaxis, up));
  vec3 yaxis = cross(xaxis, zaxis);
  zaxis *= -1.;
  return mat4(
  vec4(xaxis.x, xaxis.y, xaxis.z, -dot(xaxis, eye)),
  vec4(yaxis.x, yaxis.y, yaxis.z, -dot(yaxis, eye)),
  vec4(zaxis.x, zaxis.y, zaxis.z, -dot(zaxis, eye)),
  vec4(0, 0, 0, 1)
  );
}


attribute vec3 aPosition;

attribute vec3 aNormal;
attribute vec2 aUV;

attribute float aParticle;
attribute float aColorCorrection;
attribute float aStep;

uniform float particleCount;
uniform float bufferLength;
uniform float stepCount;

uniform float dt;
uniform vec2 viewRange;

uniform float pathicleWidth;
uniform float pathicleGap;
uniform float pathicleHeight;
uniform float stageGrid_size;

uniform sampler2D utParticleColorAndType;
uniform sampler2D utPositionBuffer;
uniform sampler2D utVelocityBuffer;
uniform mat4 projection, view, model;
uniform vec3 eye;


uniform mat4 shadowProjectionMatrix;
uniform mat4 shadowViewMatrix;
uniform vec3 shadowDirection;
uniform float minBias;
uniform float maxBias;


varying float toBeDiscarded;
varying vec3 vScale;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec2 vUv;
varying vec3 vShadowCoord;
varying vec4 vColor;
varying float vColorCorrection;
uniform sampler2D shadowMap;
const mat4 texUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);


#pragma glslify: decodeFloat = require("@pathicles/core/src/lib/shaders/decodeFloat.glsl");
#pragma glslify: encodeFloat = require("@pathicles/core/src/lib/shaders/encodeFloat.glsl");



vec4 get_color(float p) {
  vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
  return texture2D(utParticleColorAndType, coords);
}
vec4 get_position(float p, float b) {
  vec2 coords = vec2(p + .5, b+.5) / vec2(particleCount, bufferLength);
  return texture2D(utPositionBuffer, coords);
}

vec4 readVariable(sampler2D tex, float p, float b) {

  return get_position(p, b);
  float x = texture2D(tex,
  vec2(p + particleCount * 0., b) /
  vec2(particleCount, bufferLength)).x;

  float y = texture2D(tex,
  vec2(p + particleCount * 0., b) /
  vec2(particleCount, bufferLength)).y;

  float z = texture2D(tex,
  vec2(p + particleCount * 1., b) /
  vec2(particleCount, bufferLength)).z;

  float w = texture2D(tex,
  vec2(p + particleCount * 0., b) /
  vec2(particleCount, bufferLength)).w;

  return vec4(x, y, z, w);
}




float calculateToBeDiscarded(vec4 previousFourPosition, vec4 fourPosition) {

  float undefinedBuffer = (fourPosition.w == 0. || previousFourPosition.w > fourPosition.w) ? 1.0 : 0.0;
  float beyondProgressLower = (fourPosition.w / dt < viewRange[0] * stepCount) ? 1.0 : 0.0;
  float beyondProgressUpper =  (fourPosition.w / dt > viewRange[1] * stepCount) ? 1.0 : 0.0;
  float outsideGrid = (fourPosition.x > stageGrid_size || fourPosition.x < -stageGrid_size
  || fourPosition.y > stageGrid_size || fourPosition.y < -stageGrid_size
  || fourPosition.z > stageGrid_size || fourPosition.z < -stageGrid_size) ? 1.0 : 0.0;

  return (outsideGrid > 0. || undefinedBuffer > 0. || beyondProgressLower > 0. || beyondProgressUpper > 0.) ? 1.0 : 0.0;

}

void main () {

  float previousBufferHead = (aStep < 1.) ? bufferLength : aStep - 1.;

  vec4 previousFourPosition = readVariable(utPositionBuffer, aParticle, previousBufferHead);
  vec4 fourPosition = readVariable(utPositionBuffer, aParticle, aStep);

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

  vColor = get_color(aParticle);

  toBeDiscarded = calculateToBeDiscarded(previousFourPosition, fourPosition);

  vShadowCoord = (shadowProjectionMatrix *  shadowViewMatrix * model * vec4(vPosition, 1.0)).xyz;


  vec3 vShadowCoord2 = (shadowProjectionMatrix *  shadowViewMatrix * model * vec4(fourPosition.xyz, 1.0)).xyz;


  vec3 readShadowProjectionMatrix =  (texUnitConverter * shadowProjectionMatrix *  shadowViewMatrix * model * vec4(fourPosition.xyz, 1.0)).xyz;



  #ifdef lighting

  float amountInLight = (texture2D(shadowMap, readShadowProjectionMatrix.xy).r - vShadowCoord2.z < 0.01) ? .5 : 0.;
  vColorCorrection = aColorCorrection;//1. - amountInLight * 1.; //aColorCorrection;; //1.-amountInLight; //aColorCorrection;


  gl_Position = projection * view *  model * vec4(vPosition, 1.0);
  //  gl_Position = vec4(vShadowCoord, 1.);



  #endif// lighting



  #ifdef shadow
  gl_Position =vec4(vShadowCoord, 1.0);

  #endif// shadow
}

