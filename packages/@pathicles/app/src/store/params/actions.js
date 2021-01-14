/* eslint-env browser */

// import { MUTATION_TYPES } from './mutations'
//
import { MUTATION_TYPES } from './mutations'
import { config } from '@pathicles/config'

const ACTION_TYPES = {
  LOAD_PRESET: `LOAD_PRESET`
}

//
// // cannot use ES6 classes, the methods are not enumerable, properties are.
export default {
  [ACTION_TYPES.LOAD_PRESET]({ commit }, { presetName }) {
    let newPresetName = presetName
    if (!newPresetName) {
      const parsedUrl = new URL(window.location.href)
      if (parsedUrl.searchParams.get('presetName') !== null)
        newPresetName = parsedUrl.searchParams.get('presetName')
    }
    if (!newPresetName) newPresetName = 'story-quadrupole'

    const presetConfig = config(newPresetName)
    commit(MUTATION_TYPES.SET, presetConfig)

    return presetConfig
  }
}
