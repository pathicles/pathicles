import deepcopy from 'deepcopy/src/index.mjs'

import defaultConfig from './_default'
import spiral from './spiral'
import csr from './csr'
import storyDipole from './story-dipole'
import logo from './pathicles-logo'
import storyElectric from './story-electric'
import storyQuadrupole from './story-quadrupole'
import random from './random'
import freeElectron from './free-electron'
import freeElectrons from './free-electrons'
import differentGammas from './different-gammas'
import differentGammas1e_10 from './different-gammas-E-1e-10'
import differentGammas1e_11 from './different-gammas-E-1e-11'
import differentGammas1e_12 from './different-gammas-E-1e-12'
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
  [differentGammas.name]: differentGammas,
  [differentGammas1e_10.name]: differentGammas1e_10,
  [differentGammas1e_11.name]: differentGammas1e_11,
  [differentGammas1e_12.name]: differentGammas1e_12,
  [freeElectron.name]: freeElectron,
  [freeElectrons.name]: freeElectrons,
  [freePhoton.name]: freePhoton,
  [freePhotons.name]: freePhotons,
  [gyrotest_1_electron.name]: gyrotest_1_electron,
  [gyrotest_128_electrons.name]: gyrotest_128_electrons,
  [logo.name]: logo,
  [random.name]: random,

  [spiral.name]: spiral,
  [storyDipole.name]: storyDipole,
  [storyDipole.name]: storyDipole,
  [storyElectric.name]: storyElectric,
  [storyQuadrupole.name]: storyQuadrupole
}

for (let p2 = 0; p2 < 11; p2++) {
  for (let s2 = 0; s2 < 11; s2++) {
    let randomClone = deepcopy(random)
    randomClone.name = `random__${Math.pow(2, p2)}__${Math.pow(2, s2)}`
    randomClone.model.emitter.particleCount = Math.pow(2, p2)
    randomClone.runner.snapshotCount = Math.pow(2, s2)
    randomClone.runner.iterations = Math.pow(2, s2) - 1
    presets[randomClone.name] = randomClone
  }
}

Object.keys(presets).forEach((presetName) => {
  const preset = presets[presetName]
  presets[toUInt8(preset).name] = toUInt8(preset)
})

export const config = (presetName) => {
  return merge(true, defaultConfig, presets[presetName]) || defaultConfig
}

export { merge, presets, defaultConfig }
