precision mediump float;
#define LOG2 -1.442695/10.
#define FOG_DENSITY .05
#define FOG_OFFSET 0.

#define FOG_START 10.
#define FOG_END 40.

#pragma glslify: lambert = require(glsl-diffuse-lambert)
#pragma glslify: hemisphere = require(glsl-hemisphere-light)

float fogFactorExp2(
  const float dist,
  const float density
) {
  float d = density * dist;
  return 1.0 - clamp(exp2((d)  * LOG2), 0.0, 1.0);
}

float fog_linear(
  const float dist,
  const float start,
  const float end) {
  return 1.-clamp((end-dist)/(end-start),0.,1.);
}

struct Light{
  vec3 color;
  vec3 direction;
  vec3 position;
};

uniform sampler2D diffuseBuffer,depthNormalBuffer,positionBuffer;
uniform sampler2D ssaoBuffer;
//uniform samplerCube shadowBufferCube;
uniform vec3 eye;
uniform vec3 ambient;
uniform vec3 referencePoint;
uniform vec3 pointLightPosition;
uniform Light lights[3];
uniform float ssaoPower,exposure,roughness,fresnel,diffuse,specular,ssaoEnabled,isShadowEnabled,rgbGamma;
varying vec2 uv;

//float calculateShadow(vec3 position){
//
////  return 1.-isShadowEnabled;
//
//
//  vec3 lightDirection = normalize(position-lights[0].position);
//  float lightDistance = distance(position,lights[0].position);
//  float shadow=0.;
//  float epsilon= 3.5;
//
//  float sampledDistance = textureCube(shadowBufferCube,lightDirection).x;
//  shadow = lightDistance < sampledDistance + epsilon  ? 1. : 0.;
//
////      for (int x = 0; x < 2; x++) {
////          for (int y = 0; y < 2; y++) {
////              for (int z = 0; z < 2; z++) {
////                  float bias = 5.;
////                  vec4 env = textureCube(shadowBufferCube, texCoord + vec3(x,y,z) * vec3(0.01) );
////                  shadow += (env.x+bias) < (distance(position, lights[0].position)) ? 0.0 : 1.0;
////              }
////          }
////      }
////      shadow *= 1./8.;
//  return shadow;
//
//}

void main(){
  vec4 materialColor=texture2D(diffuseBuffer,uv);
  vec3 position=texture2D(positionBuffer,uv).xyz;
  vec3 normal=texture2D(depthNormalBuffer,uv).yzw;
  float depth=texture2D(depthNormalBuffer,uv).w;
  vec3 viewDir=normalize(eye-position);
  float ssao = (ssaoEnabled==0. || length(position)>400.)
   ? 1.
   : pow(texture2D(ssaoBuffer,uv).x,ssaoPower);
  float spec=specular*materialColor.w;
  vec3 light0Dir=normalize(lights[0].position-position);
  light0Dir=normalize(vec3(1., 0., 0.));
  vec3 light1Dir=normalize(vec3(-1., 1., 0.));

  vec3 diffuseColor =
    diffuse * lights[0].color * lambert(lights[0].direction, normal) +
    diffuse * lights[1].color * lambert(lights[1].direction, normal);


  vec3 ambientColor = (length(ambient) * materialColor).rgb;

  //  float shadow = isShadowEnabled * calculateShadow(position);

  vec3 lighting = ssao * (ambientColor + materialColor.rgb * diffuseColor);

  lighting=pow(lighting,vec3(1./rgbGamma));
  if(length(materialColor.xyz)>.9999){lighting=vec3(1.,1.,1.);}

  gl_FragColor=vec4(lighting,1.);

  float fogDistance=length(eye-position);
  float fogAmount=fog_linear(fogDistance,FOG_START,FOG_END);//1.-exp2(-fogDensity*fogDistance*LOG2);
//  float fogAmount=fogFactorExp2(fogDistance,FOG_DENSITY);//1.-exp2(-fogDensity*fogDistance*LOG2);

  gl_FragColor=mix(vec4(lighting,1),vec4(1,1.,1., 1.),fogAmount);

}

