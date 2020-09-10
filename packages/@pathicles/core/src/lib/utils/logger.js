const Debug = require('debug')

const log = Debug('pathicles:log')
const error = Debug('pathicles:error')
import PerformanceLogger from './../utils/PerformanceLogger'

export { log, error, PerformanceLogger }
