/* eslint-disable */
import PerformanceLogger from './PerformanceLogger'

function log(msg) {
  // var div = document.createElement("div");
  // div.appendChild(document.createTextNode(msg));
  // document.body.appendChild(div);
  console.log(msg)
}

function glEnum(gl, v) {
  for (var key in gl) {
    if (gl[key] === v) {
      return key
    }
  }
  return '0x' + v.toString(16)
}

function getExt(gl, name, msg) {
  var ext = glContext.getExtension(name)
  log((ext ? 'can ' : 'can **NOT** ') + msg)
  return ext
}

//test if it is possible to do RTT with FLOAT/HALF FLOAT textures :
function  test_canRTT(glContext, internalFormat, pixelType) {
  var testFbo = glContext.createFramebuffer()
  glContext.bindFramebuffer(glContext.FRAMEBUFFER, testFbo)

  var testTexture = glContext.createTexture()
  glContext.bindTexture(glContext.TEXTURE_2D, testTexture)
  glContext.texImage2D(
    glContext.TEXTURE_2D,
    0,
    internalFormat,
    1,
    1,
    0,
    glContext.RGBA,
    pixelType,
    null
  )

  glContext.framebufferTexture2D(
    glContext.FRAMEBUFFER,
    glContext.COLOR_ATTACHMENT0,
    glContext.TEXTURE_2D,
    testTexture,
    0
  )
  var fbStatus = glContext.checkFramebufferStatus(glContext.FRAMEBUFFER)

  return fbStatus === glContext.FRAMEBUFFER_COMPLETE
}

function getRTTFloatType(glContext) {
  if (

    glContext.getExtension('WEBGL_color_buffer_float') &&
    glContext.getExtension('OES_texture_float') &&
    test_canRTT(glContext, glContext.RGBA, glContext.FLOAT)
  ) {
    return 'float'
  }
  if (
    glContext.getExtension('WEBGL_color_buffer_float') &&
    glContext.getExtension('OES_texture_half_float') &&
    test_canRTT(glContext, glContext.RGBA, glContext.HALF_FLOAT)
  ) {
    return 'half float'
  }
  return null
}

export function checkSupport() {
  // Get A WebGL context
  const support = {}
  try {
    const canvas = document.createElement('canvas')
    if (
      !!window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    ) {
      const glContext =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

      PerformanceLogger.start('getRTTFloatType')

      support.RTTFloatType = getRTTFloatType(glContext)

      PerformanceLogger.stop()
      //
      // console.log(gl)
      // var testFloat = getExt(
      //   gl,
      //   'OES_texture_float',
      //   'make floating point textures'
      // )
      // getExt(
      //   gl,
      //   'OES_texture_float_linear',
      //   'linear filter floating point textures'
      // )
      // var testHalfFloat = getExt(
      //   gl,
      //   'OES_texture_half_float',
      //   'make half floating point textures'
      // )
      // getExt(
      //   gl,
      //   'OES_texture_half_float_linear',
      //   'linear filter half floating point textures'
      // )

      support.precision = {
        VERTEX_SHADER: {
          LOW_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.LOW_FLOAT
          ),
          MEDIUM_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.MEDIUM_FLOAT
          ),
          HIGH_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.HIGH_FLOAT
          ),
          LOW_INT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.LOW_INT
          ),
          MEDIUM_INT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.MEDIUM_INT
          ),
          HIGH_INT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.HIGH_INT
          )
        },
        FRAGMENT_SHADER: {
          LOW_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.LOW_FLOAT
          ),
          MEDIUM_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.MEDIUM_FLOAT
          ),
          HIGH_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.HIGH_FLOAT
          ),
          LOW_INT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.LOW_INT
          ),
          MEDIUM_INT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.MEDIUM_INT
          ),
          HIGH_INT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.HIGH_INT
          )
        }
      }
      return support
    }
  } catch (e) {
    throw e
  }
}
