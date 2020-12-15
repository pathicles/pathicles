/* eslint-env browser */

<template lang="pug">
.app(:class="{print: printMode}")
  .configurator
    select(v-model="presetName" v-on:change="onPresetChange($event)")
      option(v-for="(preset, name) of presets" :value="name" :selected="name === presetName" ) {{name}}
      option(value="story" ) STORY
  pathiclesStory(v-if="presetName === 'story'" :preset-name="presetName")
  pathicles(v-else :preset-name="presetName")
</template>

<script>
import { presets } from '@pathicles/config'
import Pathicles from './components/Pathicles.vue'
import PathiclesStory from './components/PathiclesStory.vue'

export default {
  name: 'App',
  components: { Pathicles, PathiclesStory },
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
      history.pushState(
        {},
        null,
        document.location.pathname + '?' + params.toString()
      )
    }
  }
}
</script>

<style lang="stylus">
html
  -webkit-text-size-adjust: none;
  touch-action pan-y;

/*prevent user scaling*/
body, #app
  margin 0
  padding 0
  font-family: 'Barlow Semi Condensed', sans-serif;

.prerender, .print
  select
    display none

.configurator
  padding .75rem 1rem
  position fixed
  top 0
  z-index 1000
  select
    margin-left 1rem
    width 8.75rem
    cursor:pointer;
    display:inline-block;
    position:relative;
    font-size 10px
    color:black;
    border:0px solid #ccc;
    font-family monospace
</style>
