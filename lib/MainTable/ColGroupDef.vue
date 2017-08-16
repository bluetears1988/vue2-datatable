<template>
  <colgroup>
    <col v-for="col in columns" :class="col.colClass" :style="col.colStyle"></col>
  </colgroup>
</template>
<script>
export default {
  props: {
    columns: { type: Array, required: true }
  }
}
</script>
