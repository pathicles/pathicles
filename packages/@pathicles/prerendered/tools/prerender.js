/* eslint-env node, browser */

const prerender = require('puppeteer')
const path = require('path')
const fs = require('fs-extra-plus')

const sharp = require('sharp')

const defaultWidth = 750
const defaultHeight = 750
const deviceScaleFactor = 2

const port = process.env.npm_package_config_devPort || 9303

const urlBase = 'http://localhost:' + port + '/simulator/'
const outputFolderPath = path.join(
  __dirname,
  '..',
  '..',
  'prerendered',
  'files'
)

const jobs = [
  { preset: 'story-electric' },
  { preset: 'story-quadrupole' },
  { preset: 'story-dipole' }
]

const queryString = '&debug=false&print=true&prerender=true'

// eslint-disable-next-line no-unused-vars
const createImages = async () => {
  const browser = await prerender.launch({
    headless: false
    // executablePath:
    //   '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  })

  for (let i = 0; i < jobs.length; i++) {
    const page = await browser.newPage()
    const preset = jobs[i].preset
    const width = jobs[i].width || defaultWidth
    const height = jobs[i].height || defaultHeight
    await page.setViewport({
      width,
      height,
      deviceScaleFactor
    })
    await page.goto(
      urlBase + '?debug=0&prerender=1&presetName=' + preset + queryString
    )
    await page.waitForTimeout(1000)

    await page.screenshot({
      path: path.join(outputFolderPath, 'orig', preset + '.png')
    })

    const dump = await page.evaluate(() => {
      return window.pathicles.simulation.dump()
    })
    console.log(dump)
    fs.writeJSONSync(path.join(outputFolderPath, preset + '.json'), {
      iteration: dump.iteration,
      configuration: dump.configuration,
      data: {
        position: dump.position.map((d) => d),
        particleTypes: dump.particleTypes
      }
    })
  }
  await browser.close()
}

const imagePaths = async () => {
  return await fs.glob(outputFolderPath + '/orig/*.png')
}

const convertImagesSharp = async () => {
  const qualities = [20, 40, 60, 80]

  await Promise.all(
    (await imagePaths()).map(async (imgPath) => {
      let image_1 = await sharp(imgPath)
        .resize(defaultWidth, defaultHeight)
        .toFile(imgPath.replace('orig', 'compressed@1x'), (err, info) => {
          console.log(err, info)
        })

      let image_2 = await sharp(imgPath)
        .resize(defaultWidth * 2, defaultHeight * 2)
        .toFile(imgPath.replace('orig', 'compressed@2x'), (err, info) => {
          console.log(err, info)
        })

      qualities.forEach((quality) => {
        image_1
          .toFormat('jpg', { quality })
          .toFile(
            imgPath
              .replace('orig', 'compressed@1x')
              .replace('.png', `_${quality}.jpg`),
            (err, info) => {
              console.log(err, info)
            }
          )
        image_2
          .toFormat('jpg', { quality })
          .toFile(
            imgPath
              .replace('orig', 'compressed@2x')
              .replace('.png', `_${quality}.jpg`),
            (err, info) => {
              console.log(err, info)
            }
          )
      })
    })
  )
}

;(async () => {
  await createImages()
  await convertImagesSharp()
})()
