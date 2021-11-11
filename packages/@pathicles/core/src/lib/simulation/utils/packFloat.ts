function abs(x) {
  if (x.length) {
    return x.map(abs)
  }
  return Math.abs(x)
}
function log2(x) {
  if (x.length) {
    return x.map(log2)
  }
  return Math.log2(x)
}
function floor(x) {
  if (x.length) {
    return x.map(floor)
  }
  return Math.floor(x)
}
function pow(x, y) {
  if (x.length) {
    return x.map(function (x, i) {
      return Math.pow(x, y[i])
    })
  }
  return Math.pow(x, y)
}
function step(edge, x) {
  if (!x && !edge) {
    return 0
  }
  if (x.length) {
    if (edge.length) {
      return x.map(function (x, i) {
        return step(edge[i], x)
      })
    }
    return x.map(function (x) {
      return step(edge, x)
    })
  }

  return x < edge ? 0.0 : 1.0
}
export function packFloat(v) {
  const av = abs(v)
  if (av < 1.17549435e-38) {
    return [0, 0, 0, 0]
  } else {
    if (v > 1.70141184e38) {
      return [0.4980392156862745, 0.5019607843137255, 0, 0]
    } else {
      if (v < -1.70141184e38) {
        return [1, 0.5019607843137255, 0, 0]
      }
    }
  }
  const c = [0, 0, 0, 0]
  const e = floor(log2(av))
  let m = av * pow(2.0, -e) - 1.0
  c[1] = floor(128.0 * m)
  m -= c[1] / 128.0
  c[2] = floor(32768.0 * m)
  m -= c[2] / 32768.0
  c[3] = floor(8388608.0 * m)
  let ebias = e + 127.0
  c[0] = floor(ebias / 2.0)
  ebias -= c[0] * 2.0
  c[1] += floor(ebias) * 128.0
  c[0] += 128.0 * step(0.0, -v)
  return [c[0], c[1], c[2], c[3]]
  // return [c[0] / 255.0, c[1] / 255.0, c[2] / 255.0, c[3] / 255.0]
}
