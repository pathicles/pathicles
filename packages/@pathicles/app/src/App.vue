/* eslint-env browser */

<template lang="pug">
.app(:class="{print: printMode}")
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
      presetName: 'story-electric'
    }
  },

  computed: {
    urlSearchParams: () => {
      let url = new URL(window.location.href)
      return new URLSearchParams(url.search)
    },
    printMode: function () {
      return this.urlSearchParams.get('print') !== null
    },

    prerender: function () {
      const parsedUrl = new URL(window.location.href)
      return urlSearchParams.get('prerender') !== null
    }
  },
  beforeMount() {
    if (this.urlSearchParams.get('presetName'))
      this.presetName = this.urlSearchParams.get('presetName')
  },
  mounted() {
    this.onPresetChange()
  },
  methods: {
    onPresetChange() {
      let params = this.urlSearchParams
      params.set('presetName', this.presetName)
      if (this.presetName !== 'story') {
        history.pushState(
          {},
          null,
          document.location.pathname + '?' + params.toString()
        )
      } else {
        this.$router.push('story')
      }
    }
  }
}
</script>

<style lang="stylus">
html
  -webkit-text-size-adjust: none;
  touch-action pan-y; /*prevent user scaling*/
body, #app
  margin 0
  padding 0
  font-family: 'Barlow Semi Condensed', sans-serif;

.prerender, .print
  select
    display none

.configurator
  padding 1em
  position fixed
  top 0
  z-index 1000
</style>
