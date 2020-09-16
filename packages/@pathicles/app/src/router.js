import { createWebHistory, createRouter } from 'vue-router'
import PathiclesSimulator from './components/PathiclesSimulator.vue'
import PathiclesStory from './components/PathiclesStory.vue'

const history = createWebHistory()
const routes = [
  { path: '/', redirect: '/simulator' },
  { path: '/simulator', component: PathiclesSimulator },
  {
    path: '/story',
    component: PathiclesStory
  }
]
const router = createRouter({ history, routes })
export default router
