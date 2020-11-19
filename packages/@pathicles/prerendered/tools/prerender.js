/* eslint-env node, browser */

const prerender = require('puppeteer-core')
const path = require('path')
const fs = require('fs-extra-plus')
const savePixels = require('save-pixels')
const ndarray = require('ndarray')

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
  { preset: 'story-electric' }
  // { preset: 'story-quadrupole' },
  // { preset: 'story-dipole' }
]

const queryString = '&debug=false&print=true&prerender=true'

// eslint-disable-next-line no-unused-vars
const createImages = async () => {
  const browser = await prerender.launch({
    headless: false,
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
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
      return window.pathicles.simulation.log(false)
    })

    // create a write stream for the file
    let output = fs.createWriteStream(
      path.join(outputFolderPath, preset + '.png')
    )

    const particleCount = dump.configuration.model.emitter.particleCount
    const bufferLength = dump.configuration.model.bufferLength

    const shape = [particleCount, bufferLength]

    console.log(shape)
    console.log(dump.position)
    console.log(ndarray(new Uint8Array(dump.position), shape))

    savePixels(ndarray(dump.position, shape), 'png').pipe(output)

    // // // create a PNG encoder stream
    // let encoder = new PNGEncoder(shape[0], shape[1], {
    //   colorSpace: 'rgba'
    // })
    //
    // // create a readPixels stream for the FBO
    // // flip image on Y axis due to FBO coordinates
    // let pixels = pixelStream(
    //   dump.regl._gl,
    //   dump.positionFBO._framebuffer,
    //   shape,
    //   {
    //     flipY: true
    //   }
    // )
    // //
    // // // send pixels to encoder, then to file
    // pixels.pipe(encoder)
    // encoder.pipe(output)
    //
    // // // when file writing is finished
    // output.on('close', function () {
    //   console.log('Saved %dx%d buffer to image.png', shape[0], shape[1])
    //   console.timeEnd('render')
    //
    //   // quit the dev tools window when not in dev mode
    //   if (process.env.NODE_ENV === 'production') {
    //     window.close()
    //   }
    // })

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
  const qualities = [50] //[20, 40, 60, 80]

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
        image_1
          .toFormat('webp', { quality })
          .toFile(
            imgPath
              .replace('orig', 'compressed@1x')
              .replace('.png', `_${quality}.webp`),
            (err, info) => {
              console.log(err, info)
            }
          )
        image_2
          .toFormat('webp', { quality })
          .toFile(
            imgPath
              .replace('orig', 'compressed@2x')
              .replace('.png', `_${quality}.webp`),
            (err, info) => {
              console.log(err, info)
            }
          )
      })
    })
  )
}

;(async () => {
  // await createImages()
  await convertImagesSharp()
})()
