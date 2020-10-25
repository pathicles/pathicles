// eslint-disable-next-line no-unused-vars
import { ortho, perspective, lookAt } from 'gl-mat4'

export const SHADOW_MAP_SIZE = 1024
export const TEXEL_SIZE = 0.01

export class Shadow {
  constructor(regl, { position, size, filterRadius = 5 }) {
    this.regl = regl
    this.fbo = regl.framebuffer({
      color: regl.texture({
        width: SHADOW_MAP_SIZE,
        height: SHADOW_MAP_SIZE,
        // mag: 'nearest'
        mag: 'linear',
        wrap: 'clamp'
      }),
      depth: false
    })

    this.fboBlurred = regl.framebuffer({
      color: regl.texture({
        width: SHADOW_MAP_SIZE,
        height: SHADOW_MAP_SIZE,
        // mag: 'nearest'
        mag: 'linear',
        wrap: 'clamp'
      }),
      depth: true
    })

    // regl.clear({
    //   color: [1, 1, 0, 1],
    //   depth: 1,
    //   framebuffer: this.fboBlurred
    // })

    this.filterRadius = filterRadius
    this.shadowDirection = position
    this.shadowMapSize = SHADOW_MAP_SIZE

    this.shadowViewMatrix = lookAt(
      [],
      position,
      [0.0, 0.0, 0.0],
      [0.0, 0.0, 1.0]
    )
    // this.shadowProjectionMatrix = ortho([], -10, 10, -10, 10, -10, 10)
    this.shadowProjectionMatrix = ortho([], -size, size, -size, size, 0, 10)
    // this.shadowProjectionMatrix = perspective([], Math.PI / 2.0, 1.0, 0.01, 5.0)
    // this.shadowViewMatrix = lookAt([], [0, 1, 0], [0, 0, 0], [0, 0, 1])
    // lookAt(
    //   [],
    //   shadowDirection,
    //   [0, 0, 0],
    //   // [shadowDirection[0], shadowDirection[1] - 1.0, shadowDirection[2]],
    //   [0.0, 0.0, 1.0]
    // )
  }

  get uniforms() {
    return {
      shadowProjectionMatrix: this.shadowProjectionMatrix,
      shadowViewMatrix: this.shadowViewMatrix,
      shadowDirection: this.shadowDirection,

      minBias: () => 0.001,
      maxBias: () => 0.3
    }
  }

  blur() {
    return this.regl({
      frag: `
precision highp float;

float decodeFloat (vec4 color) {
  const vec4 bitShift = vec4(
  1.0 / (256.0 * 256.0 * 256.0),
  1.0 / (256.0 * 256.0),
  1.0 / 256.0,
  1
  );
  return dot(color, bitShift);
}


uniform float minBias;
uniform sampler2D u_tex;
uniform float wRcp, hRcp;
const int R = 1;
const vec2 RESOLUTION = vec2(${SHADOW_MAP_SIZE}, ${SHADOW_MAP_SIZE});
void main()
{
    vec2 uv = gl_FragCoord.xy/RESOLUTION;

    float W =  float((1 + 2 * R) * (1 + 2 * R));
    // // vec3 avg = texture2D(u_tex, uv).xyz;
    vec4 avg = texture2D(u_tex, uv);
    float f = (decodeFloat(avg) - minBias > 1.) ? 1. : 0.;

    for (int x = -R; x <= +R; x++) {
      for (int y = -R; y <= +R; y++) {

      float val = decodeFloat(texture2D(u_tex, uv + vec2(float(x) * wRcp, float(y) * hRcp)));
        f +=  (val - minBias > 1.)  ?  (1.0 / W) * 1. : 0.;
      }
    }
    f = 1. - f;
    gl_FragColor = vec4(f,f,f, 1.);
    gl_FragColor = avg;
}
  //
  // precision mediump float;
  // varying vec2 uv;
  // uniform sampler2D tex;

  // #define R int(${this.filterRadius})
  // void main() {
  //   float W =  float((1 + 2 * R) * (1 + 2 * R));
  //   vec3 avg = vec3(0.0);
  //   for (int x = -R; x <= +R; x++) {
  //     for (int y = -R; y <= +R; y++) {
  //       avg += (1.0 / W) * texture2D(tex, uv + vec2(float(x) * wRcp, float(y) * hRcp)).xyz;
  //     }
  //   }
  //   gl_FragColor = texture2D(tex, v_uv);
  // }
`,
      vert: `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0, 1);
}
// precision mediump float;
// attribute vec2 in_position;
// attribute vec2 in_uv;
// varying vec2 v_uv;
// void main()
// {
//    v_uv = in_position;
//    gl_Position = vec4(in_position, 0.0, 1.0);
// }
  //
  // precision mediump float;
  // attribute vec2 position;
  // varying vec2 uv;
  // void main() {
  //   uv = 0.5 * (position + 1.0);
  //   gl_Position = vec4(position, 0, 1);
  // }
`,
      attributes: {
        position: [-4, -4, 4, -4, 0, 4]
      },
      uniforms: {
        minBias: () => 0.0001,
        u_tex: () => this.fbo,
        wRcp: () => 1.0 / SHADOW_MAP_SIZE,
        hRcp: () => 1.0 / SHADOW_MAP_SIZE
      },
      depth: { enable: false },
      count: 3,
      framebuffer: () => this.fboBlurred
    })
  }

  drawFbo() {
    const command = this.regl({
      vert: `
      precision mediump float;
      attribute vec2 position;
      varying vec2 uv;
      void main () {
        uv = position;
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,

      frag: `
      precision mediump float;
      uniform sampler2D texture;
      varying vec2 uv;
      float decodeFloat (vec4 color) {
        const vec4 bitShift = vec4(
        1.0 / (256.0 * 256.0 * 256.0),
        1.0 / (256.0 * 256.0),
        1.0 / 256.0,
        1
        );
        return dot(color, bitShift);
      }
      float unpackRGBA (vec4 v) {
        return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
      }
      void main () {

        // vec4 texel = vec4(unpackRGBA(texture2D(texture, uv)));
        vec4 texel = texture2D(texture, uv);
        float depth = decodeFloat(texel);
        // texel = vec4(decodeFloat(texel));

        gl_FragColor = texel; //vec4(uv,uv);
        // gl_FragColor = vec4(vec3(depth), 1.);
      }`,

      attributes: { position: [2, 0, 0, 2, -2, -2] },

      uniforms: {
        texture: this.fboBlurred
      },

      viewport: {
        x: 0,
        y: 0,
        width: SHADOW_MAP_SIZE * TEXEL_SIZE,
        height: SHADOW_MAP_SIZE * TEXEL_SIZE
      },
      depth: {
        enable: false
      },

      count: 3
    })

    return command()
  }
}
