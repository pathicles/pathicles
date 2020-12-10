// import 'es6-promise/auto'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { paramsStore } from './store/params/index'

createApp(App)
  // .use(router)
  // .use(paramsStore)
  .mount('#app')
