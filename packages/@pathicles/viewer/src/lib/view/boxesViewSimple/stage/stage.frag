precision highp float;
#extension GL_OES_standard_derivatives : enable

#define SQRT2 1.41421356
#define PI 3.14159


uniform vec3 shadowDirection;
uniform sampler2D shadowMap;
uniform float minBias;
uniform float maxBias;

varying vec3 vShadowCoord;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

#pragma glslify: encodeFloat = require("@pathicles/core/src/lib/shaders/encodeFloat.glsl");
#pragma glslify: decodeFloat = require("@pathicles/core/src/lib/shaders/decodeFloat.glsl");



float blur13(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec2 off1 = vec2(1.411764705882353) * direction;
  vec2 off2 = vec2(3.2941176470588234) * direction;
  vec2 off3 = vec2(5.176470588235294) * direction;

  float f = 0.;
  f += decodeFloat(texture2D(image, uv) * 0.1964825501511404);
  f += decodeFloat(texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344);
  f += decodeFloat(texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344);
  f += decodeFloat(texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732);
  f += decodeFloat(texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732);
  f += decodeFloat(texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057);
  f += decodeFloat(texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057);
  return f;
}

vec3 mainColor = vec3(1.);
vec3 lineColor = vec3(.7);
vec4 gridControl = vec4(.1, 10., .5, .99);
vec3 gridOffset = vec3(0., 0., 0.);
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

  vec3 fragmentDepth = vShadowCoord.xyz;
  float shadowAcneRemover = 0.07;
  fragmentDepth.z -= shadowAcneRemover;

  float amountInLight = 0.0;

  amountInLight = blur13(shadowMap, fragmentDepth.xy, vec2(1024, 1024), vec2(.1, 5.));

  if (fragmentDepth.x < 0. || fragmentDepth.x > 1.0 || fragmentDepth.y < 0. || fragmentDepth.y > 1.0) {
    amountInLight = 0.;
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
  float fogDistance = length(vPosition);
  float fogAmount = smoothstep(10., 8., fogDistance);

  gl_FragColor =vec4(color.rgb, fogAmount*opacity) + vec4(vec3(-.2*amountInLight), fogAmount);

}

