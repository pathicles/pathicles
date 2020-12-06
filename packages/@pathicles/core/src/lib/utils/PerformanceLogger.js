/* eslint-env browser */
// const Debug = require('debug')
//
// const log = Debug('pathicles:log')
// const error = Debug('pathicles:error')
// import PerformanceLogger from './../utils/PerformanceLogger'
//
// export { log, error, PerformanceLogger }

export class PerformanceLogger {
  constructor(active = true) {
    if (window.performanceLogger) return window.performanceLogger
    performance.clearMarks()
    performance.clearMeasures()
    this.current = null
    this.active = active
    this.running = false
    this.markName
    this.entries = []
    window.performanceLogger = this
  }

  start(markName) {
    if (this.markName) console.timeEnd(this.markName)
    console.time(markName)
    if (this.active) {
      // this.stop()
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

    const marks = performance.getEntriesByType('mark')
    const measures = marks.map((mark, m) => ({
      name: mark.name,
      t0: mark.startTime,
      t_next: marks[Math.min(m + 1, marks.length - 1)].startTime,
      dt: marks[Math.min(m + 1, marks.length - 1)].startTime - mark.startTime
    }))

    return measures
      .map(
        ({ name, dt }) => `
      ${name.padStart(25, ' ')}: ${dt.toFixed(1)}`
      )
      .join('\n')
  }
}
