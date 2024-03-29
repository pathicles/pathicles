precision mediump float;
varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec3 vColor;
varying vec2 vUv;
uniform float ambientLightAmount;
uniform float diffuseLightAmount;
uniform vec3 shadowDirection;
uniform float pathicleWidth;
uniform vec3 eye;
varying vec3 vScale;

#pragma glslify: edger = require("@pathicles/core/src/lib/shaders/edger.glsl");

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


  #ifdef lighting

  if (vColor.r == vColor.g && vColor.r == vColor.b ) discard;
  vec3 color = vColor;
  gl_FragColor = vec4(vColor, 1.);


  vec3 viewDir = normalize(eye - vPosition.xyz);
  vec3 normal = normalize(vNormal);

  directionalLights[0] = DirectionalLight(shadowDirection, vec3(1.), .5);
  directionalLights[1] = DirectionalLight(shadowDirection+vec3(-1., 0., 1.), vec3(1.), .1);
  directionalLights[2] = DirectionalLight(shadowDirection+vec3(1., 0., -1.), vec3(1.), .1);
  vec3 edgedColor = vColor;
  vec3 finalColor = ambientLightAmount * vColor;

  for (int i = 0; i < NUM_DIR_LIGHTS; ++i)
  {
    DirectionalLight light = directionalLights[i];
    vec3 sceneLight = mix(light.color, edgedColor.rgb + light.color * 0.5, 0.5);
    float diffAmt = diffuse(light.direction, normal) * light.intensity;
    float specAmt = specular(light.direction, viewDir, normal, 0.0) * light.intensity;

    float shadow = 1.; //.9 * vColorCorrection;//clamp(vColorCorrection + abs(2.+v_position.y*5.), 0., 1.);
    float specMask = .5*edger(vUv, vScale, 1. * .02, vNormalOrig);
//    float specMask = edger(vUv, vScale, 1. * .1, vNormalOrig) * smoothstep(5., 2., length(vPosition-eye));
    vec3 specCol = specMask * sceneLight * specAmt;
    finalColor += shadow * vColor * diffAmt * light.color;
    finalColor += shadow * specCol * sceneLight;
  }


  gl_FragColor =vec4(finalColor, 1.);
  #endif

}
