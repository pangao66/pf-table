<template>
  <el-input-number v-bind="{...$attrs,...item.attrs}" v-on="$listeners"></el-input-number>
</template>

<script>
import pFormItemMixin from './p-form-item-mixin'
export default {
  name: 'p-input-number',
  mixins: [pFormItemMixin],
}
</script>

<style scoped>

</style>
