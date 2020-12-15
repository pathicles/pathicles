import deepcopy from 'deepcopy/src/index.mjs'

import defaultConfig from './_default'
import spiral from './spiral'
import csr from './csr'
import storyDipole from './story-dipole'
import storyElectric from './story-electric'
import storyQuadrupole from './story-quadrupole'
import random from './random'
import freeElectron from './free-electron'
import freeElectrons from './free-electrons'
import differentGammas from './different-gammas'
import freePhoton from './free-photon'
import freePhotons from './free-photons'
import gyrotest_1_electron from './gyrotest-1-electron'
import gyrotest_128_electrons from './gyrotest-128-electrons'

const merge = (...theArgs) => {
  let target = {}
  // Merge the object into the target object
  let merger = (obj) => {
    for (let prop in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          // If we're doing a deep merge
          // and the property is an object
          target[prop] = merge(target[prop], obj[prop])
        } else {
          // Otherwise, do a regular merge
          target[prop] = obj[prop]
        }
      }
    }
  }
  //Loop through each object and conduct a merge
  for (let i = 0; i < theArgs.length; i++) {
    merger(theArgs[i])
  }
  return target
}

const toUInt8 = (config) => {
  let clone = deepcopy(config)
  clone.name = clone.name + '-uint8'
  if (!clone.runner) clone.runner = {}
  clone.runner.packFloat2UInt8 = true
  return clone
}

const presets = {
  [csr.name]: csr,
  [storyDipole.name]: storyDipole,
  [storyElectric.name]: storyElectric,
  [storyQuadrupole.name]: storyQuadrupole,
  [freeElectron.name]: freeElectron,
  [freeElectrons.name]: freeElectrons,
  [differentGammas.name]: differentGammas,
  [freePhoton.name]: freePhoton,
  [freePhotons.name]: freePhotons,
  [random.name]: random,
  [spiral.name]: spiral,
  [gyrotest_1_electron.name]: gyrotest_1_electron,
  [gyrotest_128_electrons.name]: gyrotest_128_electrons
}

Object.keys(presets).forEach((presetName) => {
  const preset = presets[presetName]
  presets[toUInt8(preset).name] = toUInt8(preset)
})

export const config = (presetName) => {
  return merge(true, defaultConfig, presets[presetName]) || defaultConfig
}

export { merge, presets, defaultConfig }
