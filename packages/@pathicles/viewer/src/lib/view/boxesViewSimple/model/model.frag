#extension GL_OES_standard_derivatives : enable
precision highp float;

varying float toBeDiscarded;
varying vec3 vPosition;
varying vec3 vScale;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec2 vUv;
varying vec4 vAmbientColor;
varying vec4 vDiffuseColor;
varying float vColorCorrection;

uniform vec3 lightPosition;
uniform float ambientIntensity;
uniform float stageGrid_size;
uniform float pathicleWidth;
uniform vec3 eye;
uniform vec2 uResolution;



#ifdef lighting
varying vec4 vLightNDC;
uniform samplerCube cubeShadow;
uniform sampler2D shadowMap;
#endif


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
  #ifdef shadow
  gl_FragColor = vec4(vDiffuseColor.rgb, .2/vPosition.z/vPosition.z);//vec4(lightingColor,
  #endif



  #ifdef cubeShadow
  gl_FragColor = packRGBA(gl_FragCoord.z);
  #endif


  #ifdef shadowMap
  gl_FragColor = packRGBA(gl_FragCoord.z) + vec4(0.1);
  #endif



  #ifdef wireframe
  float opacity = 1. - grid(b, .5);
  gl_FragColor = vec4(1., 1., 1., .5*opacity);
  #endif


  #ifdef lighting


  float ambientLightAmount = .75;
  float diffuseLightAmount = .5;

  // set the specular term to black
  vec4 spec = vec4(0.0);


  // normalize both input vectors
  vec3 n = normalize(vNormal);
  vec3 e = normalize(eye);
  vec3 lightDirection = normalize(lightPosition);

  vec4 specular = vec4(1.);
  float shininess = .5;

  float intensity = max(dot(n, lightDirection), 1.0);
  if (intensity > 0.0) {
    // compute the half vector
    vec3 h = normalize(lightDirection + e);
    // compute the specular term into spec
    float intSpec = max(dot(h, n), 0.0);
    spec = specular * pow(intSpec, shininess);
  }

  vec4 color;

  //  color = (1. - vColorCorrection)  * max(intensity * vDiffuseColor + 0.*spec, vAmbientColor);


  color  = (1. - 1. * vColorCorrection) * (1.*vDiffuseColor + 0.*vAmbientColor);

  //  color = .5 * (1. - vColorCorrection) * vDiffuseColor + vAmbientColor;
  //  vec3 ambient = ambientLightAmount * vDiffuseColor;
  //  vec3 diffuse = diffuseLightAmount * vDiffuseColor * clamp(dot(vNormal, normalize(vec3(10., 10., 10.))) , 0.0, 1.0 ) +
  //                  diffuseLightAmount * vDiffuseColor * clamp(dot(vNormal, normalize(vec3(-10., 10., -10.))) , 0.0, 1.0 ) ;
  //
  /*  float cosTheta2 = clamp(1. - 1. * cos(length(vPosition*20.)) , .9, 1.1 );
    vec3 diffuse2 = 0.02 * vec3(1.) * clamp(cosTheta2 , 0.0, 1.0 ) ;
    vec4 combinedDiffuse = clamp(vDiffuseColor * cosTheta2 , vec4(0.), vec4(1.));*/
  //
  //
  ////  gl_FragColor =  vec4(pow( (1. - vColorCorrection) * (combinedDiffuse +  ambient), vec3(1.0/gamma)), 1.); //vec4(lightingColor, opacity);

  //color = (1. - 1.* vColorCorrection) * ( vDiffuseColor);


  vec3 lightPos = vLightNDC.xyz / vLightNDC.w;

  float bias = 0.001;
  float depth = lightPos.z - bias;
  float occluder = unpackRGBA(texture2D(shadowMap, lightPos.xy));

  // Compare actual depth from light to the occluded depth rendered in the depth map
  // If the occluded depth is smaller, we must be in shadow
  float shadow = mix(0.2, 1.0, step(depth, occluder));

  //
  //  vec3 texCoord = (vPosition - lightPosition);
  //  float visibility = 0.0;
  //   //do soft shadows:
  //  for (int x = 0; x < 2; x++) {
  //    for (int y = 0; y < 2; y++) {
  //      for (int z = 0; z < 2; z++) {
  //        float bias = 0.3;
  ////        vec4 env = textureCube(cubeShadow, texCoord + vec3(x,y,z) * vec3(0.1));
  //        vec3 lightPos = vLightNDC.xyz / vLightNDC.w;
  //        float depth = lightPos.z - bias;
  //
  //        float occluder = unpackRGBA(texture2D(shadowMap,texCoord));
  //
  //        float shadow = mix(0.2, 1.0, step(depth, occluder));
  //        visibility += shadow; //(env.x+bias) < (distance(vPosition, lightPos)) ? 0.0 : 1.0;
  //      }
  //    }
  //  }
  //  visibility *= 1.0 / 8.0;
  //
  //  visibility = 1.0;

  shadow = 1.;
  vec4 shadowedColor = shadow * (color + vec4(edger(vUv, vScale, pathicleWidth) * vec3(.2), 1.));

  const float FOG_DENSITY = .9;
  const vec4 FOG_COLOR = vec4(1.0, 1.0, 1.0, .5);
  float fogDistance = length(vPosition);
  float fogAmount = fogDistance > 9. ? fog_exp2(fogDistance - 9., FOG_DENSITY) : 0.;

  vec4 faggedColor = mix(shadowedColor, FOG_COLOR, fogAmount);

  gl_FragColor = vec4(faggedColor.rgb, 1.-fogAmount);




  #endif// lighting

}


