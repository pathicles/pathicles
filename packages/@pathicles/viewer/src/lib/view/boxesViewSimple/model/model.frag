precision highp float;
#extension GL_OES_standard_derivatives : enable

varying float toBeDiscarded;
varying vec3 vPosition;
varying vec3 vScale;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec2 vUv;
varying vec4 vAmbientColor;
varying vec4 vColor;
varying float vColorCorrection;

uniform float ambientLightAmount;
uniform float diffuseLightAmount;
uniform float stageSize;

uniform float pathicleWidth;
uniform vec3 eye;
uniform vec2 uResolution;

varying vec3 vShadowCoord;
uniform vec3 shadowDirection;
uniform sampler2D shadowMap;
uniform float minBias;
uniform float maxBias;

#pragma glslify: encodeFloat = require("@pathicles/core/src/lib/shaders/encodeFloat.glsl");
#pragma glslify: decodeFloat = require("@pathicles/core/src/lib/shaders/decodeFloat.glsl");
#pragma glslify: edger = require("@pathicles/core/src/lib/shaders/edger.glsl");



void main () {

  if (toBeDiscarded > .0) discard;

#ifdef lighting

  vec3 lightDir = normalize(shadowDirection - 1.*vPosition);
  float cosTheta =
    clamp(1.*dot(vNormal, shadowDirection ), 0., 1.)
    + clamp(1.*dot(vNormal, shadowDirection + vec3(10.,0.,10.)), 0., 1.)
  +  clamp(1.*dot(vNormal, shadowDirection + vec3(-10., 0., -10.)), 0., 1.);

  vec3 ambient = ambientLightAmount * vColor.rgb;
  vec3 diffuse = diffuseLightAmount * vColor.rgb * cosTheta;

  float v = vColorCorrection;

  vec3 color = vec3(ambient * v + v * diffuse)
    + edger(vUv, vScale, .5 * pathicleWidth, vNormalOrig)
    * (vec3(.5 * smoothstep(5., 0., length(vPosition-eye))));

  float fogDistance = length(vPosition);
  float fogAmount = smoothstep(stageSize/2., stageSize/2.-1., fogDistance);

  gl_FragColor =vec4(color.rgb, fogAmount);

#endif// lighting
#ifdef shadow

  gl_FragColor = encodeFloat(vShadowCoord.z);
#endif



}


