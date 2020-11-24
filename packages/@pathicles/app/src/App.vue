/* eslint-env browser */

<template>
  <router-view
    :key="$route.fullPath"
    :preset-name="presetName"
    :prerender="prerender"
    :class="{ prerender }"
  />
</template>

<script>
export default {
  name: 'App',
  computed: {
    printMode: function () {
      const parsedUrl = new URL(window.location.href)
      return parsedUrl.searchParams.get('print') !== null
    },
    presetName: function () {
      const parsedUrl = new URL(window.location.href)
      return parsedUrl.searchParams.get('presetName') || 'free-electron'
    },
    prerender: function () {
      const parsedUrl = new URL(window.location.href)
      return parsedUrl.searchParams.get('prerender') !== null
    }
  }
}
</script>

<style lang="stylus">
//html
//  -webkit-text-size-adjust: none;
//  touch-action pan-y; /*prevent user scaling*/
body, #app
  margin 0
  padding 0
  font-family: 'Barlow Semi Condensed', sans-serif;
.prerender
  select
    display none
</style>
