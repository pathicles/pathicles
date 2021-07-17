precision mediump float;
attribute vec3 aPosition;
attribute float aVertexColorCorrection;
attribute vec3 aColor;
attribute vec3 aNormal;
attribute vec2 aUV;
varying vec2 vUv;
attribute mat4 aTransform;
attribute vec3 aTranslation;
attribute vec3 aScale;
attribute float aPhi;
attribute float aTheta;
uniform mat4 projection, view;
// These three are instanced attributes.
varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec3 vColor;
varying vec3 vScale;

#pragma glslify: inverse = require(glsl-inverse)
#pragma glslify: transpose = require(glsl-transpose)


mat4 fromYRotation (float phi) {
  float s = sin(phi);
  float c = cos(phi);
  return mat4(
  c,   0.,  -s,   0.,
  0.,  1.,   0.,   0.,
  s,   0.,   c,   0.,
  0.,  0.,   0.,   1.);
}
mat4 fromZRotation (float theta) {
  float s = sin(theta);
  float c = cos(theta);
  return mat4(
  c,   -s,  0.,   0.,
  s,   c,   0.,   0.,
  0.,  0.,   1.,   0.,
  0.,  0.,   0.,   1.);
}
void main () {

  vUv = aUV;
  vScale = aScale;

  mat4 aModel = fromYRotation(aPhi) * fromZRotation(aTheta);
  vPosition = ( aModel * vec4((aScale * aPosition), 1.))
    + vec4(aTranslation, 1.);
  vColor = aColor;


#ifdef lighting

  vNormalOrig = aNormal;
  vNormal = normalize((transpose(inverse(aModel)) * vec4(aNormal, 0.)).xyz);
  gl_Position = projection * view  * vPosition;

#endif// lighting

#ifdef shadow

//  gl_Position =vec4(vShadowCoord, 1.0);

#endif// shadow
}
