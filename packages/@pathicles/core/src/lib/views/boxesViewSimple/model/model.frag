precision highp float;
//#extension GL_OES_standard_derivatives : enable

varying float v_visibility;
varying vec3 v_position;
varying vec3 vScale;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec2 vUv;
varying vec4 vAmbientColor;
varying vec3 vColor;
varying float vColorCorrection;
varying vec4 v_lightNDC;

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

#pragma glslify: edger = require("@pathicles/core/src/lib/shaders/edger.glsl");

vec4 packRGBA (float v) {
  vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v);
  pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;
  return pack;
}

float unpackRGBA (vec4 v) {
  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
}

float shadowValue() {
  vec3 tex = texture2D(shadowMap, vUv).rgb;

  vec3 lightPos = v_lightNDC.xyz / v_lightNDC.w;

  float bias = 0.001;
  float depth = lightPos.z - bias;
  float occluder = unpackRGBA(texture2D(shadowMap, lightPos.xy));

  // Compare actual depth from light to the occluded depth rendered in the depth map
  // If the occluded depth is smaller, we must be in shadow
  return mix(0.2, 1.0, step(depth, occluder));

}




float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}


float diffuse(vec3 lightDir, vec3 nrm)
{
  float diffAmt = max(0.0, dot(nrm, lightDir));
  return diffAmt;
}
float specular(vec3 lightDir, vec3 viewDir, vec3 nrm, float shininess)
{
  vec3 halfVec = normalize(viewDir + lightDir);
  float specAmt = max(0.0, dot(halfVec, nrm));
  return pow(specAmt, shininess);
}


struct DirectionalLight
{
  vec3 direction;
  vec3 color;
  float intensity;
};
#define NUM_DIR_LIGHTS 3
DirectionalLight directionalLights[NUM_DIR_LIGHTS];

void main () {

    if (v_visibility < .9) discard;

  #ifdef lighting

  vec3 viewDir = normalize(eye - v_position);
  vec3 normal = normalize(vNormal);

  directionalLights[0] = DirectionalLight(shadowDirection, vec3(1.), .15);
  directionalLights[1] = DirectionalLight(shadowDirection+vec3(-5., 0., 5.), vec3(1.), .15);
  directionalLights[2] = DirectionalLight(shadowDirection+vec3(5., 0., -5.), vec3(1.), .15);
  vec3 edgedColor = vColor;
  vec3 finalColor = ambientLightAmount * vColor;

  for (int i = 0; i < NUM_DIR_LIGHTS; ++i)
  {
    DirectionalLight light = directionalLights[i];
    vec3 sceneLight = mix(light.color, edgedColor.rgb + light.color * 0.5, 0.5);
    float diffAmt = diffuse(light.direction, normal) * light.intensity;
    float specAmt = specular(light.direction, viewDir, normal, 0.0) * light.intensity;

    float shadow = .9 * vColorCorrection;//clamp(vColorCorrection + abs(2.+v_position.y*5.), 0., 1.);
    float specMask = edger(vUv, vScale, 1. * pathicleWidth, vNormalOrig) * smoothstep(5., 2., length(v_position-eye));
    vec3 specCol = specMask * sceneLight * specAmt;
    finalColor += shadow * vColor * diffAmt * light.color;
    finalColor += shadow * specCol * sceneLight;
  }


  gl_FragColor =vec4(finalColor, 1.); //map(v_visibility, 0.5, 1., 0.75, .9));

  #endif// lighting
  #ifdef shadow

  gl_FragColor = packRGBA(vShadowCoord.z );
  #endif


}


