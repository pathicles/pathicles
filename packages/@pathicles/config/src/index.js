let merge = (...theArgs) => {
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

import defaultConfig from './presets/_default'
import { dipole } from './presets/dipole'
import { storyDipole } from './presets/story-dipole'
import { storyElectric } from './presets/story-electric'
import { storyQuadrupole } from './presets/story-quadrupole'
import { random } from './presets/random'
import { freeElectron } from './presets/free-electron'
import gyrotest_1_electron from './presets/gyrotest-1-electron'
import { freePhoton } from './presets/free-photon'
import { freePhotons } from './presets/free-photons'

const presets = {
  [storyDipole.name]: storyDipole,
  [storyElectric.name]: storyElectric,
  [storyQuadrupole.name]: storyQuadrupole,
  [freeElectron.name]: freeElectron,
  [freePhoton.name]: freePhoton,
  [freePhotons.name]: freePhotons,
  [random.name]: random,
  [dipole.name]: dipole,
  [gyrotest_1_electron.name]: gyrotest_1_electron
}

const config = (presetName) => {
  return merge(true, defaultConfig, presets[presetName]) || defaultConfig
}

export { config, defaultConfig, presets, merge }
