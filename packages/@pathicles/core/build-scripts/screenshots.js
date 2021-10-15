const screenshots = require('puppeteer')
const path = require('path')
const fs = require('fs')

const port = process.env.npm_package_config_devPort

const urlBase = 'http://localhost:' + port + '/#/simulator/'
const outputFolderPath = path.join(__dirname, '..', 'images')

const presets = ['story-electric', 'story-quadrupole', 'story-dipole']

// const config = ['story-quadrupole']

;(async () => {
  const browser = await screenshots.launch({ headless: false })

  for (let i = 0; i < presets.length; i++) {
    const page = await browser.newPage()
    const preset = presets[i]
    await page.setViewport({ width: 1500, height: 1500, deviceScaleFactor: 1 })
    await page.goto(urlBase + preset)
    await page.waitFor(1000)

    await page.screenshot({
      path: path.join(outputFolderPath, preset + '.jpg')
    })
    await page.screenshot({
      path: path.join(outputFolderPath, preset + '.png')
    })

    const data = await page.evaluate(() => window.data)
    if (data.data) {
      fs.writeFileSync(
        path.join(__dirname, '..', 'src', 'data', preset + '.json'),
        JSON.stringify(data)
      )
    }
  }

  await browser.close()
})()
