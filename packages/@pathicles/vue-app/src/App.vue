/* eslint-env browser */

<template lang="pug">
.app(:class='{ print: printMode }')
  .configurator
    label preset
      select(v-model='presetName', v-on:change='onPresetChange($event)')
        option(value='story') STORY
        option(
          v-for='name of Object.keys(presets)',
          :value='name',
          :selected='name === presetName'
        ) {{ name }}
  PathiclesStory(v-if='presetName === "story"', :story='story')
  pathicles(
    v-else,
    :preset-name='presetName',
    :prerender='prerender',
    :click-to-interact='false && !printMode',
    :particleCount='particleCount',
    :snapshotCount='snapshotCount',
    :pusher='pusher'
  )
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
      story: {
        scenes: [
          {
            type: 'caption',
            title: '<strong>Wir&nbsp;beschleunigen</strong>',
            subtitle_1_1:
              '<strong>Teilchen</strong> in&nbsp;unseren&nbsp;Berufen',
            subtitle_1_2:
              '<strong>und die Beschleunigerphysik</strong> im Berufsverband.',
            image: '/images/story/story-electric.jpg',
            pathicles: {
              autoLoop: true,
              preset: 'story-electric',
              data: 'story-electric.js',
              camera: {
                center: [0, 1.5, 0],
                distance: 10,
                theta: (0 / 360) * 2 * Math.PI,
                phi: (10 / 360) * Math.PI
              }
            }
          },

          {
            type: 'caption',
            title: 'Beschleunigung<br><strong>macht&nbsp;schneller</strong>.',
            body: 'Elektrische Kräfte wirken sich auf Photonen, Elektronen und Protonen verschieden aus: Masselose <span class="photon">Photonen</span> sind immer mit Lichtgeschwindigkeit unterwegs, daran ändert auch eine Kraft nichts.  <span class="electron">Elektronen</span> werden rasch auf Fast-Lichtgeschwindigkeit beschleunigt, erreichen diese aber nie ganz. <span class="proton">Protonen</span> sind schwerer und brauchen etwas länger, um in Fahrt zu kommen.\n',
            image: '/images/story/story-electric.jpg',
            scene_index: 1,
            pathicles: {
              preset: 'story-electric',
              data: 'story-electric.js',
              camera: {
                center: [0, 1.5, 0],
                distance: 5,
                theta: (90 / 360) * 2 * Math.PI,
                phi: (-10 / 360) * Math.PI
              }
            }
          },
          {
            type: 'caption',
            title:
              'Beschleunigung<br><strong>hält&nbsp;auf&nbsp;Spur</strong>.',
            scene_index: 2,
            body: 'Magnetfelder wirken senkrecht zur Geschwindigkeit geladener Teilchen, die dadurch ihre Richtung ändern. Gleichförmige Magnetfelder führen zu einer Kreisbahn und kommen etwa in Ringbeschleunigern zum Einsatz.\n',
            image: '/images/story/story-dipole.jpg',
            pathicles: {
              preset: 'story-dipole',
              data: 'story-dipole.js',
              camera: {
                center: [0, 1.5, 0],
                distance: 1,
                theta: (90 / 360) * 2 * Math.PI,
                phi: (-10 / 360) * Math.PI
              }
            }
          },
          {
            type: 'caption',
            title: 'Beschleunigung<br><strong>schafft Zusammenhalt</strong>.',
            scene_index: 3,
            body: 'Magnetfelder, deren Stärke mit Abstand zur optimalen Teilchenbahn zunimmt, wirken wie optische Linsen: In einer Ebene bringen sie die Teilchen zusammen, in der dazu senkrechten Ebene jedoch auseinander. In modernen Beschleunigern sorgen hunderte solcher Bündelungsmagnete für den Zusammenhalt.\n',
            image: '/images/story/story-quadrupole.jpg',
            pathicles: {
              preset: 'story-quadrupole',
              data: 'story-quadrupole.js',
              camera: {
                center: [0, 1.5, 0],
                distance: 10,
                theta: (135 / 360) * 2 * Math.PI,
                phi: (-10 / 360) * Math.PI
              }
            }
          },
          {
            type: 'options',
            pathicles: {
              autoLoop: true,
              preset: 'story-empty',
              data: 'story-electric.js',
              camera: {
                center: [0, 1.5, 0],
                distance: 10,
                theta: (180 / 360) * 2 * Math.PI,
                phi: (-10 / 360) * Math.PI
              }
            }
          },
          {
            type: 'options',
            pathicles: {
              autoLoop: true,
              preset: 'story-empty',
              data: 'story-electric.js',
              camera: {
                center: [0, 1.5, 0],
                distance: 10,
                theta: (180 / 360) * 2 * Math.PI,
                phi: (-10 / 360) * Math.PI
              }
            }
          }
        ]
      },
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
      return this.urlSearchParams.get('prerender') !== null
    },
    particleCount: function () {
      return +this.urlSearchParams.get('particleCount')
    },
    snapshotCount: function () {
      return +this.urlSearchParams.get('snapshotCount')
    },
    iterationCount: function () {
      return +this.urlSearchParams.get('iterationCount')
    },
    pusher: function () {
      return this.urlSearchParams.get('pusher')
    },


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
  -webkit-text-size-adjust none
  touch-action pan-y

/* prevent user scaling */
body, #app
  margin 0
  padding 0
  font-family 'Barlow Semi Condensed', sans-serif

.prerender, .print
  select, .configurator, dl.info
    display none

.configurator
  // display none
  padding 0.75rem 1rem
  position fixed
  top 0
  z-index 1000

  select
    margin-left 1rem
    width 8.75rem
    cursor pointer
    display inline-block
    position relative
    font-size 10px
    color black
    border none
    font-family monospace
</style>
