<template>
  <el-select v-bind="{...defaultAttrs,...$attrs,...item.attrs}" v-on="$listeners">
    <el-option v-for="opt in item.options" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
  </el-select>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'

export default {
  name: 't-select',
  mixins: [tFormItemMixin],
  data () {
    return {
      defaultAttrs: {
        clearable: true,
        filterable: true,
        defaultFirstOption: true
      }
    }
  }
}
</script>

<style scoped>

</style>
