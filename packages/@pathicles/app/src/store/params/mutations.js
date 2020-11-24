import { merge } from 'lodash-es'

const prefix = 'params/'

export const MUTATION_TYPES = {
  SET_CAMERA_AUTOROTATE_ENABLED: `${prefix}SET_CAMERA_AUTOROTATE_ENABLED`,
  SET: `${prefix}SET`
}

export default {
  [MUTATION_TYPES.SET](state, payload) {
    console.log('merging', state, payload)
    merge(state, payload)
    // state = payload
  }
}
