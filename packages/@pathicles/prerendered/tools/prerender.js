/* eslint-env node, browser */

const prerender = require('puppeteer')
const path = require('path')
const fs = require('fs-extra-plus')

const Jimp = require('jimp')

// const imagemin = require('imagemin')
// const ImageminGm = require('imagemin-gm')
// const imageminGm = new ImageminGm()
// const imageminJpegoptim = require('imagemin-jpegoptim')
// const imageminPngquant = require('imagemin-pngquant')

// const plugins = [
//   imageminGm.resize({ width: 200, height: 200, gravity: 'Center' })
// ]

// const Type = require('js-binary').Type
// const binarySchema = new Type({

//   tick: 'int',
//   data: {
//     position: ['int'],
//     particleTypes: ['int']
//   }
// })

const width = 750
const height = 750
const deviceScaleFactor = 2

const port = process.env.npm_package_config_devPort

const urlBase = 'http://localhost:' + port + '/simulator/'
const outputFolderPath = path.join(
  __dirname,
  '..',
  '..',
  'prerendered',
  'files'
)

let presets = ['story-electric', 'story-quadrupole', 'story-dipole']

const queryString = '&debug=false&print=true&prerender=true'

;(async () => {
  const browser = await prerender.launch({
    headless: false
    // executablePath:
    //   '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  })

  for (let i = 0; i < presets.length; i++) {
    const page = await browser.newPage()
    const preset = presets[i]
    await page.setViewport({ width, height, deviceScaleFactor })
    await page.goto(urlBase + '?prerender=1&presetName=' + preset + queryString)
    await page.waitForTimeout(1000)

    await page.screenshot({
      quality: 100,
      path: path.join(outputFolderPath, 'orig', preset + '.jpg')
    })

    const dump = await page.evaluate(() => {
      return window.pathicles.simulation.dump()
    })
    if (dump.data) {
      let reducedData = {
        // tick: dump.tick,
        // configuration: dump.configuration,
        data: {
          position: dump.data.position.map((d) => d),
          particleTypes: dump.data.particleTypes
        }
      }

      fs.writeFileSync(
        path.join(outputFolderPath, preset + '.json'),
        JSON.stringify(reducedData)
      )
    }
  }

  const images = await fs.glob(outputFolderPath + '/orig/*.{jpg,png}')
  console.log(images)
  await Promise.all(
    images.map(async (imgPath) => {
      const image = await Jimp.read(imgPath)
      await image.resize(width * 2, height * 2)
      await image.quality(60)
      await image.writeAsync(imgPath.replace('orig', 'compressed@2x'))
    })
  )
  await Promise.all(
    images.map(async (imgPath) => {
      const image = await Jimp.read(imgPath)
      await image.resize(width, height)
      await image.quality(60)
      await image.writeAsync(imgPath.replace('orig', 'compressed@1x'))
    })
  )

  await browser.close()
})()
