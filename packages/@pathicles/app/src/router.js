import { createWebHistory, createRouter } from 'vue-router'
import PathiclesSimulator from './components/PathiclesSimulator.vue'
import PathiclesStory from './components/PathiclesStory.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/simulator' },
    { path: '/simulator', component: PathiclesSimulator },
    {
      path: '/story',
      component: PathiclesStory
    }
  ]
})
export default router
