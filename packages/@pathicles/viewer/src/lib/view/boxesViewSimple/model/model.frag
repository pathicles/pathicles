precision highp float;

varying float toBeDiscarded;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec2 vUv;
varying vec3 vAmbientColor;
varying vec3 vDiffuseColor;
varying float vColorCorrection;

uniform vec3 lightPosition;
uniform float ambientIntensity;
uniform float stageGrid_size;
uniform vec3 eye;



#ifdef lighting
varying vec4 vLightNDC;
uniform samplerCube cubeShadow;
#endif


#define FOG_DENSITY 0.01
#pragma glslify: fog_exp2 = require(glsl-fog/exp2)

const vec4 fogColor = vec4(1.0);


vec4 packRGBA (float v) {
  vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v);
  pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;
  return pack;
}
float unpackRGBA (vec4 v) {
  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
}



void main () {

  if (toBeDiscarded > .0) discard;

  //if (length(vPosition.z) > stageGrid_size/2. - .5) discard;
//  vec3 hemisphereColor = hemisphere_light(vNormal, vec3(2., 2., 2.), vec3(.5,.5,.5), vec3(0.,1.,0.));

//  vec3 materialColor = (1. + vColorCorrection) * vDiffuseColor;
//  vec3 ambientColor = (ambientIntensity * vec3(1., 1., 1.) * materialColor).rgb;
//  vec3 lightingColor = 3. * ambientColor;

  float opacity = 1.;
  #ifdef shadow
  gl_FragColor = vec4(vDiffuseColor, .2/vPosition.z/vPosition.z); //vec4(lightingColor,
  #endif



#ifdef cubeShadow
   gl_FragColor = packRGBA(gl_FragCoord.z);
#endif


#ifdef shadowMap
  gl_FragColor = packRGBA(gl_FragCoord.z);
#endif



#ifdef lighting

  float ambientLightAmount = .5;
  float diffuseLightAmount = .5;


  vec3 ambient = ambientLightAmount * vDiffuseColor;
  vec3 diffuse = diffuseLightAmount * vDiffuseColor * clamp(dot(vNormal, normalize(vec3(10., 10., 10.))) , 0.0, 1.0 ) +
                  diffuseLightAmount * vDiffuseColor * clamp(dot(vNormal, normalize(vec3(-10., 10., -10.))) , 0.0, 1.0 ) ;

  float cosTheta2 = clamp(1. - 1. * cos(length(vPosition)) , .5, 2. );
//  vec3 diffuse2 = 0.01 * vec3(1.) * clamp(cosTheta2 , 0.0, 1.0 ) ;
  vec3 combinedDiffuse = clamp(diffuse * cosTheta2 , vec3(0.), vec3(1.));


//  gl_FragColor =  vec4(pow( (1. - vColorCorrection) * (combinedDiffuse +  ambient), vec3(1.0/gamma)), 1.); //vec4(lightingColor, opacity);



  vec3 texCoord = (vPosition - lightPosition);
  float visibility = 0.0;
   //do soft shadows:
  for (int x = 0; x < 2; x++) {
    for (int y = 0; y < 2; y++) {
      for (int z = 0; z < 2; z++) {
        float bias = 0.3;
        vec4 env = textureCube(cubeShadow, texCoord + vec3(x,y,z) * vec3(0.1));
        vec3 lightPos = vLightNDC.xyz / vLightNDC.w;
        float depth = lightPos.z - bias;
        float occluder = unpackRGBA(textureCube(cubeShadow, texCoord + vec3(x,y,z) * vec3(0.1)));

        float shadow = mix(0.2, 1.0, step(depth, occluder));
        visibility += shadow; //(env.x+bias) < (distance(vPosition, lightPos)) ? 0.0 : 1.0;
      }
    }
  }
  visibility *= 1.0 / 8.0;

  visibility = 1.0;

  vec4 shadowedColor = vec4(visibility * (1. - 1.* vColorCorrection) * ( combinedDiffuse + ambient), 1.0);


  float fogDistance = length(eye - vPosition);
  float fogAmount = fog_exp2(fogDistance, FOG_DENSITY);

  gl_FragColor = mix(shadowedColor, fogColor, fogAmount);

#endif  // lighting

}


