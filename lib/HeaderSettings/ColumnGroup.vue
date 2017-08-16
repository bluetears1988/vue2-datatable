<template>
  <ul class="-col-group">
    <label class="-col-group-title">
      {{ groupName$ }}
    </label>
    <li v-for="(col, idx) in columns">
      <input
        type="checkbox"
        :id="uuidGen(col.field || idx)"
        :name="groupName"
        :checked="typeof col.visible === 'undefined' || '' + col.visible === 'true'"
        :disabled="typeof col.visible === 'string'"
        @change="handleChange(col, $event.target.checked)">
      <label :for="uuidGen(col.field || idx)">
        {{ col.label || col.title }}
        <i v-if="col.explain" class="fa fa-info-circle" style="cursor: help" :title="col.explain"></i>
      </label>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    groupName: { type: String, required: true },
    columns:  { type: Array, required: true }
  },
  data: () => ({
    changes: [] // record the changes with a stack
  }),
  computed: {
    groupName$ () {
      const { groupName } = this
      return groupName === 'undefined' ? 'Columns' : groupName
    }
  },
  methods: {
    handleChange (col, isChecked) {
      this.changes.push({ col, isChecked })
    },
    uuidGen (key) {
      return `-col-${this._uid}-${key}`
    },
    apply () {
      let { changes, columns } = this
      if (!changes.length) return

      changes.forEach(({ col, isChecked }) => {
        this.$set(col, 'visible', isChecked)
      })

      this.changes = [] // don't forget to clear the stack
    }
  }
}
</script>
<style>
.-col-group {
  display: inline-block;
  width: 150px;
  padding: 0;
  vertical-align: top;
}
.-col-group-title {
  display: block;
  margin: 5px;
  padding: 5px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
}
.-col-group > li {
  margin-bottom: 2px;
  padding-left: 10px;
  list-style: none;
  line-height: 20px;
  font-size: 12px;
}
.-col-group > li > input {
  vertical-align: -2px;
}
</style>
