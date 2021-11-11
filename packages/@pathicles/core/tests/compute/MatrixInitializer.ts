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

export class MatrixInitializer {
  constructor(gpgpUtility_) {
    this.gpgpUtility = gpgpUtility_
    this.gl = this.gpgpUtility.getGLContext()
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
      'uniform float height;' +
      'uniform float width;' +
      '' +
      'varying vec2 vTextureCoord;' +
      '' +
      'vec4 computeElement(float s, float t)' +
      '{' +
      '  float i = floor(width*s);' +
      '  float j = floor(height*t);' +
      '  return vec4(i*1000.0 + j, 0.0, 0.0, 0.0);' +
      '}' +
      '' +
      'void main()' +
      '{' +
      '  gl_FragColor = computeElement(vTextureCoord.s, vTextureCoord.t);' +
      '}'

    // Null first argument to createProgram => use the standard vertex shader
    const program = this.gpgpUtility.createProgram(null, fragmentShaderSource)

    // position and textureCoord are attributes from the standard vertex shader
    this.positionHandle = this.gpgpUtility.getAttribLocation(
      program,
      'position'
    )
    this.gl.enableVertexAttribArray(this.positionHandle)
    this.textureCoordHandle = this.gpgpUtility.getAttribLocation(
      program,
      'textureCoord'
    )
    this.gl.enableVertexAttribArray(this.textureCoordHandle)
    // Height and width are the problem specific variables
    this.heightHandle = this.gpgpUtility.getUniformLocation(program, 'height')
    this.widthHandle = this.gpgpUtility.getUniformLocation(program, 'width')

    return program
  }

  initialize(width, height) {
    this.gl.useProgram(this.program)

    this.gpgpUtility.getStandardVertices()

    this.gl.vertexAttribPointer(
      this.positionHandle, // The attribute
      3, // The three (x,y,z) elements in each value
      this.gl.FLOAT, // The data type, so each position is three floating point numbers
      this.gl.FALSE, // Are values normalized - unused for float
      20, // Stride, the spacing, in bytes, between beginnings of successive values
      0
    ) // Offset 0, data starts at the beginning of the array
    this.gl.vertexAttribPointer(
      this.textureCoordHandle, // The attribute
      2, // The two (s,t) elements in each value
      this.gl.FLOAT, // The data type, so each position is two floating point numbers
      this.gl.FALSE, // Are values normalized - unused for float
      20, // Stride, the spacing, in bytes, between beginnings of successive values
      12
    ) // Offset 12 bytes, data starts after the positional data

    this.gl.uniform1f(this.widthHandle, width)
    this.gl.uniform1f(this.heightHandle, height)

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
  }

  done() {
    this.gl.deleteProgram(this.program)
  }

  getPixels(width, height) {
    // One each for RGBA component of each pixel
    const buffer = new Float32Array(width * height * 4)
    // Read a 1x1 block of pixels, a single pixel
    this.gl.readPixels(
      0, // x-coord of lower left corner
      0, // y-coord of lower left corner
      width, // width of the block
      height, // height of the block
      this.gl.RGBA, // Format of pixel data.
      this.gl.FLOAT, // Data type of the pixel data, must match makeTexture
      buffer
    ) // Load pixel data into buffer

    return buffer
  }

  test(i, j) {
    const eps = 1.0e-20

    // Error tollerance in calculations

    // One each for RGBA component of a pixel
    const buffer = new Float32Array(4)
    // Read a 1x1 block of pixels, a single pixel
    this.gl.readPixels(
      i, // x-coord of lower left corner
      j, // y-coord of lower left corner
      1, // width of the block
      1, // height of the block
      this.gl.RGBA, // Format of pixel data.
      this.gl.FLOAT, // Data type of the pixel data, must match makeTexture
      buffer
    ) // Load pixel data into buffer

    const expected = i * 1000.0 + j

    const passed =
      expected === 0.0
        ? buffer[0] < eps
        : Math.abs((buffer[0] - expected) / expected) < eps

    if (!passed) {
      alert(
        'Read ' +
          buffer[0] +
          ' at (' +
          i +
          ', ' +
          j +
          '), expected ' +
          expected +
          '.'
      )
    } else {
      console.log(i, j, expected)
    }

    return passed
  }
}
