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
#define texelSize 1.0 / float(2048)

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


vec4 packRGBA (float v) {
  vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v / 10.);
  pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;
  return pack;
}
float unpackRGBA (vec4 v) {
  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0))*10. ;
}
float shadowSample(vec2 co, float z, float bias) {
  float a = unpackRGBA(texture2D(shadowMap, co));
  float b = z;
  return step(b-bias, a);
}






vec4 get_color(float p) {
  vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
  return texture2D(utParticleColorAndType, coords);
}
vec4 get_position(float p, float b) {
  vec2 coords = vec2(p, b) / vec2(particleCount, bufferLength);
  return texture2D(utPositionBuffer, coords);
}
float calculateToBeDiscarded(vec4 previousFourPosition, vec4 currentFourPosition) {

  float undefinedBuffer = (currentFourPosition.w == 0. || previousFourPosition.w > currentFourPosition.w) ? 1.0 : 0.0;
  float beyondProgressLower = (currentFourPosition.w / dt < viewRange[0] * stepCount) ? 1.0 : 0.0;
  float beyondProgressUpper =  (currentFourPosition.w / dt > viewRange[1] * stepCount) ? 1.0 : 0.0;
  float outsideGrid = (currentFourPosition.x > stageGrid_size || currentFourPosition.x < -stageGrid_size
  || currentFourPosition.y > stageGrid_size || currentFourPosition.y < -stageGrid_size
  || currentFourPosition.z > stageGrid_size || currentFourPosition.z < -stageGrid_size) ? 1.0 : 0.0;

  return (outsideGrid > 0. || undefinedBuffer > 0. || beyondProgressLower > 0. || beyondProgressUpper > 0.) ? 1.0 : 0.0;

}

void main () {



  float previousBufferHead = (aStep < 1.) ? bufferLength : aStep - 1.;
  vec4 previousFourPosition = get_position(aParticle, previousBufferHead);
  vec4 currentFourPosition = get_position(aParticle, aStep);

  mat4 lookAtMat4 = lookAt(currentFourPosition.xyz, previousFourPosition.xyz, vec3(0., 1, 0.));

  vScale = vec3(pathicleWidth*2., pathicleHeight, length(previousFourPosition.xyz - currentFourPosition.xyz) - pathicleGap);

  vec3 scaledPosition = aPosition * vScale;

  vPosition = vec3(1., 1., 1.) * (((lookAtMat4 * vec4(scaledPosition, 1.)).xyz
  + 0.5 * (currentFourPosition.xyz + previousFourPosition.xyz)));


  vNormalOrig = aNormal;
  vNormal = normalize((transpose(inverse(lookAtMat4)) * vec4(aNormal, 0.)).xyz);

  vUv = aUV;


  vColor = get_color(aParticle);


  toBeDiscarded = calculateToBeDiscarded(previousFourPosition, currentFourPosition);
  vShadowCoord = (shadowProjectionMatrix * shadowViewMatrix * vec4(vPosition, 1.0)).xyz;
  gl_Position = projection * view *  vec4(vPosition, 1.0);


  #ifdef lighting
  vec3 lightDir = normalize(shadowDirection -1.*vPosition);
  float cosTheta = dot(vNormal, shadowDirection);



  float v = 1.0; // shadow value
  vec2 co = vShadowCoord.xy * 0.5 + 0.5;// go from range [-1,+1] to range [0,+1]
  // counteract shadow acne.
  float bias = max(maxBias * (1.0 - cosTheta), minBias);
  bias = 0.;
  float v0 = shadowSample(co + texelSize * vec2(0.0, 0.0), vShadowCoord.z, bias);
  float v1 = shadowSample(co + texelSize * vec2(1.0, 0.0), vShadowCoord.z, bias) * 1.;
  float v2 = shadowSample(co + texelSize * vec2(0.0, 1.0), vShadowCoord.z, bias) * 1.;
  float v3 = shadowSample(co + texelSize * vec2(1.0, 1.0), vShadowCoord.z, bias) * 1.;
  // PCF filtering
  v = (v0 + v1 + v2 + v3) * (1.0 / 4.);
  // if outside light frustum, render now shadow.
  // If WebGL had GL_CLAMP_TO_BORDER we would not have to do this,
  // but that is unfortunately not the case...
  if(co.x < 0.0 || co.x > 1.0 || co.y < 0.0 || co.y > 1.0) {
    v = 1.0;
  }
  vColorCorrection = 1.-abs(sin(aParticle)) * .1;
  #endif// lighting

}

