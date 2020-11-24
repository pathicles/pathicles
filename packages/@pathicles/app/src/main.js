import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { paramsStore } from './store/params/index'

import('typeface-barlow')
import('typeface-barlow-semi-condensed')
import('typeface-barlow-condensed')

createApp(App).use(paramsStore).use(router).mount('#app')
