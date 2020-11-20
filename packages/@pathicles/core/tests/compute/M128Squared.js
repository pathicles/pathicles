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

export class M128Squared {
  constructor(gpgpUtility_) {
    this.gpgpUtility = gpgpUtility_
    this.gl = this.gpgpUtility.gl

    this.createProgram()
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
      'uniform highp sampler2D m;\n' +
      '#else\n' +
      'precision mediump float;\n' +
      'uniform  mediump sampler2D m;\n' +
      '#endif\n' +
      '' +
      'varying vec2 vTextureCoord;' +
      '' +
      'void main()' +
      '{' +
      '  float i, j;' +
      '  float value = 0.0;' +
      '  float value1, value2;' +
      '' +
      '  i = vTextureCoord.s;' +
      '  j = vTextureCoord.t;' +
      '' +
      '  for(float k=0.0; k<128.0; ++k)' +
      '  {' +
      '    value1 = texture2D(m, vec2(i, k/128.0)).r;' +
      '    value2 = texture2D(m, vec2(k/128.0, j)).r;' +
      '    value += value1*value2;' +
      '  }' +
      '  gl_FragColor.r = value;' +
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
   * texture are populated with the square of the input matrix, m. Use
   * gl.readPixels to retrieve texture values.
   *
   * @param m        {WebGLTexture} A texture containing the elements of m.
   * @param mSquared {WebGLTexture} A texture to be incorporated into a fbo,
   *                                the target for our operations.
   */
  square(m, mSquared) {
    // Create and bind a framebuffer
    this.gpgpUtility.attachFrameBuffer(mSquared)

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

    this.gl.activeTexture(this.gl.TEXTURE0)
    this.gl.bindTexture(this.gl.TEXTURE_2D, m)
    this.gl.uniform1i(this.textureHandle, 0)

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
  }

  element(i, j) {
    return i * 1000.0 + j
  }

  /**
   * Read back the i, j pixel and compare it with the expected value. The expected value
   * computation matches that in the fragment shader.
   *
   * @param i       {number} the i index of the matrix element to be tested.
   * @param j       {number} the j index of the matrix element to be tested.
   * @param display {HTMLTableElement} A table for test results.
   */
  test(i, j, display) {
    const eps = 1.0e-7

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

    let compare = 0.0

    for (let k = 0.0; k < 128.0; ++k) {
      compare += this.element(i, k) * this.element(k, j)
    }

    let ratio = Math.abs((compare - buffer[0]) / compare)

    let passed = ratio < eps

    let tableRow = display.insertRow()
    // Coordinates column
    let tableCell = tableRow.insertCell()
    tableCell.appendChild(document.createTextNode('(' + i + ', ' + j + ')'))
    // Found value column
    tableCell = tableRow.insertCell()
    tableCell.appendChild(document.createTextNode(buffer[0]))
    // Expected value column
    tableCell = tableRow.insertCell()
    tableCell.appendChild(document.createTextNode(compare))
    // Relative error
    tableCell = tableRow.insertCell()
    tableCell.appendChild(document.createTextNode(ratio.toPrecision(2)))

    if (!passed) {
      tableRow.classList.add('warn')
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
