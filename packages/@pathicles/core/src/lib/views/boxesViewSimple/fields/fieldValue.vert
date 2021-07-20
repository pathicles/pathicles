precision mediump float;
attribute vec3 aOffset;
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aUV;
varying vec2 vUv;
// These three are instanced attributes.
uniform mat4 projection, view;
uniform vec3 magneticField;
varying vec3 vPosition;
varying float vColorCorrection;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec3 vColor;
varying vec3 vScale;
#pragma glslify: BeamlineElement = require("@pathicles/core/src/lib/shaders/beamline-element.glsl");
/*__latticeSize__*/

const int BEAMLINE_ELEMENT_TYPE_DRIFT = 0;
const int BEAMLINE_ELEMENT_TYPE_DIPOLE = 1;
const int BEAMLINE_ELEMENT_TYPE_QUADRUPOLE = 2;


#pragma glslify: mat3LookAt = require("@pathicles/core/src/lib/shaders/mat3-look-at.glsl");


/*__latticeChunkGLSL__*/





mat2 rot2D(float phi) {
  float c = cos(phi);
  float s = sin(phi);
  return mat2(c, -s, s, c);
}
float sdBox( vec3 p, vec3 s ) {
  vec3 d = abs(p) - .5 * s;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}
BeamlineElement getBeamlineElement(float id) {
  for (int i=0; i < BEAMLINE_ELEMENT_COUNT; i++) {
    if (float(i) == id) return beamline[i];
  }
  return beamline[0];
}


vec3 getB(vec3 position) {

  vec3 B = magneticField;

  for (int i=0; i < BEAMLINE_ELEMENT_COUNT; i++) {
    BeamlineElement ble =  beamline[i];
    vec3 localPosition = position;
    localPosition -= ble.middle;
    localPosition.xz *= rot2D(ble.phi);
    if (sdBox(localPosition, ble.size) <= 0.) {
      if (ble.type == BEAMLINE_ELEMENT_TYPE_DIPOLE) {
        B += vec3(10., ble.strength, 0.);
      } else if (ble.type == BEAMLINE_ELEMENT_TYPE_QUADRUPOLE) {
        B += abs(ble.strength)  *
        ((ble.strength > 0.)
        ? vec3(localPosition.y, localPosition.x, 0)
        : vec3(-localPosition.y, -localPosition.x, 0.));
      }
    }
  }

  return B;
}


void main () {
  initLatticeData();
  vUv = aUV;
  vNormal = aNormal;
  vNormalOrig = aNormal;

  vec3 b = getB(aOffset);
  vColor = vec3(b);
  float scale = length(b) == 0. ? .0 : min(length(b), 1.) / 1. + .5;

  
  mat3 lookAt = mat3LookAt(vec3(0.), normalize(b), 0.1);

  // Translate
mat4 tPos = mat4(vec4(1.0,0.0,0.0,0.0),
vec4(0.0,1.0,0.0,0.0),
vec4(0.0,0.0,1.0,0.0),
vec4(aOffset,1.0));

float angleX = dot(b, vec3(1.,0.,0.));
float angleZ = 0.;
float angleY = 0.;


// Rotate
mat4 rXPos = mat4(vec4(1.0,0.0,0.0,0.0),
vec4(0.0,cos(angleX),-sin(angleX),0.0),
vec4(0.0,sin(angleX),cos(angleX),0.0),
vec4(0.0,0.0,0.0,1.0));


mat4 rYPos = mat4(vec4(cos(angleY),0.,-sin(angleY),0.0),
vec4(0.0,1.0,0.0,0.0),
vec4(sin(angleY),0.0,cos(angleY),0.0),
vec4(0.0,0.0,0.0,1.0));

mat4 rZPos = mat4(vec4(cos(angleZ),-sin(angleZ),0.0,0.0),
vec4(sin(angleZ),cos(angleZ),0.0,0.0),
vec4(0.0,0.0,1.0,0.0),
vec4(0.0,0.0,0.0,1.0));

// Scale
mat4 sScale = mat4(vec4(1.,0.0,0.0,0.0),
vec4(0.0,scale,0.0,0.0),
vec4(0.0,0.0,1.,0.0),
vec4(0.0,0.0,0.0,1.0));


  mat4 aModel = tPos *  rZPos * rYPos * rXPos * sScale;

  vPosition = (aModel * vec4(aPosition, 1.)).xyz;


  gl_Position = projection * view *  vec4(vPosition, 1.);
}
