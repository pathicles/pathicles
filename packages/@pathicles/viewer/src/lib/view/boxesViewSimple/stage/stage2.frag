#define TRANSPARENT
#extension GL_OES_standard_derivatives : enable


#define SQRT2 1.41421356
#define PI 3.14159
precision highp float;
vec3 mainColor = vec3(.2,.5,.5);
vec3 lineColor = vec3(.5,.5,.5);
vec4 gridControl = vec4(1., .1, 1., 1.);
vec3 gridOffset = vec3(0.,0.,0.);
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
  const float maxNumberOfLines=10.0;
  return clamp(1.0/(differentialLength+1.0)-1.0/maxNumberOfLines, 0.0, 1.0);
}
float isPointOnLine(float position, float differentialLength) {
  float fractionPartOfPosition=position-floor(position+0.5);
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
  float gridRatio=gridControl.x;
  vec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;
  float x=contributionOnAxis(gridPos.x);
  float y=contributionOnAxis(gridPos.y);
  float z=contributionOnAxis(gridPos.z);
  vec3 normal=normalize(vNormal);
  x*=normalImpactOnAxis(normal.x);
  y*=normalImpactOnAxis(normal.y);
  z*=normalImpactOnAxis(normal.z);
  float grid=clamp(x+y+z, 0., 1.);
  vec3 color=mix(mainColor, lineColor, grid);
  float opacity=1.0;
  opacity=clamp(grid, 0.08, gridControl.w*grid);
  gl_FragColor=vec4(color.rgb, opacity);
}

