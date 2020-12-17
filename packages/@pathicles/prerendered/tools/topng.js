/* eslint-env node */

const { data } = require('../files/story-electric.json')

const every_nth = (arr, nth) => arr.filter((e, i) => i % nth === 0)
const values = every_nth(data.position, 4)
var ndarray = require('ndarray')
const savePixels = require('save-pixels')
const fs = require('fs')

const dataAsNdarray = ndarray(new Uint8Array(new Float32Array(values).buffer), [
  128,
  121,
  4
])
savePixels(dataAsNdarray, 'PNG').pipe(
  fs.createWriteStream('story-electric.png')
)
console.log(dataAsNdarray)
