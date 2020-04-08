import Vue from 'vue'
import Router from 'vue-router'
import PathiclesSimulator from './../components/PathiclesSimulator'
// import PathiclesViewer from './../components/PathiclesViewer'
import StoryView from './../views/StoryView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/simulator/', component: PathiclesSimulator },
    // { path: '/viewer/:preset', component: PathiclesViewer },
    { path: '/story/', component: StoryView }
  ]
})
