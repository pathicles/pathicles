<template>
  <div class="pathicles-vue-lib-dev">
    <pathicles-vue></pathicles-vue>
  </div>
</template>

<script>
import { PathiclesViewer } from './entry'
export default {
  name: 'PathiclesViewerDev', // vue library dev component
  components: {
    PathiclesViewer
  }
}
</script>

<style>
.pathicles-vue-lib-dev {
  display: block;
  width: 400px;
  margin: 25px auto;
}
</style>
