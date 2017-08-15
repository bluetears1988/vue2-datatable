<template>
  <table class="table table-striped table-hover">
    <table-head />
    <table-body />
    <table-foot v-if="summary" />
  </table>
</template>
<script>
import TableHead from './TableHead.vue'
import TableBody from './TableBody.vue'
import TableFoot from './TableFoot.vue'

export default {
  components: { TableHead, TableBody, TableFoot }
}
</script>
<style>
/* transition effect: fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
