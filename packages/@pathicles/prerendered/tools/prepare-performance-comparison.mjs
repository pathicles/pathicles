import { csvFormat, csvParse } from 'd3-dsv'
import { ascending, sort } from 'd3-array'
import { readFileSync, writeFileSync } from 'fs'

const data = csvParse(
  readFileSync('./../files/performance.csv').toString(),
  (d) => ({
    gpuTime: +d.gpuTime,
    packFloat2UInt8: d.packFloat2UInt8 === 'true',
    snapshotCount: +d.snapshotCount,
    particleCount: +d.particleCount,
    preset: d.preset
  })
).filter(
  ({ preset, snapshotCount, particleCount }) =>
    preset.indexOf('random') > -1 &&
    snapshotCount < 2000 &&
    particleCount < 2000
)

const result = {}

data.forEach((d) => {
  const key = [d.snapshotCount, d.particleCount].join()
  let entry = result[key] || {
    snapshotCount: d.snapshotCount,
    particleCount: d.particleCount
  }
  if (d.packFloat2UInt8) entry.webgl_uint = d.gpuTime
  else entry.webgl_float = d.gpuTime
  result[key] = entry
})

const entries = sort(Object.values(result), (a, b) =>
  ascending(a.snapshotCount, b.snapshotCount)
)

writeFileSync('./../files/performance-comparison.csv', csvFormat(entries))
