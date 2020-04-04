precision highp float;
uniform sampler2D uTex;
uniform float ambientIntensity;
//
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;



void main() {

  vec4 materialColor = vec4(1. * texture2D(uTex, 10. * vUv).r  * vec3(1.), 1.);
  vec4 ambientColor = (ambientIntensity * materialColor);
  vec4 lightingColor = vec4(1.*materialColor.rgb, 1.);

  gl_FragColor = vec4(lightingColor.rgb, 1.);

}
