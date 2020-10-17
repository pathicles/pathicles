/* eslint-env browser */ /* eslint-env browser */

<template>
  <router-view :key="$route.fullPath" :class="{ prerender }"></router-view>
</template>

<script>
export default {
  name: 'App',
  computed: {
    printMode: function () {
      const parsedUrl = new URL(window.location.href)
      return parsedUrl.searchParams.get('print') !== null
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
