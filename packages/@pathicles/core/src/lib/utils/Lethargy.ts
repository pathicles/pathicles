export class Lethargy {
  constructor(stability, sensitivity, tolerance, delay) {
    this.stability = stability != null ? Math.abs(stability) : 8
    this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100
    this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1
    this.delay = delay != null ? delay : 150

    this.lastUpDeltas = []
    let i, ref
    for (
      i = 1, ref = this.stability * 2;
      1 <= ref ? i <= ref : i >= ref;
      1 <= ref ? i++ : i--
    ) {
      this.lastUpDeltas.push(null)
    }

    this.lastDownDeltas = []
    for (
      i = 1, ref = this.stability * 2;
      1 <= ref ? i <= ref : i >= ref;
      1 <= ref ? i++ : i--
    ) {
      this.lastDownDeltas.push(null)
    }

    this.deltasTimestamp = []
    for (
      i = 1, ref = this.stability * 2;
      1 <= ref ? i <= ref : i >= ref;
      1 <= ref ? i++ : i--
    ) {
      this.deltasTimestamp.push(null)
    }
  }

  check(e) {
    let lastDelta
    e = e.originalEvent || e
    if (e.wheelDelta != null) {
      lastDelta = e.wheelDelta
    } else if (e.deltaY != null) {
      lastDelta = e.deltaY * -40
    } else if (e.detail != null || e.detail === 0) {
      lastDelta = e.detail * -40
    }
    this.deltasTimestamp.push(Date.now())
    this.deltasTimestamp.shift()
    if (lastDelta > 0) {
      this.lastUpDeltas.push(lastDelta)
      this.lastUpDeltas.shift()
      return this.isInertia(1)
    } else {
      this.lastDownDeltas.push(lastDelta)
      this.lastDownDeltas.shift()
      return this.isInertia(-1)
    }
  }

  isInertia(direction) {
    let lastDeltas,
      lastDeltasNew,
      lastDeltasOld,
      newAverage,
      newSum,
      oldAverage,
      oldSum
    lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas
    if (lastDeltas[0] === null) {
      return direction
    }
    if (
      this.deltasTimestamp[this.stability * 2 - 2] + this.delay > Date.now() &&
      lastDeltas[0] === lastDeltas[this.stability * 2 - 1]
    ) {
      return false
    }
    lastDeltasOld = lastDeltas.slice(0, this.stability)
    lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2)
    oldSum = lastDeltasOld.reduce(function (t, s) {
      return t + s
    })
    newSum = lastDeltasNew.reduce(function (t, s) {
      return t + s
    })
    oldAverage = oldSum / lastDeltasOld.length
    newAverage = newSum / lastDeltasNew.length
    if (
      Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) &&
      this.sensitivity < Math.abs(newAverage)
    ) {
      return direction
    } else {
      return false
    }
  }

  showLastUpDeltas() {
    return this.lastUpDeltas
  }

  showLastDownDeltas() {
    return this.lastDownDeltas
  }
}
