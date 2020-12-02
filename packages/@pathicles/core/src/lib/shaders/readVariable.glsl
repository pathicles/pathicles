#pragma glslify: export(readVariable);

vec4 readVariable(sampler2D tex, int p, int s) {

  vec2 resolution = vec2(particleCount, 4*snapshotCount);

  return vec4(
    texture2D(tex, vec2(p, 4*s) / resolution).r,
    texture2D(tex, vec2(p, 4*s+1) / resolution).g,
    texture2D(tex, vec2(p, 4*s+2) / resolution).b,
    texture2D(tex, vec2(p, 4*s+3) / resolution).a
    );
}



