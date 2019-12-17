<template>
  <el-input
      v-bind="{...defaultAttrs,...$attrs,...item.attrs}"
      v-on="$listeners"
  />
</template>

<script>
import pFormItemMixin from './p-form-item-mixin'

export default {
  name: 'p-input',
  mixins: [pFormItemMixin],
  data () {
    return {
      defaultAttrs: {
        clearable: true
      }
    }
  }
}
</script>

<style scoped>

</style>
