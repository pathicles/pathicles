import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import { createStore } from 'vuex'

// Create a new store instance.
export const paramsStore = createStore({
  namespaced: true,
  actions,
  state,
  getters,
  mutations
})
