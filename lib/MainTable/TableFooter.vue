<template>
  <tfoot v-if="summary">
    <tr class="-summary-row">
      <td v-if="selection" width="30px"></td>
      <template v-for="(col, idx) in columns">
        <!-- display the available fields only -->
        <td v-if="summary[col.field]"
          :class="[col.colClass, col.tdClass]"
          :style="[col.colStyle, col.tdStyle]">
          <!-- <td> component (tdComp) -->
          <component v-if="col.tdComp" :is="comp[col.tdComp]" v-bind="$props"
            :row="summary" :field="col.field" :value="summary[col.field]">
          </component>
          <template v-else>
            {{ summary[col.field] }}
          </template>
        </td>
        <td v-else>
          <!-- show summary label if the first col field has no data -->
          <i v-if="!idx" class="text-muted">
            {{ $i18nForDatatable('Summary') }}
          </i>
        </td>
      </template>
    </tr>
  </tfoot>
</template>
<script>
export default {
  
}
</script>
<style>
.-summary-row {
  font-weight: bold;
  background-color: #ddd !important;
}
</style>
