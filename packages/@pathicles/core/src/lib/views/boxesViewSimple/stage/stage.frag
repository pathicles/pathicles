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

float unpackRGBA (vec4 v) {
  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
}

// Can go down to 10 or so, and still be usable, probably...
#define ITERATIONS 5

// Set this to 0.0 to stop the pixel movement.
#define TIME iTime

#define TAU  6.28318530718

//-------------------------------------------------------------------------------------------
// Use last part of hash function to generate new random radius and angle...
vec2 Sample(inout vec2 r)
{
  r = fract(r * vec2(33.3983, 43.4427));
  return r-.5;
  //return sqrt(r.x+.001) * vec2(sin(r.y * TAU), cos(r.y * TAU))*.5; // <<=== circular sampling.
}

  //-------------------------------------------------------------------------------------------
  #define HASHSCALE 443.8975
vec2 Hash22(vec2 p)
{
  vec3 p3 = fract(vec3(p.xyx) * HASHSCALE);
  p3 += dot(p3, p3.yzx+19.19);
  return fract(vec2((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y));
}

//-------------------------------------------------------------------------------------------
vec3 Blur(sampler2D tex, vec2 uv, float radius)
{
  radius = radius * .04;

  vec2 circle = vec2(radius); // * vec2((iResolution.y / iResolution.x), 1.0);

  // Remove the time reference to prevent random jittering if you don't like it.
  vec2 random = Hash22(uv);

  // Do the blur here...
  vec3 acc = vec3(0.0);
  for (int i = 0; i < ITERATIONS; i++) {
    acc += texture2D(tex, uv+ circle * Sample(random), radius*1.0).xyz;
  }
  return acc / float(ITERATIONS);
}


float fBlur(sampler2D tex, vec2 uv, float radius)
{
  radius = radius * .04;

  vec2 circle = vec2(radius); // * vec2((iResolution.y / iResolution.x), 1.0);

  // Remove the time reference to prevent random jittering if you don't like it.
  vec2 random = Hash22(uv);

  // Do the blur here...
  float acc = 0.;
  for (int i = 0; i < ITERATIONS; i++) {
    acc += unpackRGBA(texture2D(tex, uv+ circle * Sample(random), radius*1.0));
  }
  return acc / float(ITERATIONS);
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

  float shadowAcneRemover = 1.7;

  float amountInLight = 0.0;

  //  amountInLight = (blur13(shadowMap, fragmentDepth.xy, vec2(1024, 1024), vec2(.1, 5.)) - vShadowCoord.z > .001) ? 1. : 0.;
//  amountInLight = decodeFloat(texture2D(shadowMap, vShadowCoord.xy));
  amountInLight = Blur(shadowMap, vShadowCoord.xy, .1).r * 2.;
  amountInLight = 1.-fBlur(shadowMap, vShadowCoord.xy, .1) * 1.;


  float gridRatio=gridControl.x;
  vec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;
  float x=contributionOnAxis(gridPos.x);
  float y=contributionOnAxis(gridPos.y);
  float z=contributionOnAxis(gridPos.z);
  vec3 normal=normalize(vNormal);
  float grid=clamp(x+y+z, 0., 1.);

  vec3 color=mix(mainColor, lineColor, grid);
  float opacity = clamp(grid, 0.2, gridControl.w*grid)*.5;
  float fogDistance = length(vPosition);
  float fogAmount = smoothstep(stageSize/2.*1., stageSize/2.*.5, fogDistance);

  gl_FragColor =vec4(color.rgb, fogAmount*opacity)
    + vec4(vec3(-.5*amountInLight), 1.);

}

