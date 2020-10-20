precision highp float;
#extension GL_OES_standard_derivatives : enable
#define texelSize 1.0 / float(1024)

varying vec3 vNormal;
varying vec2 vUv;
uniform vec3 eye;
varying vec3 vPosition;
varying vec3 vShadowCoord;


varying vec3 vScale;
uniform float ambientLightAmount;
uniform float diffuseLightAmount;
uniform vec3 color;

uniform vec3 shadowDirection;
uniform sampler2D shadowMap;
uniform float minBias;
uniform float maxBias;






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




float edger(vec2 uv, vec3 boxScale, float edgeWidth) {

  float edgeXY =  smoothstep(0., edgeWidth, uv.x*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.z);
  float edgeXZ =  smoothstep(0., edgeWidth, uv.y*boxScale.y) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.y);
  float edgeX = (1.-(edgeXY*edgeXZ))*abs(vNormal.x);

  float edgeYX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);
  float edgeYZ =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);
  float edgeY = (1.-(edgeYX*edgeYZ))*abs(vNormal.y);

  float edgeZX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);
  float edgeZY =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);
  float edgeZ = (1.-(edgeZX*edgeZY))*abs(vNormal.z);

  return clamp(pow(edgeX+edgeY+edgeZ, 1.), 0., 1.);
}


void main () {

  vec3 edgedColor = color + edger(vUv, vScale, .01);

  vec3 lightDir = normalize(shadowDirection - vPosition);
  float cosTheta = dot(vNormal, lightDir);

  vec3 ambient = ambientLightAmount * edgedColor;
  vec3 diffuse = diffuseLightAmount * edgedColor * clamp(cosTheta, 0.0, 1.0);
  float visibility = 1.0;

#ifdef lighting

  float v = 1.0; // shadow value
  vec2 co = vShadowCoord.xy * 0.5 + 0.5;// go from range [-1,+1] to range [0,+1]
  // counteract shadow acne.
  float bias = max(maxBias * (1.0 - cosTheta), minBias);
  float v0 = shadowSample(co + texelSize * vec2(0.0, 0.0), vShadowCoord.z, bias);
  float v1 = shadowSample(co + texelSize * vec2(1.0, 0.0), vShadowCoord.z, bias);
  float v2 = shadowSample(co + texelSize * vec2(0.0, 1.0), vShadowCoord.z, bias);
  float v3 = shadowSample(co + texelSize * vec2(1.0, 1.0), vShadowCoord.z, bias);
  // PCF filtering
  v = (v0 + v1 + v2 + v3) * (1.0 / 4.0);
  // if outside light frustum, render now shadow.
  // If WebGL had GL_CLAMP_TO_BORDER we would not have to do this,
  // but that is unfortunately not the case...
  if(co.x < 0.0 || co.x > 1.0 || co.y < 0.0 || co.y > 1.0) {
    v = 1.0;
  }


  gl_FragColor = vec4(ambient + v * diffuse, 1.);

#endif


#ifdef shadow
  gl_FragColor = vec4(vec3(vPosition.y), 1.0);
#endif


}
