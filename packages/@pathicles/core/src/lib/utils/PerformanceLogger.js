/* eslint-env browser */
// const Debug = require('debug')
//
// const log = Debug('pathicles:log')
// const error = Debug('pathicles:error')
// import PerformanceLogger from './../utils/PerformanceLogger'
//
// export { log, error, PerformanceLogger }

export class PerformanceLogger {
  constructor(active = true, maxEntries = 100) {
    if (window.performanceLogger) return window.performanceLogger
    performance.clearMarks()
    performance.clearMeasures()
    this.current = null
    this.active = active
    this.running = false
    this.maxEntries = maxEntries
    this.entryCount = 0
    this.entries = []
    window.performanceLogger = this
  }

  start(markName) {
    if (this.active && this.entryCount < this.maxEntries) {
      this.entryCount++
      this.markName = markName
      performance.mark(this.markName)
    }
  }
  stop() {
    if (this.active) {
      performance.mark(this.markName + ' (stop)')
      this.markName = null
      this.running = false
    }
  }

  report() {
    if (this.running) this.stop()

    const round = (x) => x.toFixed(1) * 1

    const marks = performance.getEntriesByType('mark')
    const measures = marks.map((mark, m) => ({
      name: mark.name,
      Δt: round(
        marks[Math.min(m + 1, marks.length - 1)].startTime - mark.startTime
      )
      // t0: round(mark.startTime),
      // t_next: round(marks[Math.min(m + 1, marks.length - 1)].startTime)
    }))

    return measures.filter((m) => m.name.indexOf('stop') === -1)
  }
}
