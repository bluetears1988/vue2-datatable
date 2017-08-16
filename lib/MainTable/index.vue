<template>
  <table class="table table-striped table-hover" style="margin-bottom: 0"
    :class="tblClass" :style="tblStyle">
    <col-group-def :columns="columns" />
    <table-header v-bind="$props" />
    <table-body v-bind="$props" />
    <table-footer v-bind="$props" />
  </table>
</template>
<script>
import TableHeader from './TableHeader/index.vue'
import ColGroupDef from './ColGroupDef.vue'
import TableBody from './TableBody.vue'
import TableFooter from './TableFooter.vue'
import props from '../props.mixin'

export default {
  mixins: [props],
  components: { ColGroupDef, TableHeader, TableBody, TableFooter }
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
