<template>
  <tbody>
    <template v-if="data.length">
      <template v-for="item in data">
        <tr>
          <td v-if="selection" width="30px">
            <multi-select :selection="selection" :row="item" />
          </td>
          <td v-for="col in columns"
            :class="[col.colClass, col.tdClass]"
            :style="[col.colStyle, col.tdStyle]">
            <!-- <td> component (tdComp) -->
            <component v-if="col.tdComp" :is="comp[col.tdComp]" v-bind="$props"
              :row="item" :field="col.field" :value="item[col.field]" :nested="item.__nested__">
            </component>
            <template v-else>
              {{ item[col.field] }}
            </template>
          </td>
        </tr>
        <transition name="fade">
          <tr v-if="item.__nested__ && item.__nested__.visible">
            <td :colspan="colLen">
              <!-- nested component -->
              <component :is="comp[item.__nested__.comp]"
                :row="item" :nested="item.__nested__" v-bind="$props">
              </component>
            </td>
          </tr>
        </transition>
      </template>
    </template>
    <tr v-else>
      <td :colspan="colLen" class="text-center text-muted">
        ( {{ $i18nForDatatable('No Data') }} )
      </td>
    </tr>
  </tbody>
</template>
<script>
export default {
  
}
</script>
