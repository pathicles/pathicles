#pragma glslify: export(readVariable);

vec4 readVariable(sampler2D tex, float p, float b) {

  vec2 resolution = vec2(particleCount, 4.*snapshots);

  return vec4(
    texture2D(tex, vec2(p, 4.*b) / resolution).x,
    texture2D(tex, vec2(p, 4.*b+1.) / resolution).y,
    texture2D(tex, vec2(p, 4.*b+2.) / resolution).z,
    texture2D(tex, vec2(p, 4.*b+3.) / resolution).w
    );
}



