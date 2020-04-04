/* eslint-env browser */

<template>
  <div id="app">
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

export default {
  name: 'App',

  computed: {
    printMode: function() {
      const parsedUrl = new URL(window.location.href)
      return parsedUrl.searchParams.get('print') !== null
    }
  }
}
</script>

<style>
nav {
  z-index: 100;
  position: fixed;
  top: 20px;
}
</style>
