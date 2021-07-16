#pragma glslify: export(getClosestBeamlineElement);
#pragma glslify: insideBox = require("@pathicles/core/src/lib/shaders/insideBox.glsl");

mat2 rot2D(float phi) {
  float c = cos(phi);
  float s = sin(phi);
  return mat2(c, -s, s, c);
}


float sdBox( vec3 p, vec3 s ) {
  vec3 d = abs(p) - b;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}
//
//vec2 d = abs(p) - size;
//return length(max(d, vec2(0))) + min(max(d.x, d.y), 0.0);

BeamlineElement getBeamlineElement(float id) {
  for (int i=0; i < BEAMLINE_ELEMENT_COUNT; i++) {
    if (float(i) == id) return beamline[i];
  }
  return beamline[0];
}
BeamlineElement getClosestBeamlineElement(vec3 position) {

  for (int i=0; i < BEAMLINE_ELEMENT_COUNT; i++) {

    BeamlineElement bl = getBeamlineElement(float(i));

    vec3 localPosition = position; // - bl.middle;
//    localPosition.xz *= rot2D(bl.phi);
    localPosition -= bl.middle;

    if (sdBox(localPosition, bl.size) <= 0.) {
      return bl;
    }
  }
  return BeamlineElement(vec3(0.), vec3(0.), 0., 0, 0.);
}

