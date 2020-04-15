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

const vec3 fogColor = vec3(1.0);
const float FogDensity = 0.7;

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
  #ifdef lighting

  float ambientLightAmount = .5;
  float diffuseLightAmount = .5;


  vec3 ambient = ambientLightAmount * vDiffuseColor;

  vec3 diffuse = diffuseLightAmount * vDiffuseColor * clamp(dot(vNormal, normalize(vec3(10., 10., 10.))) , 0.0, 1.0 ) +
                  diffuseLightAmount * vDiffuseColor * clamp(dot(vNormal, normalize(vec3(-10., 10., -10.))) , 0.0, 1.0 ) ;

  float cosTheta2 = clamp(1. - 1. * cos(length(vPosition)) , .5, 2. );
//  vec3 diffuse2 = 0.01 * vec3(1.) * clamp(cosTheta2 , 0.0, 1.0 ) ;

  vec3 combinedDiffuse = clamp(diffuse * cosTheta2 , vec3(0.), vec3(1.));


  //  gl_FragColor =  vec4(  (1. - vColorCorrection) * vDiffuseColor + .1 * vAmbientColor, 1./vPosition.z/vPosition.z); //vec4(lightingColor, opacity);
  float gamma = 1.5;
  gl_FragColor =  vec4(pow( (1. - vColorCorrection) * (combinedDiffuse +  ambient), vec3(1.0/gamma)), 1.); //vec4(lightingColor, opacity);
  #endif

}


