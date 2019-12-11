<template>
  <el-dialog
      :title="title"
      visible
      center
      v-on="$listeners"
      v-bind="dialogConfig"
      :close-on-click-modal="false"
      :append-to-body="$attrs['append-to-body']"
      :close-on-press-escape="false"
      :custom-class="customClass"
  >
    <t-form v-bind="$attrs" v-on="$listeners" :form-items="formItems" ref="form">
      <template v-for="item in formSlots" v-slot:[item]="scope">
        <slot :name="item" v-bind="scope"></slot>
      </template>
    </t-form>
    <slot name="footer" slot="footer">
      <div class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import TForm from './t-form'
import { Loading } from 'element-ui'

export default {
  name: 't-dialog-form',
  props: {
    title: {
      type: String
    },
    dialogConfig: {
      type: Object,
      default: () => {
      }
    },
    formItems: {
      type: Array,
      default: () => []
    },
    customClass: {
      type: String
    },
    autoLoading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async confirm () {
      let res = await this.$refs.form.validate()
      if (res) {
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: '加载中'
        })
        this.$emit('confirm', res, () => {
          loadingInstance.close()
        })
      }
    }
  },
  computed: {
    formSlots () {
      return this.formItems.filter((list) => list.slot).map((v) => v.slot)
    },
  },
  components: { TForm }
}
</script>

<style scoped>

</style>
