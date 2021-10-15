mat4 lookAt(vec3 eye, vec3 at, vec3 up) {
  vec3 zaxis = normalize(eye - at);
  vec3 xaxis = normalize(cross(zaxis, up));
  vec3 yaxis = cross(xaxis, zaxis);
  zaxis *= -1.;
  return mat4(
  vec4(xaxis.x, xaxis.y, xaxis.z, -dot(xaxis, eye)),
  vec4(yaxis.x, yaxis.y, yaxis.z, -dot(yaxis, eye)),
  vec4(zaxis.x, zaxis.y, zaxis.z, -dot(zaxis, eye)),
  vec4(0, 0, 0, 1)
  );
}

#pragma glslify: export(lookAt);