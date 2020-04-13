precision highp float;

varying float toBeDiscarded;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vAmbientColor;
varying vec3 vDiffuseColor;
varying float vColorCorrection;

uniform float ambientIntensity;
uniform float stageGrid_size;
uniform vec3 eye;

//float gridFactor (vec2 parameter, float width) {
//  vec2 l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
//  vec2 a2 = smoothstep(width - 0.05, width + 0.05, l);
//  return min(a2.x, a2.y);
//}
//
//float grid(vec2 st, float res, float width) {
//  vec2 grid =  fract(st*res) / width;
//  grid /= fwidth(st);
//  return 1. - (step(res, grid.x) * step(res, grid.y));
//}

float gridFactor (vec2 parameter, float width, float feather) {
  vec2 l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  vec2 a2 = smoothstep(width - feather, width + feather, l);
  return min(a2.x, a2.y);
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
  gl_FragColor = vec4(0.6, 0.6, 0.6, .5);
  #endif
  #ifdef lighting


  gl_FragColor =  vec4(  (1. - vColorCorrection) * vDiffuseColor + .1 * vAmbientColor, 1.); //vec4(lightingColor, opacity);
  #endif

}


