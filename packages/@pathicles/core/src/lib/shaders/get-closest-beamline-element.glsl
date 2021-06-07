#pragma glslify: export(getClosestBeamlineElement);
#pragma glslify: insideBox = require("@pathicles/core/src/lib/shaders/insideBox.glsl");

BeamlineElement getBeamlineElement(float id) {
  for (int i=0; i < BEAMLINE_ELEMENT_COUNT; i++) {
    if (float(i) == id) return beamline[i];
  }
  return beamline[0];
}
BeamlineElement getClosestBeamlineElement(vec3 position) {

  float bestLength = 50.;
  int bestIndex = 0;

  for (int i=0; i < BEAMLINE_ELEMENT_COUNT; i++) {

    BeamlineElement bl = getBeamlineElement(float(i));
    if (insideBox(position, bl.start, bl.end) > 0.) {
      return bl;
    }
//    float currentLength = min(length(position - bl.start), length(position - bl.end));
//    if (currentLength < bestLength) {
//
//      bestIndex = i;
//      bestLength = currentLength;
//    }
  }
  return BeamlineElement(vec3(0.), vec3(0.), 0, 0.);
}

