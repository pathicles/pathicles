/** eslint-env browser **/

/**
 * Copyright 2015 Vizit Solutions
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

export class ToUnsignedBytes {
  constructor(gpgpUtility_) {
    this.gpgpUtility = gpgpUtility_
    this.gl = this.gpgpUtility.gl
    this.program = this.createProgram()
  }

  /**
   * Compile shaders and link them into a program, then retrieve references to the
   * attributes and uniforms. The standard vertex shader, which simply passes on the
   * physical and texture coordinates, is used.
   *
   * @returns {WebGLProgram} The created program object.
   * @see {https://www.khronos.org/registry/webgl/specs/1.0/#5.6|WebGLProgram}
   */
  createProgram() {
    // Note that the preprocessor requires the newlines.
    const fragmentShaderSource =
      '#ifdef GL_FRAGMENT_PRECISION_HIGH\n' +
      'precision highp float;\n' +
      '#else\n' +
      'precision mediump float;\n' +
      '#endif\n' +
      '' +
      'uniform sampler2D texture;' +
      '' +
      'varying vec2 vTextureCoord;' +
      '' +
      'vec4 pack(float value)' +
      '{' +
      '  if (value == 0.0) return vec4(0, 0, 0, 0);' +
      '' +
      '  float exponent;' +
      '  float mantissa;' +
      '  vec4  result;' +
      '  float sgn;' +
      '' +
      '  sgn = step(0.0, -value);' +
      '  value = abs(value);' +
      '' +
      '  exponent =  floor(log2(value));' +
      '' +
      '  mantissa =  value*pow(2.0, -exponent)-1.0;' +
      '  exponent =  exponent+127.0;' +
      '  result   = vec4(0,0,0,0);' +
      '' +
      '  result.a = floor(exponent/2.0);' +
      '  exponent = exponent - result.a*2.0;' +
      '  result.a = result.a + 128.0*sgn;' +
      '' +
      '  result.b = floor(mantissa * 128.0);' +
      '  mantissa = mantissa - result.b / 128.0;' +
      '  result.b = result.b + exponent*128.0;' +
      '' +
      '  result.g =  floor(mantissa*32768.0);' +
      '  mantissa = mantissa - result.g/32768.0;' +
      '' +
      '  result.r = floor(mantissa*8388608.0);' +
      '' +
      '  return result/255.0;' +
      '}' +
      '' +
      'void main()' +
      '{' +
      '          vec4 data = texture2D(texture, vTextureCoord);' +
      '          gl_FragColor = pack(data.r);' +
      '}'

    this.program = this.gpgpUtility.createProgram(null, fragmentShaderSource)
    this.positionHandle = this.gpgpUtility.getAttribLocation(
      this.program,
      'position'
    )
    this.gl.enableVertexAttribArray(this.positionHandle)
    this.textureCoordHandle = this.gpgpUtility.getAttribLocation(
      this.program,
      'textureCoord'
    )
    this.gl.enableVertexAttribArray(this.textureCoordHandle)
    this.textureHandle = this.gl.getUniformLocation(this.program, 'texture')

    return this.program
  }

  /**
   * Runs the program to do the actual work. On exit the framebuffer &amp;
   * texture are populated with the values drawn from the input texture,
   * but packed into an RGBA UNSIGNED_BYTE format. Use gl.readPixels to
   * retrieve texture values.
   */
  convert(width, height, texture) {
    this.gl.useProgram(this.program)

    this.gpgpUtility.getStandardVertices()

    this.gl.vertexAttribPointer(
      this.positionHandle,
      3,
      this.gl.FLOAT,
      this.gl.FALSE,
      20,
      0
    )
    this.gl.vertexAttribPointer(
      this.textureCoordHandle,
      2,
      this.gl.FLOAT,
      this.gl.FALSE,
      20,
      12
    )

    //gl.uniform1f(widthHandle,  width);
    //gl.uniform1f(heightHandle, height);

    this.gl.activeTexture(this.gl.TEXTURE0)
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
    this.gl.uniform1i(this.textureHandle, 0)

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
  }

  /**
   * Read back the i, j pixel and compare it with the expected value. The expected value
   * computation matches that in the fragment shader.
   *
   * @param i {number} the i index of the matrix.
   * @param j {number} the j index of the matrix.
   */
  test(i, j) {
    // One each for RGBA component of a pixel
    const buffer = new Uint8Array(4)
    // Read a 1x1 block of pixels, a single pixel
    this.gl.readPixels(
      i, // x-coord of lower left corner
      j, // y-coord of lower left corner
      1, // width of the block
      1, // height of the block
      this.gl.RGBA, // Format of pixel data.
      this.gl.UNSIGNED_BYTE, // Data type of the pixel data, must match makeTexture
      buffer
    ) // Load pixel data into buffer

    const floatingPoint = new Float32Array(buffer.buffer)

    const expected = i * 1000.0 + j

    const passed = floatingPoint[0] === expected

    if (!passed) {
      console.error(
        'Read ' +
          floatingPoint[0] +
          ' at (' +
          i +
          ', ' +
          j +
          '), expected ' +
          expected +
          '.'
      )
    } else {
      console.log(
        'Read ' +
          floatingPoint[0] +
          ' at (' +
          i +
          ', ' +
          j +
          '), expected ' +
          expected +
          '.'
      )
    }

    return passed
  }

  /**
   * Invoke to clean up resources specific to this program. We leave the texture
   * and frame buffer intact as they are used in followon calculations.
   */
  done() {
    this.gl.deleteProgram(this.program)
  }
}
