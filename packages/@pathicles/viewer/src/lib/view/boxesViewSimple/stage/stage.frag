precision highp float;
#define TRANSPARENT
#extension GL_OES_standard_derivatives : enable
#define texelSize 1.0 / float(1024)

#pragma glslify: fog_exp2 = require(glsl-fog/exp2)

uniform vec3 shadowDirection;
uniform sampler2D shadowMap;
uniform float minBias;
uniform float maxBias;
varying vec3 vShadowCoord;


#define SQRT2 1.41421356
#define PI 3.14159


float shadowSample(vec2 co, float z, float bias) {
  float a = texture2D(shadowMap, co).z;
  float b = vShadowCoord.z;
  return step(b-bias, a);
}



vec4 packRGBA (float v) {
  vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v);
  pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;
  return pack;
}
float unpackRGBA (vec4 v) {
  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
}



vec3 mainColor = vec3(.7, .7, .7);
vec3 lineColor = vec3(.2, .2, .2);
vec4 gridControl = vec4(.1, 10., .5, .99);
vec3 gridOffset = vec3(0., 0., 0.);
varying vec3 vPosition;
varying vec3 vNormal;
float getVisibility(float position) {
  float majorGridFrequency=gridControl.y;
  if (floor(position+0.5) == floor(position/majorGridFrequency+0.5)*majorGridFrequency)
  {
    return 1.0;
  }
  return gridControl.z;
}
float getAnisotropicAttenuation(float differentialLength) {
  const float maxNumberOfLines=4.0;
  return clamp(1.0/(differentialLength+1.0)-1.0/maxNumberOfLines, 0.0, 1.0);
}
float isPointOnLine(float position, float differentialLength) {
  float fractionPartOfPosition = position-floor(position+0.5);
  fractionPartOfPosition/=differentialLength;
  fractionPartOfPosition=clamp(fractionPartOfPosition, -1., 1.);
  float result=0.5+0.5*cos(fractionPartOfPosition*PI);
  return result;
}
float contributionOnAxis(float position) {
  float differentialLength=length(vec2(dFdx(position), dFdy(position)));
  differentialLength*=SQRT2;
  float result=isPointOnLine(position, differentialLength);
  float visibility=getVisibility(position);
  result*=visibility;
  float anisotropicAttenuation=getAnisotropicAttenuation(differentialLength);
  result*=anisotropicAttenuation;
  return result;
}
float normalImpactOnAxis(float x) {
  float normalImpact=clamp(1.0-3.0*abs(x*x*x), 0.0, 1.0);
  return normalImpact;
}

void main(void) {


  vec3 lightDir = normalize(shadowDirection - vPosition);
  float cosTheta = dot(vNormal, lightDir);

  float v = 1.0; // shadow value
  vec2 co = vShadowCoord.xy * 0.5 + 0.5;// go from range [-1,+1] to range [0,+1]
  // counteract shadow acne.
  float bias = max(maxBias * (1.0 - cosTheta), minBias);
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
    v = 0.0;
  }



  float gridRatio=gridControl.x;
  vec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;
  float x=contributionOnAxis(gridPos.x);
  float y=contributionOnAxis(gridPos.y);
  float z=contributionOnAxis(gridPos.z);
  vec3 normal=normalize(vNormal);
  float grid=clamp(x+y+z, 0., 1.);
  vec3 color=mix(mainColor, lineColor, grid);
  float opacity = clamp(grid, 0.2, gridControl.w*grid);
  gl_FragColor=vec4(color.rgb, opacity);
  float fogDistance = length(vPosition);
  float fogAmount = smoothstep(8., 5., fogDistance);
  gl_FragColor =vec4(color.rgb  - vec3(.2)*v, fogAmount);
}

