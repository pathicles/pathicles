precision mediump float;
attribute vec3 aPosition;
attribute float aVertexColorCorrection;
attribute vec3 aColor;
attribute vec3 aNormal;
attribute vec2 aUV;
varying vec2 vUv;
// These three are instanced attributes.
attribute vec3 aTranslation;
attribute vec3 aScale;
attribute float aPhi;
uniform mat4 projection, view, model;
varying vec3 vPosition;
varying float vColorCorrection;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec3 vColor;
varying vec3 vScale;

mat4 fromYRotation (float phi) {
  float s = sin(phi);
  float c = cos(phi);
  return mat4(
  c,
  0.,
  -s,
  0.,
  0.,
  1.,
  0.,
  0.,
  s,
  0.,
  c,
  0.,
  0.,
  0.,
  0.,
  1.);
}
void main () {
  vUv = aUV;
  vNormal = aNormal;
  vNormalOrig = aNormal;
  vScale = aScale;
  vPosition = (fromYRotation(aPhi) * vec4((aScale * aPosition), 1.)).xyz + aTranslation;
//  vPosition = aPosition; //(fromYRotation(aPhi) * vec4((aScale * aPosition), 1.)).xyz + aTranslation;
  vColor = aColor;
  vColorCorrection = vColorCorrection;
//  vColor = aColor;
  gl_Position = projection * view * model * vec4(
  vPosition,
  1.0);
}
