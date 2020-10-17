precision highp float;
#define TRANSPARENT
#extension GL_OES_standard_derivatives : enable


#pragma glslify: fog_exp2 = require(glsl-fog/exp2)

//varying vec4 vLightNDC;
uniform samplerCube cubeShadow;
//uniform sampler2D shadowMap;

varying float fogAmount;

#define SQRT2 1.41421356
#define PI 3.14159


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

//  vec3 lightPos = vLightNDC.xyz / vLightNDC.w;

//  float bias = 0.0001;
//  float depth = lightPos.z - bias;
//  float occluder = unpackRGBA(texture2D(shadowMap, lightPos.xy));
//
//  // Compare actual depth from light to the occluded depth rendered in the depth map
//  // If the occluded depth is smaller, we must be in shadow
//  float shadow = mix(.5, 1., step(depth, occluder));




  float gridRatio=gridControl.x;
  vec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;
  float x=contributionOnAxis(gridPos.x);
  float y=contributionOnAxis(gridPos.y);
  float z=contributionOnAxis(gridPos.z);
  vec3 normal=normalize(vNormal);
  //  x*=normalImpactOnAxis(normal.x);
  //  y*=normalImpactOnAxis(normal.y);
  //  z*=normalImpactOnAxis(normal.z);
  float grid=clamp(x+y+z, 0., 1.);
  vec3 color=mix(mainColor, lineColor, grid);
  float opacity = clamp(grid, 0.2, gridControl.w*grid) * fogAmount;
  gl_FragColor=vec4(color.rgb, opacity);
//  gl_FragColor=vec4(vec3(1.) * shadow, 1.);
}

