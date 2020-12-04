#pragma glslify: export(readVariable);

vec4 readVariable(sampler2D tex, int p, int s) {

  vec2 resolution = vec2(4*snapshotCount, particleCount);

  return vec4(
    texture2D(tex, vec2(4*s,p) / resolution).r,
    texture2D(tex, vec2(4*s+1,p) / resolution).r,
    texture2D(tex, vec2(4*s+2,p) / resolution).r,
    texture2D(tex, vec2(4*s+3,p) / resolution).r
    );
}



