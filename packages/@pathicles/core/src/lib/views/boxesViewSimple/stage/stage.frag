precision highp float;
#extension GL_OES_standard_derivatives : enable

#define SQRT2 1.41421356
#define PI 3.14159


uniform vec3 shadowDirection;
uniform sampler2D shadowMap;
uniform float minBias;
uniform float maxBias;
uniform float stageSize;

varying vec3 vShadowCoord;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

#pragma glslify: decodeFloat = require("@pathicles/core/src/lib/shaders/decodeFloat.glsl");


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

  float shadowAcneRemover = 1.7;

  float amountInLight = 0.0;

  //  amountInLight = (blur13(shadowMap, fragmentDepth.xy, vec2(1024, 1024), vec2(.1, 5.)) - vShadowCoord.z > .001) ? 1. : 0.;
  amountInLight = decodeFloat(texture2D(shadowMap, vShadowCoord.xy));
  amountInLight = texture2D(shadowMap, vShadowCoord.xy).r;


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
  float fogAmount = smoothstep(stageSize/2.*1.25, stageSize/2.*.5, fogDistance);

  gl_FragColor =vec4(color.rgb, fogAmount*opacity)
    + vec4(vec3(-.1*amountInLight), fogAmount);

//  gl_FragColor = vec4(vec3(texture2D(shadowMap, vShadowCoord.xy).r), 1.);

}

