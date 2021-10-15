#pragma glslify: export(insideBox);

float insideBox(vec3 v, vec3 bottomLeft, vec3 topRight) {
  vec3 s = step(bottomLeft, v) - step(topRight, v);
  return s.x * s.y * s.z;
}
