#pragma glslify: export(edger);

float edger(vec2 uv, vec3 boxScale, float edgeWidth, vec3 normal) {

  float edgeXY =  smoothstep(0., edgeWidth, uv.x*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.z);
  float edgeXZ =  smoothstep(0., edgeWidth, uv.y*boxScale.y) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.y);
  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);

  float edgeYX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);
  float edgeYZ =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);
  float edgeY = (1.-(edgeYX*edgeYZ))*abs(normal.y);

  float edgeZX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);
  float edgeZY =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);
  float edgeZ = (1.-(edgeZX*edgeZY))*abs(normal.z);

  return clamp(edgeX+edgeY, 0., 1.);
}



//
//float edgerFeathered(vec2 uv, vec3 boxScale, float edgeWidth) {
//
//  float feather = .1;
//
//  float edgeXY =  smoothstep(edgeWidth, edgeWidth+feather, uv.x*boxScale.z) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.x)*boxScale.z);
//  float edgeXZ =  smoothstep(edgeWidth, edgeWidth+feather, uv.y*boxScale.y) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.y)*boxScale.y);
//  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);
//
//  return clamp(edgeX, 0., 1.);
//}
//
//
//float edgerHard(vec2 uv, vec3 boxScale, float edgeWidth) {
//  float edgeXY =  step(edgeWidth*(1.+uv.x*boxScale.z), uv.x*boxScale.z) * step(edgeWidth, (1.-uv.x)*boxScale.z);
//  float edgeXZ =  step(edgeWidth*(0.5+uv.x/2.), uv.y*boxScale.y) * step(edgeWidth*(0.5+uv.x/2.), (1.-uv.y)*boxScale.y);
//  float edgeX = (1.-(edgeXZ))*abs(normal.x);
//
//  return clamp(edgeX, 0., 1.);
//}
