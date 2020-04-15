precision highp float;

varying float toBeDiscarded;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec2 vUv;
varying vec3 vAmbientColor;
varying vec3 vDiffuseColor;
varying float vColorCorrection;

uniform float ambientIntensity;
uniform float stageGrid_size;
uniform vec3 eye;


void main () {

  if (toBeDiscarded > .0) discard;

  //if (length(vPosition.z) > stageGrid_size/2. - .5) discard;
//  vec3 hemisphereColor = hemisphere_light(vNormal, vec3(2., 2., 2.), vec3(.5,.5,.5), vec3(0.,1.,0.));

//  vec3 materialColor = (1. + vColorCorrection) * vDiffuseColor;
//  vec3 ambientColor = (ambientIntensity * vec3(1., 1., 1.) * materialColor).rgb;
//  vec3 lightingColor = 3. * ambientColor;

  float opacity = 1.;
  #ifdef shadow
  gl_FragColor = vec4(0.6, 0.6, 0.6, 1./vPosition.z/vPosition.z); //vec4(lightingColor,
  #endif
  #ifdef lighting

  float ambientLightAmount = 1.25;
  float diffuseLightAmount = .75;
  vec3 lightDir = normalize(vec3(1., 10., 0.));
  vec3 ambient = ambientLightAmount * vDiffuseColor;
  float cosTheta = dot(vNormal, lightDir);
  vec3 diffuse = diffuseLightAmount * vDiffuseColor * clamp(cosTheta , 0.0, 1.0 ) ;


  //  gl_FragColor =  vec4(  (1. - vColorCorrection) * vDiffuseColor + .1 * vAmbientColor, 1./vPosition.z/vPosition.z); //vec4(lightingColor, opacity);
  float gamma = 1.;
  gl_FragColor =  vec4(pow( (1. - vColorCorrection) * (diffuse +  ambient), vec3(1.0/gamma)), 1.); //vec4(lightingColor, opacity);
  #endif

}


