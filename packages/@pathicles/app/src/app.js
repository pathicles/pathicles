import Vue from 'vue'
import App from './App.vue'

import PathiclesSimulator from './components/PathiclesSimulator.vue'
import VueRouter from 'vue-router'

const router = new VueRouter({
  routes: [{ path: '/simulator/:preset', component: PathiclesSimulator }]
})

const app = new Vue({
  router,
  render: h => h(App)
})

export { app }
