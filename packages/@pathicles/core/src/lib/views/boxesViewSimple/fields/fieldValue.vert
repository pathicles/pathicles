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


#pragma glslify: lookAt = require("@pathicles/core/src/lib/shaders/look-at.glsl");


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
BeamlineElement getClosestBeamlineElement(vec3 position) {

  for (int i=0; i < BEAMLINE_ELEMENT_COUNT; i++) {

    BeamlineElement bl = getBeamlineElement(float(i));

    vec3 localPosition = position;
    localPosition.xz *= rot2D(bl.phi);
    localPosition -= bl.middle;

    if (sdBox(localPosition, bl.size) <= 0.) {
      return bl;
    }
  }
  return BeamlineElement(vec3(0.), vec3(0.), 0., 0, 0.);
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
        B += vec3(0., ble.strength, 0.);
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

  vec3 scaledPosition = aPosition * scale;
  mat4 lookAtMat4 = lookAt(aOffset, aOffset + b, vec3(0., 1., 0.));

  vPosition = (vec4(scaledPosition, 1.)).xyz + aOffset;
//  vPosition =  aPosition + aOffset;

  gl_Position = projection * view *  vec4(vPosition, 1.);
}
