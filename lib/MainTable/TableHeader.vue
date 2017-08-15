<template>
  <thead>
    <transition-group name="fade" tag="tr">
      <th v-if="selection && data.length" width="30px" key="--th-multi">
        <multi-select :selection="selection" :rows="data" />
      </th>
      <th v-for="(col, idx) in columns"
        :key="col.title || col.field || idx"
        :class="[col.colClass, col.thClass]"
        :style="[col.colStyle, col.thStyle]">
        <!-- <th> component (thComp) -->
        <component v-if="col.thComp" :is="comp[col.thComp]" v-bind="$props"
          :column="col" :field="col.field" :title="col.title">
        </component>
        <template v-else>
          {{ col.title }}
        </template>

        <i v-if="col.explain" class="fa fa-info-circle" style="cursor: help" :title="col.explain"></i>
        <head-sort v-if="col.sort" :field="col.field" :query="query" />
      </th>
    </transition-group>
  </thead>
</template>
<script>
export default {
  props: {
    columns: { type: Array, required: true },
    data: { type: Array, required: true },
    query: { type: Object, required: true },
    selection: Array
  }
}
</script>
