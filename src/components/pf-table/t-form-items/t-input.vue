<template>
  <el-input
      v-bind="{...defaultAttrs,...$attrs,...item.attrs}"
      v-on="$listeners"
  />
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'

export default {
  name: 't-input',
  mixins: [tFormItemMixin],
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
