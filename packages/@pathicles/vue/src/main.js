/* eslint-env browser */

import Vue from 'vue'
import router from './router'
import App from './App'

// import DatGui from "./datgui"
// import PathiclesStory from './components/PathiclesStory'
// Vue.component('pathicles-story', PathiclesStory)

Vue.config.productionTip = false
Vue.directive('scroll', {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})
// Vue.use(DatGui)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
