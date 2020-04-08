import Vue from 'vue'
import Router from 'vue-router'
// import PathiclesSimulator from './../components/PathiclesSimulator.vue'
// import PathiclesViewer from './../components/PathiclesViewer'
// import StoryView from './../views/StoryView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/simulator/:preset', component: PathiclesSimulator },
    // { path: '/viewer/:preset', component: PathiclesViewer },
    // { path: '/story/', component: StoryView }
  ]
})
