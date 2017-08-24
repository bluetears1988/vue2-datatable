<template>
  <div class="-table-wrapper">
    <div class="-table-header-wrapper" ref="tblHeaderWrapper">
      <div class="-left-fixed -fixed">
        <table-frame v-if="leftFixedColumns.length" v-bind="propsToLeftFixedTable">
          <table-header v-bind="propsToLeftFixedTable" />
        </table-frame>
      </div>
      <div class="-right-fixed -fixed">
        <table-frame v-if="rightFixedColumns.length" v-bind="propsToRightFixedTable">
          <table-header v-bind="propsToRightFixedTable" />
        </table-frame>
      </div>
      <table-frame v-bind="propsToTable">
        <table-header v-bind="propsToTable" />
      </table-frame>
    </div>
    <div class="-table-body-wrapper" ref="tblBodyWrapper" :style="{ height: TableHeight }">
      <div class="-left-fixed -fixed" :style="styleForLeftFixed">
        <table-frame v-if="leftFixedColumns.length" v-bind="propsToLeftFixedTable">
          <table-body v-bind="propsToLeftFixedTable" />
        </table-frame>
      </div>
      <div class="-right-fixed -fixed">
        <table-frame v-if="rightFixedColumns.length" v-bind="propsToRightFixedTable">
          <table-body v-bind="propsToRightFixedTable" />
        </table-frame>
      </div>
      <table-frame v-bind="propsToTable">
        <table-body v-bind="propsToTable" />
      </table-frame>
    </div>
  </div>
</template>
<script>
import TableFrame from './TableFrame'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import TableFooter from './TableFooter.vue'
import syncScroll from './_syncScroll'
import props from '../props.mixin'

export default {
  mixins: [props],
  components: { TableFrame, TableHeader, TableBody, TableFooter },
  computed: {
    visibleColumns () {
      return this.columns.filter(col => typeof col.visible === 'undefined' || '' + col.visible === 'true')
    },
    leftFixedColumns () {
      return this.visibleColumns.filter(col => col.fixed && col.fixed !== 'right')
    },
    rightFixedColumns () {
      return this.visibleColumns.filter(col => col.fixed === 'right')
    },
    hasFixedColumns () {
      return !!(this.leftFixedColumns.length + this.rightFixedColumns.length)
    },
    propsToTable () {
      return { ...this.$props, columns: this.visibleColumns }
    },
    propsToLeftFixedTable () {
      return { ...this.$props, columns: this.leftFixedColumns }
    },
    propsToRightFixedTable () {
      return { ...this.$props, columns: this.rightFixedColumns }
    },
    styleForLeftFixed () {
      return this.scrollLeft && {
        position: 'relative',
        float: 'left',
        left: `${this.scrollLeft}px`
      }
    }
  },
  data: () => ({
    scrollLeft: 0
  }),
  mounted () {
    syncScroll(
      [this.$refs.tblHeaderWrapper, this.$refs.tblBodyWrapper],
      ({ left }) => { this.scrollLeft = left }
    )
  }
}
</script>
<style>
.-table-wrapper {
  position: relative;
  /*overflow: auto;*/
  border: 1px solid #ddd;
}
.-table-wrapper table {
  background: #fff;
}
.-fixed {
  position: absolute;
  width: 0;
  overflow: visible;
}
.-left-fixed {
  left: 0;
}
.-left-fixed > table {
  box-shadow: 1px 0 5px #ddd;
}
.-right-fixed {
  right: 0;
}
.-right-fixed > table {
  box-shadow: -1px 0 5px #ddd;
  transform: translateX(-100%);
}
.-table-header-wrapper,
.-table-body-wrapper,
.-table-footer-wrapper {
  /*position: relative;*/
  overflow: auto;
}
.-table-header-wrapper {
  width: calc(100% - 17px);
}
.-table-body-wrapper {

}
</style>
