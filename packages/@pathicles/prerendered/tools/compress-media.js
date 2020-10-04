/* eslint-env node */

const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const fs = require('fs')

;(async () => {
  const files = await imagemin(['./../prerendered/*.{jpg}'], {
    destination: './../prerendered/', //./../../strategie-2030/src/media/spread-backgrounds',
    plugins: [
      imageminJpegtran({
        quality: [0.7, 1.0],
        verbose: true
      })
    ]
  })
  console.log(files)
})()
