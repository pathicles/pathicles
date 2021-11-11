/** eslint-env browser **/
/**
 * Set of class to facilitate the setup and execution of GPGPU tasks.
 *
 * @param {number} width_  The width (x-dimension) of the problem domain.
 *                          Normalized to s in texture coordinates.
 * @param {number} height_ The height (y-dimension) of the problem domain.
 *                          Normalized to t in texture coordinates.
 *
 * @param {WebGLContextAttributes} attributes_ A collection of boolean values to enable or disable various WebGL features.
 *                                             If unspecified, STANDARD_CONTEXT_ATTRIBUTES are used.
 *                                             @see STANDARD_CONTEXT_ATTRIBUTES
 *                                             @see{@link https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2}
 */
export class GPGPUtility {
  constructor(width_, height_, attributes_) {
    this.canvasHeight = height_
    this.problemHeight = this.canvasHeight
    this.canvasWidth = width_
    this.problemWidth = this.canvasWidth
    this.attributes =
      typeof attributes_ === 'undefined'
        ? GPGPUtility.STANDARD_CONTEXT_ATTRIBUTES
        : attributes_
    this.canvas = this.makeGPCanvas(this.canvasWidth, this.canvasHeight)
    this.gl = this.getGLContext()
    // Attempt to activate the extension, returns null if unavailable
    this.textureFloat = this.gl.getExtension('OES_texture_float')
  }

  getStandardVertexShader() {
    if (!this.standardVertexShader) {
      this.vertexShaderSource =
        'attribute vec3 position;' +
        'attribute vec2 textureCoord;' +
        '' +
        'varying highp vec2 vTextureCoord;' +
        '' +
        'void main()' +
        '{' +
        '  gl_Position = vec4(position, 1.0);' +
        '  vTextureCoord = textureCoord;' +
        '}'

      this.standardVertexShader = this.compileShader(
        this.vertexShaderSource,
        this.gl.VERTEX_SHADER
      )
    }

    return this.standardVertexShader
  }

  createProgram(vertexShaderSource, fragmentShaderSource) {
    let fragmentShader
    let program
    let vertexShader

    program = this.gl.createProgram()

    // This will compile the shader into code for your specific graphics card.
    if (typeof vertexShaderSource !== 'string') {
      // What is passed in is not a string, use the standard vertex shader
      vertexShader = this.getStandardVertexShader()
    } else {
      // It's a string, so compile it.
      vertexShader = this.compileShader(
        vertexShaderSource,
        this.gl.VERTEX_SHADER
      )
    }
    fragmentShader = this.compileShader(
      fragmentShaderSource,
      this.gl.FRAGMENT_SHADER
    )

    // The program consists of our shaders
    this.gl.attachShader(program, vertexShader)
    this.gl.attachShader(program, fragmentShader)

    // Create a runnable program for our graphics hardware.
    // Allocates and assigns memory for attributes and uniforms (explained later)
    // Shaders are checked for consistency.
    this.gl.linkProgram(program)

    // Shaders are no longer needed as separate objects
    if (this.vertexShader !== this.standardVertexShader) {
      // Only delete the vertex shader if source was explicitly supplied
      this.gl.deleteShader(this.vertexShader)
    }
    this.gl.deleteShader(this.fragmentShader)

    return program
  }

  getAttribLocation(program, name) {
    var attributeLocation

    attributeLocation = this.gl.getAttribLocation(program, name)
    if (attributeLocation === -1) {
      alert('Can not find attribute ' + name + '.')
    }

    return attributeLocation
  }

  getUniformLocation(program, name) {
    let reference

    reference = this.gl.getUniformLocation(program, name)
    if (reference === -1) {
      alert('Can not find uniform ' + name + '.')
    }
    return reference
  }

  makeTexture(type, data) {
    return this.makeSizedTexture(
      this.problemWidth,
      this.problemHeight,
      type,
      data
    )
  }

  attachFrameBuffer(texture) {
    var frameBuffer

    // Create a framebuffer
    frameBuffer = this.gl.createFramebuffer()
    // Make it the target for framebuffer operations - including rendering.
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, frameBuffer)
    this.gl.framebufferTexture2D(
      this.gl.FRAMEBUFFER, // The target is always a FRAMEBUFFER.
      this.gl.COLOR_ATTACHMENT0, // We are providing the color buffer.
      this.gl.TEXTURE_2D, // This is a 2D image texture.
      texture, // The texture.
      0
    ) // 0, we aren't using MIPMAPs

    return frameBuffer
  }

  frameBufferIsComplete() {
    var message
    var status
    var value

    status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER)

    switch (status) {
      case this.gl.FRAMEBUFFER_COMPLETE:
        message = 'Framebuffer is complete.'
        value = true
        break
      case this.gl.FRAMEBUFFER_UNSUPPORTED:
        message = 'Framebuffer is unsupported'
        value = false
        break
      case this.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
        message = 'Framebuffer incomplete attachment'
        value = false
        break
      case this.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
        message = 'Framebuffer incomplete (missmatched) dimensions'
        value = false
        break
      case this.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
        message = 'Framebuffer incomplete missing attachment'
        value = false
        break
      default:
        message = 'Unexpected framebuffer status: ' + status
        value = false
    }
    return { isComplete: value, message: message }
  }

  compileShader(shaderSource, shaderType) {
    let shader = this.gl.createShader(shaderType)
    this.gl.shaderSource(shader, shaderSource)
    this.gl.compileShader(shader)

    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)
    if (!success) {
      throw 'Shader compile failed with:' + this.gl.getShaderInfoLog(shader)
    }

    return shader
  }

  /**
   * Create a canvas for computational use. Computations don't
   * require attachment to the DOM.
   *
   * @param {number} canvasWidth The width (x-dimension) of the problem domain.
   * @param {number} canvasHeight The height (y-dimension) of the problem domain.
   *
   * @returns {HTMLCanvasElement} A canvas with the given height and width.
   */
  makeGPCanvas(canvasWidth, canvasHeight) {
    let canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    return canvas
  }

  getCanvas() {
    return this.canvas
  }

  /**
   * Get a 3d context, webgl or experimental-webgl. The context presents a
   * javascript API that is used to draw into it. The webgl context API is
   * very similar to OpenGL for Embedded Systems, or OpenGL ES.
   *
   * @returns {WebGLRenderingContext} A manifestation of OpenGL ES in JavaScript.
   */
  getGLContext() {
    // Only fetch a gl context if we haven't already
    if (!this.gl) {
      this.gl =
        this.canvas.getContext('webgl', this.attributes) ||
        this.canvas.getContext('experimental-webgl', this.attributes)
    }

    return this.gl
  }

  /**
   * Return a standard geometry with texture coordinates for GPGPU calculations.
   * A simple triangle strip containing four vertices for two triangles that
   * completely cover the canvas. The included texture coordinates range from
   * (0, 0) in the lower left corner to (1, 1) in the upper right corner.
   *
   * @returns {Float32Array} A set of points and textures suitable for a two triangle
   *                         triangle fan that forms a rectangle covering the canvas
   *                         drawing surface.
   */
  getStandardGeometry() {
    // Sets of x,y,z(=0),s,t coordinates.
    return new Float32Array([
      -1.0,
      1.0,
      0.0,
      0.0,
      1.0, // upper left
      -1.0,
      -1.0,
      0.0,
      0.0,
      0.0, // lower left
      1.0,
      1.0,
      0.0,
      1.0,
      1.0, // upper right
      1.0,
      -1.0,
      0.0,
      1.0,
      0.0
    ]) // lower right
  }

  /**
   * Return verticies for the standard geometry. If they don't yet exist,
   * they are created and loaded with the standard geometry. If they already
   * exist, they are bound and returned.
   *
   * @returns {WebGLBuffer} A bound buffer containing the standard geometry.
   */
  getStandardVertices() {
    if (!this.standardVertices) {
      this.standardVertices = this.gl.createBuffer()
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.standardVertices)
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        this.getStandardGeometry(),
        this.gl.STATIC_DRAW
      )
    } else {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.standardVertices)
    }
    return this.standardVertices
  }

  /**
   * Check if floating point textures are available. This is an optional feature,
   * and even if present are usually not usable as a rendering target.
   */
  isFloatingTexture() {
    return this.textureFloat !== null
  }

  /**
   * The object returned from getExtension, which contains any constants or functions
   * provided by the extension. Or null if the extension is unavailable.
   *
   * @returns {Object} The object returned from this.gl.getExtension('OES_texture_float')
   *
   * @see {https://www.khronos.org/registry/webgl/specs/1.0/#5.14.14}
   */
  getFloatingTexture() {
    return this.textureFloat
  }

  /**
   * Set a height and width for the simulation steps when they are different than
   * the canvas height and width.
   *
   * @param {number} height The height of the simulation.
   * @param {number} width  The width of the simulation.
   */
  setProblemSize(width, height) {
    this.problemHeight = height
    this.problemWidth = width
  }

  getComputeContext() {
    if (
      this.problemWidth != this.canvasWidth ||
      this.problemHeight != this.canvasHeight
    ) {
      this.gl.viewport(0, 0, this.problemWidth, this.problemHeight)
    }
    return this.gl
  }

  getRenderingContext() {
    if (
      this.problemWidth !== this.canvasWidth ||
      this.problemHeight !== this.canvasHeight
    ) {
      this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight)
    }
    return this.gl
  }

  refreshTexture(texture, type, data) {
    // Bind the texture so the following methods effect it.
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture)

    // Replace the texture data
    this.gl.texSubImage2D(
      this.gl.TEXTURE_2D, // Target, matches bind above.
      0, // Level of detail.
      0, // xOffset
      0, // yOffset
      this.problemWidth, // Width - normalized to s.
      this.problemHeight, // Height - normalized to t.
      this.gl.RGBA, // Format for each pixel.
      type, // Data type for each chanel.
      data
    ) // Image data in the described format.

    // Unbind the texture.
    this.gl.bindTexture(this.gl.TEXTURE_2D, null)

    return texture
  }

  makeSizedTexture(width, height, type, data) {
    const texture = this.gl.createTexture()
    // Bind the texture so the following methods effect this texture.
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.NEAREST
    )
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.NEAREST
    )
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    )
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    )
    // Pixel format and data for the texture
    this.gl.texImage2D(
      this.gl.TEXTURE_2D, // Target, matches bind above.
      0, // Level of detail.
      this.gl.RGBA, // Internal format.
      width, // Width - normalized to s.
      height, // Height - normalized to t.
      0, // Always 0 in OpenGL ES.
      this.gl.RGBA, // Format for each pixel.
      type, // Data type for each chanel.
      data
    ) // Image data in the described format, or null.
    // Unbind the texture.
    this.gl.bindTexture(this.gl.TEXTURE_2D, null)

    return texture
  }

  getPixels() {
    // One each for RGBA component of each pixel
    const buffer = new Float32Array(this.problemWidth * this.problemHeight * 4)
    // Read a 1x1 block of pixels, a single pixel
    this.gl.readPixels(
      0, // x-coord of lower left corner
      0, // y-coord of lower left corner
      this.problemWidth, // width of the block
      this.problemHeight, // height of the block
      this.gl.RGBA, // Format of pixel data.
      this.gl.FLOAT, // Data type of the pixel data, must match makeTexture
      buffer
    ) // Load pixel data into buffer

    return buffer
  }
}

// Disable attributes unused in computations.
GPGPUtility.STANDARD_CONTEXT_ATTRIBUTES = {
  alpha: false,
  depth: false,
  antialias: false
}
