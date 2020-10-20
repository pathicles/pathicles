#extension GL_OES_standard_derivatives : enable
precision highp float;

#pragma glslify: fog_exp2 = require(glsl-fog/exp2)
#define texelSize 1.0 / float(2048)

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

uniform float pathicleWidth;
uniform vec3 eye;
uniform vec2 uResolution;

varying vec3 vShadowCoord;
uniform vec3 shadowDirection;
uniform sampler2D shadowMap;
uniform float minBias;
uniform float maxBias;



vec4 packRGBA (float v) {
  vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v / 10.);
  pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;
  return pack;
}
float unpackRGBA (vec4 v) {
  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0))*10. ;
}

float edger(vec2 uv, vec3 boxScale, float edgeWidth) {

  float edgeXY =  smoothstep(0., edgeWidth, uv.x*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.z);
  float edgeXZ =  smoothstep(0., edgeWidth, uv.y*boxScale.y) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.y);
  float edgeX = (1.-(edgeXY*edgeXZ))*abs(vNormalOrig.x);

  float edgeYX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);
  float edgeYZ =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);
  float edgeY = (1.-(edgeYX*edgeYZ))*abs(vNormalOrig.y);

  float edgeZX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);
  float edgeZY =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);
  float edgeZ = (1.-(edgeZX*edgeZY))*abs(vNormalOrig.z);

  return clamp(edgeX, 0., 1.);
}

float edgerFeathered(vec2 uv, vec3 boxScale, float edgeWidth) {

  float feather = .1;

  float edgeXY =  smoothstep(edgeWidth, edgeWidth+feather, uv.x*boxScale.z) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.x)*boxScale.z);
  float edgeXZ =  smoothstep(edgeWidth, edgeWidth+feather, uv.y*boxScale.y) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.y)*boxScale.y);
  float edgeX = (1.-(edgeXY*edgeXZ))*abs(vNormalOrig.x);

  return clamp(edgeX, 0., 1.);
}


float edgerHard(vec2 uv, vec3 boxScale, float edgeWidth) {
  float edgeXY =  step(edgeWidth*(1.+uv.x*boxScale.z), uv.x*boxScale.z) * step(edgeWidth, (1.-uv.x)*boxScale.z);
  float edgeXZ =  step(edgeWidth*(0.5+uv.x/2.), uv.y*boxScale.y) * step(edgeWidth*(0.5+uv.x/2.), (1.-uv.y)*boxScale.y);
  float edgeX = (1.-(edgeXZ))*abs(vNormalOrig.x);

  return clamp(edgeX, 0., 1.);
}



float shadowSample(vec2 co, float z, float bias) {
  float a = unpackRGBA(texture2D(shadowMap, co));
  float b = z;
  return step(b-bias, a);
}




void main () {

  if (toBeDiscarded > .0) discard;



#ifdef lighting

  vec3 edgedColor = vColor.rgb;

  vec3 lightDir = normalize(shadowDirection - 0.*vPosition);
  float cosTheta = dot(vNormal, shadowDirection);

  vec3 ambient = ambientLightAmount * edgedColor;
  vec3 diffuse = diffuseLightAmount * edgedColor * clamp(cosTheta, 0.0, 1.0);



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
//  v = 1.0;
  v = vColorCorrection;

//  vec4 shadowedColor = shadow * color + color * vec4(edger(vUv, vScale,   mix(2.* pathicleWidth , 0.* pathicleWidth, smoothstep(0., 1., length(vPosition-eye)))) * vec3(.8), 1.);
//  vec3 color = vec3(ambient + v * diffuse) + mix(5., 1., length(vPosition-eye)) * edger(vUv, vScale, 2. * pathicleWidth) * vec3(.5);
  vec3 color = vec3(vColorCorrection * ambient + v * diffuse) + edger(vUv, vScale, .5*pathicleWidth)  * vec3(.75 * smoothstep(10., 0., length(vPosition-eye)));
  //  const float FOG_DENSITY = .9;
  //  const vec4 FOG_COLOR = vec4(1.0, 1.0, 1.0, .8);
    float fogDistance = length(vPosition);
    float fogAmount = smoothstep(8., 7., fogDistance);
    gl_FragColor =vec4(color.rgb, fogAmount);
//    gl_FragColor =vec4(color, 1.);


#endif// lighting



#ifdef shadow
  gl_FragColor = vec4(vec3(vPosition.y), 1.0);

//  gl_FragColor = packRGBA(vShadowCoord.x);
  gl_FragColor = packRGBA(gl_FragCoord.z);
#endif



}


