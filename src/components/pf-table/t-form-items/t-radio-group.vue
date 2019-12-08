<template>
  <el-radio-group v-bind="{...$attrs,...item.attrs}" v-on="$listeners">
    <template v-if="item.attrs&&item.attrs.type&&(item.attrs.type='btn')">
      <el-radio-button
          v-for="opt in  item.options"
          :label="opt.value"
          :key="opt.value"
      >{{opt.label}}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio v-for="opt in  item.options" :label="opt.value" :key="opt.value">{{opt.label}}</el-radio>
    </template>
  </el-radio-group>
</template>

<script>
import tFormItemMixin from './t-form-item-mixin'

export default {
  name: 't-radio-group',
  mixins: [tFormItemMixin]
}
</script>

<style scoped>

</style>
