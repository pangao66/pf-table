<template>
  <el-rate v-bind="{...$attrs,...item.attrs}" v-on="$listeners"></el-rate>
</template>

<script>
import pFormItemMixin from './p-form-item-mixin'

export default {
  name: 'p-rate',
  mixins: [pFormItemMixin],
}
</script>

<style scoped>

</style>
