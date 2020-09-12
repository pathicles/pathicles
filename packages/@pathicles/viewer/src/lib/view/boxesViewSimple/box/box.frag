precision mediump float;
#extension GL_OES_standard_derivatives : enable


varying vec3 vNormal;
varying vec2 vUv;
uniform vec3 eye;
varying vec3 vPosition;

varying vec3 vScale;



float edger(vec2 uv, vec3 boxScale, float edgeWidth) {

  float edgeXY =  smoothstep(0.,edgeWidth, uv.x*boxScale.z) * smoothstep(0.,edgeWidth, (1.-uv.x)*boxScale.z);
  float edgeXZ =  smoothstep(0.,edgeWidth, uv.y*boxScale.y) * smoothstep(0.,edgeWidth, (1.-uv.y)*boxScale.y);
  float edgeX = (1.-(edgeXY*edgeXZ))*abs(vNormal.x);

  float edgeYX =  smoothstep(0.,edgeWidth, uv.x*boxScale.x) * smoothstep(0.,edgeWidth, (1.-uv.x)*boxScale.x);
  float edgeYZ =  smoothstep(0.,edgeWidth, uv.y*boxScale.z) * smoothstep(0.,edgeWidth, (1.-uv.y)*boxScale.z);
  float edgeY = (1.-(edgeYX*edgeYZ))*abs(vNormal.y);

  float edgeZX =  smoothstep(0.,edgeWidth, uv.x*boxScale.x) * smoothstep(0.,edgeWidth, (1.-uv.x)*boxScale.x);
  float edgeZY =  smoothstep(0.,edgeWidth, uv.y*boxScale.z) * smoothstep(0.,edgeWidth, (1.-uv.y)*boxScale.z);
  float edgeZ = (1.-(edgeZX*edgeZY))*abs(vNormal.z);

  return clamp(pow(edgeX+edgeY+edgeZ, 1.), 0., 1.);
}


void main () {

  vec3 color = vec3(0.92, 0.75, 0.0)
  + edger(vUv, vScale, .02) * vec3(.6);

  gl_FragColor = vec4(color, 1.);
}
