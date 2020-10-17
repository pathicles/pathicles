precision mediump float;
#extension GL_OES_standard_derivatives : enable


varying vec3 vNormal;
varying vec2 vUv;
uniform vec3 eye;
varying vec3 vPosition;

varying vec3 vScale;
uniform float ambientLightAmount;
uniform float diffuseLightAmount;
uniform vec3 color;
uniform vec3 lightPosition;
uniform samplerCube shadowCube;



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





  //  vec3 color = vec3(0.92, 0.75, 0.0)
  //  + edger(vUv, vScale, .02) * vec3(.6);

  vec3 edgedColor = color + edger(vUv, vScale, .01);

  vec3 lightDir = normalize(lightPosition - vPosition);
  vec3 ambient = ambientLightAmount * edgedColor;
  float cosTheta = dot(vNormal, lightDir);
  vec3 diffuse = diffuseLightAmount * edgedColor * clamp(cosTheta, 0.0, 1.0);
  float visibility = 1.0;
#ifdef lighting
  visibility = .0;
  // do soft shadows:

  vec3 texCoord = (vPosition - lightPosition);

  for (int x = 0; x < 2; x++) {
    for (int y = 0; y < 2; y++) {
      for (int z = 0; z < 2; z++) {
        float bias = 0.1;
        vec4 env = textureCube(shadowCube, texCoord + vec3(x,y,z) * vec3(0.1) );
        visibility += (env.x+bias) < (distance(vPosition, lightPosition)) ? 0.0 : 1.0;
      }
    }
  }
  visibility *= 1.0 / 8.0;
  //visibility = 1.;


  //  gl_FragColor = vec4((ambient * visibility + diffuse), 1.0);

  gl_FragColor = vec4(ambient + visibility * diffuse, 1.);

#endif


#ifdef cubeShadow
  //  gl_FragColor = packRGBA(gl_FragCoord.z);

//  gl_FragColor = vec4(ambient * visibility + diffuse, 0.);
  gl_FragColor = vec4(vec3(distance(vPosition, lightPosition)), 0.);
//  gl_FragColor = vec4(vec3(distance(vPosition, lightPosition)), 1.);
//  gl_FragColor = vec4(vec3(1, 0., 0.), .5);
//  gl_FragColor = vec4(ambient * visibility + diffuse, 1.);
//  gl_FragColor = vec4(1.0, 0.0, 1., .5);
#endif



}
