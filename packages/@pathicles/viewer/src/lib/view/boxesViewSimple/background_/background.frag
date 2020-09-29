precision mediump float;
#extension GL_OES_standard_derivatives : enable


uniform vec2 uResolution;
uniform vec2 uSunPosition;
varying vec2 vUv;
uniform vec3 eye;
varying vec3 vPosition;


vec3 getSky(vec2 uv) {
  float atmosphere = sqrt(1.0-uv.y);
  vec3 skyColor = vec3(0.85, 0.85, 0.85);

  float scatter = pow(uSunPosition.y / uResolution.y, 1.0 / 15.0);
  scatter = 1.0 - clamp(scatter, 0.8, 1.0);

  vec3 scatterColor = mix(vec3(1.0), vec3(1.0, 0.3, 0.0) * 1.5, scatter);
  return mix(skyColor, vec3(scatterColor), atmosphere / 1.);

}

vec3 getSun(vec2 uv){
  float sun = 1. - distance(uv, uSunPosition.xy / uResolution.x);
  sun = clamp(sun, 0.0, 1.0);

  float glow = sun;
  glow = clamp(glow, 0.0, 1.0);

  sun = pow(sun, 200.0);
  sun *= 1.0;
  sun = clamp(sun, 0.0, 1.0);

  glow = pow(glow, 10.0) * 1.0;
  glow = pow(glow, (uv.y));
  glow = clamp(glow, 0.0, 1.0);

  sun *= pow(dot(uv.y, uv.y), 1.0 / 1.65);

  glow *= pow(dot(uv.y, uv.y), 1.0 / 2.0);

  sun += glow;

  vec3 sunColor = vec3(1.0, 1., 1.) * sun;

  return vec3(sunColor);
}


float grid(vec2 st, float res){
  vec2 grid = fract(st*res);
  grid /= fwidth(st);
  return 1. - (step(res, grid.x) * step(res, grid.y));
}


void main () {
  vec3 sky = getSky(vUv);
  vec3 sun = getSun(vUv);

//
//  float resolution = 1000.;
//  vec2 grid_st = vUv * uResolution * resolution;
//  vec3 color = vec3(.5);
//  color += vec3(.5, .5, 0.) * grid(grid_st, 1. / resolution);
//  color += vec3(0.2) * grid(grid_st, 10. / resolution);
//
//  float fogDistance = length(eye - vPosition);
//
//  gl_FragColor = vec4(color.rgb, exp(- fogDistance * FogDensity));

    gl_FragColor = vec4(sky + sun, 1.);
}
