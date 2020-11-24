// import { MUTATION_TYPES } from './mutations'
//
import { MUTATION_TYPES } from './mutations'

const ACTION_TYPES = {
  LOAD_PRESET: `LOAD_PRESET`
}

import { config } from '@pathicles/config'

//
// // cannot use ES6 classes, the methods are not enumerable, properties are.
export default {
  [ACTION_TYPES.LOAD_PRESET]({ commit }, { presetName }) {
    if (!presetName) return
    const presetConfig = config(presetName)
    commit(MUTATION_TYPES.SET, presetConfig)

    return presetConfig
  }
}
