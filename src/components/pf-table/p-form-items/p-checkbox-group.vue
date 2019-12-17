<template>
  <el-checkbox-group v-bind="{...$attrs,...item.attrs}" v-on="$listeners">
    <template v-if="item.attrs&&item.attrs.type&&(item.attrs.type='btn')">
      <el-checkbox v-for="opt in item.options" :key="opt.value" :label="opt.value">
        {{opt.label}}
      </el-checkbox>
    </template>
    <template v-else>
      <el-checkbox v-for="opt in item.options" :key="opt.value" :label="opt.value">
        {{opt.label}}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script>
import pFormItemMixin from './p-form-item-mixin'

export default {
  name: 'p-checkbox-group',
  mixins: [pFormItemMixin]
}
</script>

<style scoped>

</style>
