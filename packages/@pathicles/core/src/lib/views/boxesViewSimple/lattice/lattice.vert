precision mediump float;
attribute vec3 aPosition;
attribute vec3 aColor;
attribute vec3 aNormal;
attribute vec2 aUV;
varying vec2 vUv;
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



// Translate
mat4 tPos = mat4(vec4(1.0,0.0,0.0,0.0),
vec4(0.0,1.0,0.0,0.0),
vec4(0.0,0.0,1.0,0.0),
vec4(aTranslation,1.0));

//// Rotate
//mat4 rXPos = mat4(vec4(1.0,0.0,0.0,0.0),
//vec4(0.0,cos(rotationX),-sin(rotationX),0.0),
//vec4(0.0,sin(rotationX),cos(rotationX),0.0),
//vec4(0.0,0.0,0.0,1.0));

mat4 rYPos = mat4(vec4(cos(aPhi),0.,-sin(aPhi),0.0),
vec4(0.0,1.0,0.0,0.0),
vec4(sin(aPhi),0.0,cos(aPhi),0.0),
vec4(0.0,0.0,0.0,1.0));

mat4 rZPos = mat4(vec4(cos(aTheta),-sin(aTheta),0.0,0.0),
vec4(sin(aTheta),cos(aTheta),0.0,0.0),
vec4(0.0,0.0,1.0,0.0),
vec4(0.0,0.0,0.0,1.0));

// Scale
mat4 sScale = mat4(vec4(aScale.x,0.0,0.0,0.0),
vec4(0.0,aScale.y,0.0,0.0),
vec4(0.0,0.0,aScale.z,0.0),
vec4(0.0,0.0,0.0,1.0));


  mat4 aModel = tPos *  rYPos * rZPos  * sScale;
  vPosition =  aModel * vec4(aPosition,1.0);
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
