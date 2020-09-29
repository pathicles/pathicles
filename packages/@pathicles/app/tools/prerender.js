/* eslint-env node, browser */

const prerender = require('puppeteer')
const path = require('path')
const fs = require('fs')

// const Type = require('js-binary').Type
// const binarySchema = new Type({
//   tick: 'int',
//   data: {
//     position: ['int'],
//     particleTypes: ['int']
//   }
// })

const port = process.env.npm_package_config_devPort

const urlBase = 'http://localhost:' + port + '/simulator/'
const outputFolderPath = path.join(__dirname, '..', 'prerendered')

let presets = ['story-electric', 'story-quadrupole', 'story-dipole']
// presets = ['story-quadrupole']

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
    await page.setViewport({ width: 750, height: 750, deviceScaleFactor: 2 })
    await page.goto(urlBase + '?presetName=' + preset + queryString)
    await page.waitForTimeout(1000)

    await page.screenshot({
      path: path.join(outputFolderPath, preset + '.jpg')
    })

    const data = await page.evaluate(() => {
      const data = window.pathicles.simulation.dump()
      return data
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

      let reducedData = {
        tick: data.tick,
        data: {
          position: data.data.position.map((d) => d),
          particleTypes: data.data.particleTypes
        }
      }

      fs.writeFileSync(
        path.join(outputFolderPath, preset + '.json'),
        JSON.stringify(reducedData)
      )
    }
  }

  await browser.close()
})()
