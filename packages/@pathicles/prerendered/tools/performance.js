/* eslint-env node, browser */

const prerender = require('puppeteer')
const { join } = require('path')
const { ensureDirSync, existsSync, appendFileSync } = require('fs-extra-plus')
const json2csv = require('json2csv').parse

// const defaultWidth = 100
// const defaultHeight = 100
// const deviceScaleFactor = 1

const round = (d, precision = 2) =>
  Math.round(d * Math.pow(10, precision)) / Math.pow(10, precision)

const urlBase = 'https://localhost/simulator/'
const OUTPUT_FOLDER_PATH = join(__dirname, '..', 'files')

ensureDirSync(OUTPUT_FOLDER_PATH)

const CSV_FILEPATH_NAME = join(OUTPUT_FOLDER_PATH, 'performance.csv')

const writeCSV = async (data) => {
  // output file in the same folder
  let rows
  // If file doesn't exist, we will create new file and add rows with headers.
  if (!existsSync(CSV_FILEPATH_NAME)) {
    rows = json2csv(data, { header: true })
  } else {
    // Rows without headers.
    rows = json2csv(data, { header: false })
  }

  // Append file function can create new file too.
  appendFileSync(CSV_FILEPATH_NAME, rows)
  // Always add new line if file already exists.
  appendFileSync(CSV_FILEPATH_NAME, '\r\n')
}

const date = new Date().toISOString()

const jobs = []
;['js', 'glsl'].forEach((pusher) => {
  for (let p = 1; p < 11; p += 1) {
    for (let s = 1; s < 11; s += 1) {
      const particleCount = Math.pow(2, p)
      const snapshotCount = Math.pow(2, s)

      jobs.push({
        presetName: 'free-photons',
        particleCount,
        snapshotCount,
        pusher,
        query: `&particleCount=${particleCount}&snapshotCount=${snapshotCount}&pusher=${pusher}`
      })
    }
  }
})

console.log(jobs)

const queryString = '&debug=false&print=true&prerender=true'

// eslint-disable-next-line no-unused-vars
const runJobs = async () => {
  const browser = await prerender.launch({
    headless: false,
    waitForNavigation: 'networkidle0'
  })
  const page = await browser.newPage()

  for (let i = 0; i < jobs.length; i++) {
    const { presetName, query, particleCount, snapshotCount, pusher } = jobs[i]
    const queryExtended = (query || '') + queryString
    try {
      await page.goto(urlBase + '?presetName=' + presetName + queryExtended)
      await page.waitForTimeout(3000)

      const performanceEntry = await page.evaluate(async () => {
        const entries = await window.performanceLogger.report() //window.performanceLogger.entries

        return {
          time: entries[2].Δt,
          entries
        }
      })

      await writeCSV({
        date,
        presetName: presetName,
        pusher,
        log2ParticleCount: Math.log2(particleCount),
        log2SnapshotCount: Math.log2(snapshotCount),
        time: round(performanceEntry.time),
        particleCount,
        snapshotCount,
        query
      })

      console.log({
        preset: presetName,
        particleCount,
        snapshotCount,
        pusher,
        ...performanceEntry,
        time: round(performanceEntry.time)
      })
    } catch (e) {
      console.trace('Error occured for preset ', presetName, e)
    }
  }

  await browser.close()
}

;(async () => {
  await runJobs()
})()
