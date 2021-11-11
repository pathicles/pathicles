import { loop } from './loop'

const GL_BYTE = 5120
const GL_UNSIGNED_BYTE = 5121
const GL_SHORT = 5122
const GL_UNSIGNED_SHORT = 5123
const GL_INT = 5124
const GL_UNSIGNED_INT = 5125
const GL_FLOAT = 5126

function nextPow16(v) {
  for (let i = 16; i <= 1 << 28; i *= 16) {
    if (v <= i) {
      return i
    }
  }
  return 0
}

function log2(v) {
  let r, shift
  r = (v > 0xffff) << 4
  v >>>= r
  shift = (v > 0xff) << 3
  v >>>= shift
  r |= shift
  shift = (v > 0xf) << 2
  v >>>= shift
  r |= shift
  shift = (v > 0x3) << 1
  v >>>= shift
  r |= shift
  return r | (v >> 1)
}

function createPool() {
  const bufferPool = loop(8, function () {
    return []
  })

  function alloc(n) {
    const sz = nextPow16(n)
    const bin = bufferPool[log2(sz) >> 2]
    if (bin.length > 0) {
      return bin.pop()
    }
    return new ArrayBuffer(sz)
  }

  function free(buf) {
    bufferPool[log2(buf.byteLength) >> 2].push(buf)
  }

  function allocType(type, n) {
    let result = null
    switch (type) {
      case GL_BYTE:
        result = new Int8Array(alloc(n), 0, n)
        break
      case GL_UNSIGNED_BYTE:
        result = new Uint8Array(alloc(n), 0, n)
        break
      case GL_SHORT:
        result = new Int16Array(alloc(2 * n), 0, n)
        break
      case GL_UNSIGNED_SHORT:
        result = new Uint16Array(alloc(2 * n), 0, n)
        break
      case GL_INT:
        result = new Int32Array(alloc(4 * n), 0, n)
        break
      case GL_UNSIGNED_INT:
        result = new Uint32Array(alloc(4 * n), 0, n)
        break
      case GL_FLOAT:
        result = new Float32Array(alloc(4 * n), 0, n)
        break
      default:
        return null
    }
    if (result.length !== n) {
      return result.subarray(0, n)
    }
    return result
  }

  function freeType(array) {
    free(array.buffer)
  }

  return {
    alloc: alloc,
    free: free,
    allocType: allocType,
    freeType: freeType
  }
}

const pool = createPool()

// zero pool for initial zero data
pool.zero = createPool()

export { pool }
