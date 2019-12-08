<template>
  <t-dialog-form
      :title="isEdit?'编辑用户':'添加用户'"
      :form-items="formItems"
      :dialog-config="{width:'500px'}"
      :rules="rules"
      v-model="formData"
      :originData="formData"
      @confirm="confirm"
      v-on="$listeners"
  >
    <template slot="describe" slot-scope="{form,item}">
      <el-form-item :label="item.label" :prop="item.prop">
        <el-input type="textarea" v-model="form[item.prop]"/>
      </el-form-item>
    </template>
  </t-dialog-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'edit-user',
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  created() {
    if (this.isEdit) {
      this.formData = {...this.info}
    }
  },
  methods: {
    async confirm(result, done) {
      let res = {}
      if (this.isEdit) {
        res = await axios.post('/update-user', {...result})
      } else {
        // 通过出生年月计算年龄
        const {birth} = result
        const birthDate = new Date(birth);
        const newDate = new Date();
        const year = newDate.getFullYear();
        let age = year - birthDate.getFullYear();
        res = await axios.post('/add-user', {...result, age})
      }
      if (res.status === 200) {
        res = res.data
        if (res.code === 1) {
          this.$message.success(this.isEdit ? '编辑用户成功' : '添加用户成功')
          this.$emit('refresh-table')
          this.$emit('close')
        }
      }
      done()
    }
  },
  computed: {
    formItems() {
      return [
        {type: 'input', label: '姓名', prop: 'name'},
        {
          type: 'radio', label: '性别', prop: 'sex',
          options: [
            {label: '男', value: 1},
            {label: '女', value: 0}
          ]
        },
        {type: 'input', label: '地址', prop: 'address'},
        {type: 'date', label: '出生日期', prop: 'birth', attrs: {'value-format': 'yyyy-MM-dd'}},
        {slot: 'describe', label: '描述', prop: 'describe'}
      ]
    },
    rules() {
      return {
        name: {required: true, message: '请输入姓名', trigger: 'blur'},
        address: {required: true, message: '请输入地址', trigger: 'change'},
        birth: {required: true, message: '请输入出生日期', trigger: 'change'}
      }
    },
    isEdit() {
      return Object.keys(this.info).length
    }
  }
}
</script>

<style scoped>

</style>
