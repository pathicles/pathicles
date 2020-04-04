precision highp float;

varying float toBeDiscarded;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vDiffuseColor;
varying float vColorCorrection;

uniform float ambientIntensity;
uniform float stageGrid_size;
uniform vec3 eye;


void main () {

  if (toBeDiscarded > .0) discard;

  //if (length(vPosition.z) > stageGrid_size/2. - .5) discard;

  vec3 materialColor = (1. + vColorCorrection) * vDiffuseColor;
  vec3 ambientColor = (ambientIntensity * vec3(1., 1., 1.) * materialColor).rgb;
  vec3 lightingColor = 3. * ambientColor;

  float opacity = 1.;
  #ifdef shadow
  gl_FragColor = vec4(0.6, 0.6, 0.6, .5);
  #endif
  #ifdef lighting
  gl_FragColor = vec4(lightingColor, opacity);
  #endif

}


