/* eslint-env browser */

class PerformanceLogger {
  constructor(active = true) {
    if (window.performanceLogger) return window.performanceLogger

    this.current = null
    this.active = active
    this.entries = []
    window.performanceLogger = this
  }

  start(label) {
    if (this.active) {
      this.current = {
        label: label,
        t0: performance.now()
      }
    }
  }
  stop() {
    if (this.active) {
      this.current.t1 = performance.now()
      this.current.dt = this.current.t1 - this.current.t0

      this.entries.push(this.current)
    }
  }

  report() {
    return this.entries
      .map(
        ({ label, dt }) => `
      ${label.padStart(25, ' ')}: ${dt.toFixed(1)}`
      )
      .join('\n')
  }
}

export default new PerformanceLogger()
