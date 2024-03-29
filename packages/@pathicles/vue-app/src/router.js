import { createRouter, createWebHistory } from 'vue-router'
import PathiclesSimulator from './components/PathiclesSimulator.vue'
import PathiclesStoryView from './components/PathiclesStoryView.vue'

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
      component: PathiclesStoryView
    }
  ]
})
export default router
