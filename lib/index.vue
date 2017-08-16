<template>
  <div>
    <div v-if="$slots.default || HeaderSettings" class="clearfix" style="margin-bottom: 10px">
      <header-settings v-if="HeaderSettings" class="pull-right"
        :columns="columns" :support-backup="HeaderSettings === 'true'">
      </header-settings>
      <slot></slot>
    </div>
    <div>
      <main-table v-if="leftFixedColumns.length" class="-left-fixed-table"
        v-bind="Object.assign({}, $props, { columns: leftFixedColumns })">
      </main-table>
      <main-table v-if="rightFixedColumns.length" class="-right-fixed-table"
        v-bind="Object.assign({}, $props, { columns: rightFixedColumns })">
      </main-table>
      <div class="table-responsive">
        <main-table v-bind="Object.assign({}, $props, { columns: commonColumns })" />
      </div>
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
import LimitSelect from './LimitSelect.vue'
import Pagination from './Pagination.vue'
import props from './props.mixin'

export default {
  name: 'Datatable',
  mixins: [props],
  components: { HeaderSettings, MainTable, LimitSelect, Pagination },
  created () { // init query
    const q = { limit: 10, offset: 0, sort: '', order: '', ...this.query }
    Object.keys(q).forEach(key => this.$set(this.query, key, q[key]))
  },
  computed: {
    visibleColumns () {
      return this.columns.filter(col => typeof col.visible === 'undefined' || '' + col.visible === 'true')
    },
    commonColumns () {
      return this.visibleColumns.filter(col => !col.fixed)
    },
    leftFixedColumns () {
      return this.columns.filter(col => col.fixed && col.fixed !== 'right')
    },
    rightFixedColumns () {
      return this.columns.filter(col => col.fixed === 'right')
    }
  },
  watch: {
    data: {
      handler (data) {
        const { supportNested } = this
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
      },
      immediate: true
    }
  }
}
</script>
<style>
.-left-fixed-table {
  float: left;
  width: 0;
  box-shadow: 1px 0 5px #ddd;
}
.-right-fixed-table {
  float: right;
  width: 0;
  box-shadow: 0 1px 5px #ddd;
}
</style>
