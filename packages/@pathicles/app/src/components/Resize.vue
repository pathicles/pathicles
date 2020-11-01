/* eslint-env browser */

<template>
  <div>
    <p>window width: {{ window.width }}</p>
    <p>window height: {{ window.height }}</p>
  </div>
</template>

<script>
const defaultDelay = 150
import debounce from 'lodash-es/debounce'

export default {
  data: () => {
    return {
      window: {
        width: 0,
        height: 0
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.onWindowResize)
    this.window.width = window.innerWidth
    this.window.height = window.innerHeight
  },

  unmounted() {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    onWindowResize: debounce(function () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }, defaultDelay) // delay
  }
}
</script>
