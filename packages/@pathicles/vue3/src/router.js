import { createWebHistory, createRouter } from 'vue-router'
import PathiclesSimulator from './components/PathiclesSimulator.vue'

const history = createWebHistory()
const routes = [
  { path: '/simulator', component: PathiclesSimulator }
]
const router = createRouter({ history, routes })
export default router
