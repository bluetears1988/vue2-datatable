let comp // cache the source of dynamic components (thComp / tdComp / nested components)

export default {
  props: {
    columns: { type: Array, required: true },
    data: { type: Array, required: true },
    total: { type: Number, required: true },
    query: { type: Object, required: true },
    selection: Array, // for multi-select
    summary: Object, // an extra summary row
    xprops: Object, // extra custom props passing to dynamic components
    HeaderSettings: { type: [Boolean, String], default: true }, // String is only for 'true'
    TableHeader: { type: [Boolean, String], default: true }, // String is only for 'true' (fixed)
    TableHeight: String,
    Pagination: { type: Boolean, default: true },
    tblClass: [String, Object, Array], // classes for <table>
    tblStyle: [String, Object, Array], // inline styles for <table>
    supportNested: [Boolean, String] // support nested components (String is only for 'accordion')
  },
  data () {
    if (!comp) {
      // only lib/index.vue could reach here
      comp = this.$parent.$options.components
    }
    return {
      comp
    }
  }
}
