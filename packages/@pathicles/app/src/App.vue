<template>
  <div id="app" class="layout">
    <router-view :key="$route.fullPath"></router-view>
    <nav v-if="!printMode">
      <router-link to="/simulator/story-dipole">simulator dipole</router-link>,
      <router-link to="/simulator/story-quadrupole">quadrupole</router-link>,
      <router-link to="/simulator/story-electric">electric</router-link>,
      <!--      <router-link to="/viewer/story-dipole">viewer</router-link>-->
      <router-link to="/story/">story</router-link>
    </nav>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppBody from './components/AppBody.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: { AppHeader, AppBody, AppFooter },
  computed: {
    printMode: function() {
      const parsedUrl = new URL(window.location.href)
      return parsedUrl.searchParams.get('print') !== null
    }
  }
}
</script>
