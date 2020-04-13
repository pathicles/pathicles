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
uniform float stageGrid_y;
uniform float stageGrid_size;
uniform vec3 shadowColor;
uniform vec4 uLight;

uniform sampler2D utParticleColorAndType;
uniform sampler2D utPositionBuffer;
uniform sampler2D utVelocityBuffer;
uniform mat4 projection, view, model;
uniform vec3 eye;

varying float toBeDiscarded;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vAmbientColor;
varying vec3 vDiffuseColor;

varying float vColorCorrection;

vec3 hemisphere_light(
  vec3 normal,
  vec3 sky,
  vec3 ground,
  vec3 lightDirection,
  mat4 modelMatrix,
  mat4 viewMatrix,
  vec3 viewPosition,
  float shininess,
  float specularity
) {
  vec3 direction = normalize((
  modelMatrix * vec4(lightDirection, 1.0)
  ).xyz);

  float weight = 0.5 * dot(
  normal
  , direction
  ) + 0.5;

  vec3 diffuse = mix(ground, sky, weight);

  vec3 specDirection = normalize((
  viewMatrix * modelMatrix * vec4(lightDirection, 1.0)
  ).xyz);

  float skyWeight = 0.5 * dot(
  normal
  , normalize(specDirection + viewPosition)
  ) + 0.5;

  float gndWeight = 0.5 * dot(
  normal
  , normalize(viewPosition - specDirection)
  ) + 0.5;

  vec3 specular = specularity * diffuse * (
  max(pow(skyWeight, shininess), 0.0) +
  max(pow(gndWeight, shininess), 0.0)
  ) * weight;

  return diffuse + specular;
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

  float scale = 1.;
  #ifdef shadow
  scale = 1.;
  #endif

  vec3 scaledPosition = vec3(
  scale * aPosition.x,
  aPosition.y,
  scale * aPosition.z * (length(previousFourPosition.xyz - currentFourPosition.xyz) - pathicleGap));

  vPosition = vec3(1., 1., 1.) * (((lookAtMat4 * vec4(scaledPosition, 1.)).xyz
  + 0.5 * (currentFourPosition.xyz + previousFourPosition.xyz)));

  vNormal = normalize((transpose(inverse(lookAtMat4)) * vec4(aNormal, 0.)).xyz);



  vUv = aUV;

  #ifdef lighting
//  vDiffuseColor = get_color(aParticle).rgb;

  vDiffuseColor = get_color(aParticle).rgb;
  //vDiffuseColor = vec4(max(dot(normalize(uLight.xyz), vNormal), 0.) * get_color(aParticle).rgb, 1);

  vec3 sky = vec3(1.0, 1.0, 0.9);
  vec3 gnd = vec3(0.1, 0., 0.);
  vAmbientColor = hemisphere_light(vNormal, sky, gnd, vec3(0.,1.,0.), model, view, eye, .5, .5);


  float maxDistance = 4.;
  vColorCorrection =  -1. * aColorCorrection;
//  float distance = length(vPosition - eye);
//  vColorCorrection = mix(.25, .5, maxDistance-distance/maxDistance);


  if (
  abs(dot(
  aNormal,
  vec3(0., 0., 1.)
  )) == 1.) { vColorCorrection -= .2; }

    #endif

    #ifdef shadow
  vPosition.y = vPosition.y * 0. + stageGrid_y + .01;
  vColorCorrection = 0.;
  vDiffuseColor = shadowColor;
  if (aPosition.z < 0.) toBeDiscarded = 1.;
  #endif

  toBeDiscarded = calculateToBeDiscarded(previousFourPosition, currentFourPosition);
  gl_Position = projection * view * model * vec4(vPosition, 1.0);

}

