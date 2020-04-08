/* eslint-env node, browser */

const screenshots = require('puppeteer')
const path = require('path')
const fs = require('fs')

const Type = require('js-binary').Type
const binarySchema = new Type({
  tick: 'int',
  data: {
    position: ['int'],
    particleTypes: ['int']
  }
})

const port = process.env.npm_package_config_devPort

const urlBase = 'http://localhost:' + port + '/simulator/'
const outputFolderPath = path.join(__dirname, '..', 'images')

let presets = ['story-electric', 'story-quadrupole', 'story-dipole']
// presets = ['story-quadrupole']

const queryString = '?debug=false&print=true'

;(async () => {
  const browser = await screenshots.launch({
    headless: false
    // executablePath:
    //   '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  })

  for (let i = 0; i < presets.length; i++) {
    const page = await browser.newPage()
    const preset = presets[i]
    await page.setViewport({ width: 1500, height: 1500, deviceScaleFactor: 1 })
    await page.goto(urlBase + preset + queryString)
    await page.waitFor(1000)

    await page.screenshot({
      path: path.join(outputFolderPath, preset + '.jpg')
    })
    await page.screenshot({
      path: path.join(outputFolderPath, preset + '.png')
    })

    const data = await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      //
      //
      //
      //
      const data = window.pathicles.simulation.dump()
      return data
      // console.log(data)
      // return window.data
    })
    if (data.data) {
      // const encoded = binarySchema.encode(data)
      // const decoded = binarySchema.decode(encoded)
      // fs.writeFileSync(
      //   path.join(__dirname, '..', 'src', 'data', preset + '.dat'),
      //   encoded
      // )
      //
      // fs.writeFileSync(
      //   path.join(__dirname, '..', 'src', 'data', preset + '.blob'),
      //   new Buffer.from(data.data.position)
      // )
      // // const blob = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', preset + '.blob'))

      fs.writeFileSync(
        path.join(__dirname, '..', 'src', 'data', preset + '.json'),
        JSON.stringify(data)
      )
    }
  }

  await browser.close()
})()