/* eslint-env browser */

<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
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

<style></style>
