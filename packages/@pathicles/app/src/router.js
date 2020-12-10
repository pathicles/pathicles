import { createWebHistory, createRouter } from 'vue-router'
import PathiclesSimulator from './components/PathiclesSimulator.vue'
import PathiclesStory from './components/PathiclesStory.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/simulator' },
    {
      path: '/simulator',
      component: PathiclesSimulator,
      props: (route) => ({
        presetName: route.query.presetName,
        prerender: route.query.prerender,
        debug: route.query.debug
      })
    },
    {
      path: '/story',
      component: PathiclesStory
    }
  ]
})
export default router
