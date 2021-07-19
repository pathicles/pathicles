/* eslint-env node, browser */

const prerender = require('puppeteer-core')
const path = require('path')
const fs = require('fs-extra-plus')
// const ndarray = require('ndarray')
// const savePixels = require('save-pixels')
const sharp = require('sharp')

const defaultWidth = 1500
const defaultHeight = 750
const deviceScaleFactor = 2

const round = (d, precision = 2) =>
  Math.round(d * Math.pow(10, precision)) / Math.pow(10, precision)

const port = process.env.npm_package_config_devPort || 9303

const urlBase = 'http://localhost:' + port + '/simulator/'
const OUTPUT_FOLDER_PATH = path.join(__dirname, '..', 'files')

fs.ensureDirSync(OUTPUT_FOLDER_PATH)
fs.ensureDirSync(path.join(OUTPUT_FOLDER_PATH, 'compressed@1x'))
fs.ensureDirSync(path.join(OUTPUT_FOLDER_PATH, 'compressed@2x'))

const CSV_FILEPATH_NAME = path.join(OUTPUT_FOLDER_PATH, 'performance.csv')

const json2csv = require('json2csv').parse
const writeCSV = async (data) => {
  // output file in the same folder
  let rows
  // If file doesn't exist, we will create new file and add rows with headers.
  if (!fs.existsSync(CSV_FILEPATH_NAME)) {
    rows = json2csv(data, { header: true })
  } else {
    // Rows without headers.
    rows = json2csv(data, { header: false })
  }

  // Append file function can create new file too.
  fs.appendFileSync(CSV_FILEPATH_NAME, rows)
  // Always add new line if file already exists.
  fs.appendFileSync(CSV_FILEPATH_NAME, '\r\n')
}

const date = new Date().toISOString()

let jobs = [
  // { preset: 'pathicles-logo' },
  // { preset: 'csr' },
  // { preset: 'spiral' },
  // { preset: 'random' },
  // { preset: 'different-gammas' },
  // { preset: 'free-electron' },
  // { preset: 'free-electrons' },
  // { preset: 'free-photon' },
  // { preset: 'free-photons' },
  { preset: 'story-electric', data: true },
  { preset: 'story-quadrupole', data: true },
  { preset: 'story-dipole', data: true }
  // { preset: 'gyrotest-1-electron' },
  // { preset: 'gyrotest-128-electrons' }
]

// jobs = []
// for (let p2 = 0; p2 < 11; p2++) {
//   for (let s2 = 0; s2 < 11; s2++) {
//     jobs.push({ preset: `random__${Math.pow(2, p2)}__${Math.pow(2, s2)}` })
//   }
// }
console.log(jobs)

// jobs = [
//   ...jobs,
//   ...jobs.map((job) => ({ ...job, preset: job.preset + '-uint8', data: false }))
// ]
// console.log(jobs)

const queryString = '&debug=false&print=true&prerender=true'

// eslint-disable-next-line no-unused-vars
const createImages = async () => {
  const browser = await prerender.launch({
    headless: false,
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  })
  const page = await browser.newPage()

  for (let i = 0; i < jobs.length; i++) {
    const presetName = jobs[i].preset
    try {
      const width = jobs[i].width || defaultWidth
      const height = jobs[i].height || defaultHeight
      await page.setViewport({
        width,
        height,
        deviceScaleFactor
      })
      await page.goto(urlBase + '?presetName=' + presetName + queryString)
      await page.waitForTimeout(3000)

      await page.screenshot({
        path: path.join(OUTPUT_FOLDER_PATH, 'orig', presetName + '.png')
      })
      await page.screenshot({
        quality: 100,
        type: 'jpeg',
        path: path.join(OUTPUT_FOLDER_PATH, 'orig', presetName + '.jpg')
      })

      const performanceEntry = await page.evaluate(() => {
        const entries = window.performanceLogger.entries
        return {
          gpuTime: entries.reduce((acc, item) => {
            acc += item.stats.gpuTime
            return acc
          }, 0),

          packFloat2UInt8: entries[0].packFloat2UInt8,
          particleCount: entries[0].particleCount,
          snapshotCount: entries[0].snapshotCount,
          iterations: entries[0].iterations
        }
      })

      await writeCSV({
        date,
        preset: presetName,
        ...performanceEntry,
        gpuTime: round(performanceEntry.gpuTime)
      })

      console.log({
        preset: presetName,
        gpuTime: round(performanceEntry.gpuTime)
      })

      if (jobs[i].data) {
        const dump = await page.evaluate(() => {
          return window.pathicles.simulation.dump()
        })

        console.dir(dump)
        // const every_nth = (arr, nth) => arr.filter((e, i) => i % nth === 0)
        // const values = every_nth(dump.position, 4).map((d) => round(d))

        fs.writeJSONSync(path.join(OUTPUT_FOLDER_PATH, presetName + '.json'), {
          iteration: dump.logEntry.iteration,
          configuration: dump.configuration,
          name: presetName,
          data: {
            position: dump.packedPositions.flat(2),
            // position2: values,
            colorCorrections: dump.colorCorrections.map((d) => round(d)),
            // positionUint8: Array.from(
            //   new Uint8Array(new Float32Array(values).buffer)
            // ),
            particleTypes: dump.particleTypes
          }
        })

        // const dataAsNdarray = ndarray(
        //   new Uint8Array(new Float32Array(values).buffer),
        //   [128, 121, 4]
        // )
        // savePixels(dataAsNdarray, 'PNG').pipe(
        //   fs.createWriteStream(path.join(OUTPUT_FOLDER_PATH, preset + '.png'))
        // )
      }
    } catch (e) {
      console.error('Error occured for preset ', presetName, e)
    }
  }
  await browser.close()
}

const imagePaths = async () => {
  return await fs.glob(OUTPUT_FOLDER_PATH + '/orig/*.jpg')
}

const convertImagesSharp = async () => {
  // const qualities = [40]
  // const qualities = [20, 40, 50, 60, 80, 85, 90, 95, 100]
  const qualities = [70]

  await Promise.all(
    (
      await imagePaths()
    ).map(async (imgPath) => {
      let image_1 = await sharp(imgPath).resize(defaultWidth, defaultHeight)
      //   .toFile(imgPath.replace('orig', 'compressed@1x'), (err, info) => {
      //     console.log(err, info)
      //   })

      // let image_2 = await sharp(imgPath).resize(
      //   defaultWidth * 2,
      //   defaultHeight * 2
      // )
      // .toFile(imgPath.replace('orig', 'compressed@2x'), (err, info) => {
      //   console.log(err, info)
      // })

      qualities.forEach((quality) => {
        image_1
          .toFormat('jpg', { quality, progressive: true, optimiseScans: true })
          .toFile(
            imgPath.replace('orig', 'compressed@1x'),
            // .replace('.png', `_${quality}.jpg`),
            (err, info) => {
              console.log(err, info)
            }
          )
        // image_2
        //   .toFormat('jpg', { quality, progressive: true, optimiseScans: true })
        //   .toFile(
        //     imgPath
        //       .replace('orig', 'compressed@2x')
        //       .replace('.png', `_${quality}.jpg`),
        //     // .replace('.png', `.jpg`),
        //     (err, info) => {
        //       console.log(err, info)
        //     }
        //   )

        // image_1
        //   .toFormat('webp', { quality, progressive: true, optimiseScans: true })
        //   .toFile(
        //     imgPath
        //       .replace('orig', 'compressed@1x')
        //       .replace('.png', `_${quality}.webp`),
        //     (err, info) => {
        //       console.log(err, info)
        //     }
        //   )
        // image_2
        //   .toFormat('webp', { quality, progressive: true, optimiseScans: true })
        //   .toFile(
        //     imgPath
        //       .replace('orig', 'compressed@2x')
        //       .replace('.png', `_${quality}.webp`),
        //     // .replace('.png', `.jpg`),
        //     (err, info) => {
        //       console.log(err, info)
        //     }
        //   )
      })
    })
  )
}
;(async () => {
  await createImages(), await convertImagesSharp()
})()
