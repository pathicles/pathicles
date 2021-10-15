import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const pkg = require('./package.json')

import defaultRollup from './../dev-config/rollup.config.mjs'

export default defaultRollup(pkg)
