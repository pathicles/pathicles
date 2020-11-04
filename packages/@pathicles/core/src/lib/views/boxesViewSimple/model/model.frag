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

  vec3 lightDir = normalize(shadowDirection - vPosition);
  float cosTheta = clamp(dot(vNormal, shadowDirection ), 0., 1.)
  + .5*clamp(dot(vNormal, shadowDirection+vec3(5.,0.,5.)), 0., 1.)
  + .5*clamp(dot(vNormal, shadowDirection+vec3(-5.,0.,-5.)), 0., 1.);

//  float cosTheta = clamp(
//  dot(vNormal, shadowDirection )
//  + dot(vNormal, shadowDirection + vec3(1.,0.,1.))
//  + dot(vNormal, shadowDirection + vec3(-1.,0.,-1.))
//  , 0., 1.);
//  +  clamp(1.*dot(vNormal, shadowDirection + vec3(-10., 0., -10.)), 0., 1.), 0., 1.);

  vec4 edgedColor = vColor + edger(vUv, vScale, .5 * pathicleWidth, vNormalOrig)   * (vec4(.5 * smoothstep(10., 2., length(vPosition-eye))));

  vec3 ambient = ambientLightAmount * edgedColor.rgb;
  vec3 diffuse = diffuseLightAmount * edgedColor.rgb * cosTheta;

  float v =  1.;

  vec3 color = vec3(ambient + diffuse);

  float fogDistance = length(vPosition);
  float fogAmount = smoothstep(stageSize/2., stageSize/2.-1., fogDistance);

  gl_FragColor =vec4(color.rgb, fogAmount);

#endif// lighting
#ifdef shadow

  gl_FragColor = vec4(vShadowCoord.z*1.);
#endif



}


