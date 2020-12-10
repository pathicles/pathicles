/* eslint-env browser */

<template lang="pug">
.app
  .configurator
    select(v-model="presetName" v-on:change="onPresetChange($event)")
      option(v-for="(preset, name) of presets" :value="name" :selected="name === presetName" ) {{name}}
      option(value="story" ) STORY
  pathicles(:preset-name="presetName")
</template>

<script>
import { presets } from '@pathicles/config'
import Pathicles from './components/Pathicles.vue'

export default {
  name: 'App',
  components: { Pathicles },
  data: () => {
    return {
      presets,
      presetName: 'free-photons'
    }
  },

  computed: {
    parsedUrl: () => new URL(window.location.href),
    printMode: function () {
      return this.parsedUrl.searchParams.get('print') !== null
    },

    prerender: function () {
      const parsedUrl = new URL(window.location.href)
      return parsedUrl.searchParams.get('prerender') !== null
    }
  },
  beforeMount() {
    if (this.parsedUrl.searchParams.get('presetName'))
      this.presetName = this.parsedUrl.searchParams.get('presetName')
  },
  mounted() {
    this.onPresetChange()
  },
  methods: {
    onPresetChange() {
      const params = { presetName: this.presetName }
      if (this.presetName !== 'story') {
        history.pushState(
          {},
          null,
          document.location.pathname +
            '?' +
            Object.keys(params)
              .map((key) => {
                return (
                  encodeURIComponent(key) +
                  '=' +
                  encodeURIComponent(params[key])
                )
              })
              .join('&')
        )
      } else {
        this.$router.push('story')
      }
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


.configurator
  padding 1em
  position fixed
  top 0
  z-index 1000
</style>
