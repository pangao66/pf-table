<template>
  <el-date-picker
      v-bind="{...$attrs,...item.attrs}" v-on="$listeners"
      clearable @change="handleChange"
  >
  </el-date-picker>
</template>

<script>
import pFormItemMixin from './p-form-item-mixin'

export default {
  name: 'p-date-picker',
  mixins: [pFormItemMixin]
}
</script>

<style scoped>

</style>
