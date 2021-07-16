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
varying vec4 vPosition;
varying float vColorCorrection;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec3 vColor;
varying vec3 vScale;

mat4 instanceMatrix;

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
  vPosition = (fromYRotation(aPhi) * vec4((aScale * aPosition), 1.)) + vec4(aTranslation.x, aTranslation.y+.1, aTranslation.z, 1.);
  vColor = aColor;
  vColorCorrection = vColorCorrection;
  gl_Position = projection * view  * vPosition;
}
