<template>
  <div>
    <div v-if="$slots.default || HeaderSettings" class="clearfix" style="margin-bottom: 10px">
      <header-settings v-if="HeaderSettings" class="pull-right"
        :columns="columns$" :support-backup="supportBackup">
      </header-settings>
      <slot></slot>
    </div>
    <div style="position: relative">
      <main-table v-if="fixedColumns"
        style="position: absolute; background: #fff; box-shadow: 1px 0 5px #ddd"
        v-bind="Object.assign({}, $props, { columns: fixedColumns })">
      </main-table>
      <!-- `.panel.panel-default` is for rounded table, see http://stackoverflow.com/a/20903465/5172890 -->
      <div class="table-responsive panel panel-default">
        <main-table v-bind="$props" />
      </main-table>
    </div>
    <div v-if="Pagination" class="row" style="margin-top: 10px">
      <div class="col-sm-6" style="white-space: nowrap">
        <strong>{{ $i18nForDatatable('Total') }} {{ total }} {{ $i18nForDatatable(',') }}</strong>
        <limit-select :query="query" />
      </div>
      <div class="col-sm-6">
        <pagination class="pull-right" :total="total" :query="query" />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderSettings from './HeaderSettings/index.vue'
import MainTable from './MainTable/index.vue'
import HeadSort from './HeadSort.vue'
import LimitSelect from './LimitSelect.vue'
import MultiSelect from './MultiSelect.vue'
import Pagination from './Pagination.vue'

export default {
  name: 'Datatable',
  components: { HeaderSettings, MainTable, HeadSort, LimitSelect, MultiSelect, Pagination },
  props: {
    columns: { type: Array, required: true },
    data: { type: Array, required: true },
    total: { type: Number, required: true },
    query: { type: Object, required: true },
    selection: Array, // for multi-select
    summary: Object, // an extra summary row
    xprops: Object, // extra custom props passing to dynamic components
    HeaderSettings: { type: Boolean, default: true },
    Pagination: { type: Boolean, default: true },
    tblClass: [String, Object, Array], // classes for <table>
    tblStyle: [String, Object, Array], // inline styles for <table>
    supportBackup: Boolean, // support header settings backup
    supportNested: [Boolean, String] // support nested components (String is only for 'accordion')
  },
  created () { // init query
    const q = { limit: 10, offset: 0, sort: '', order: '', ...this.query }
    Object.keys(q).forEach(key => this.$set(this.query, key, q[key]))
  },
  computed: {
    columns$ () {
      return this.columns.map(col => {
        typeof col.visible === 'undefined' && this.$set(col, 'visible', true)
        typeof col.group === 'undefined' && this.$set(col, 'group', 'Columns')
        return col
      })
    },
    fixedColumns () {
      const fixedColumns = this.columns$.filter(col => col.fixed)
      return fixedColumns.length ? fixedColumns : null
    },
    data$ () {
      const { data, supportNested } = this
      // support nested components with extra magic
      if (supportNested) {
        data.forEach(item => {
          if (!item.__nested__) {
            this.$set(item, '__nested__', {
              comp: '', // name of nested component
              visible: false,
              $toggle (comp, visible) {
                switch (arguments.length) {
                  case 0:
                    this.visible = !this.visible
                    break
                  case 1:
                    switch (typeof comp) {
                      case 'boolean':
                        this.visible = comp
                        break
                      case 'string':
                        this.comp = comp
                        this.visible = !this.visible
                        break
                    }
                    break
                  case 2:
                    this.comp = comp
                    this.visible = visible
                    break
                }
              }
            })
            if (supportNested === 'accordion') {
              this.$watch(
                () => item.__nested__,
                nested => {
                  // only one nested component can be expanded at the same time
                  if (data.filter(({ __nested__ }) => __nested__.visible).length < 2) return

                  data.forEach(({ __nested__ }) => {
                    if (__nested__.visible && __nested__ !== nested) {
                      __nested__.visible = false
                    }
                  })
                },
                { deep: true }
              )
            }
            Object.defineProperty(item, '__nested__', { enumerable: false })
          }
        })
      }
      return data
    }
  }
}
</script>
