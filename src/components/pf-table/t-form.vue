<template>
  <el-form
      :model="form"
      v-bind="{...formOptions,...defaultFormOptions}"
      :rules="rules"
      v-on="$listeners"
      ref="form"
      :class="formClass"
  >
    <template v-for="item in formItems">
      <template v-if="item.slot">
        <template v-if="!item.slot.renderFn">
          <slot
              :name="item.slot"
              v-bind="{form,item}"
          />
        </template>
        <template v-else>
          {{item.slot.renderFn(scope)}}
          <!--            <VNodes :vnodes="col.slot.renderFn(scope)"></VNodes>-->
        </template>
      </template>
      <template v-else>
        <template v-if="item.type&&item.type!=='grid'">
          <el-form-item
              :label="item.label"
              :prop="item.prop"
              v-bind="{...item.formItemAttrs}"
              :rules="getRules(item)"
          >
            <component
                :is="getType(item.type)"
                v-model.trim="form[item.prop]"
                :item="item"
                v-if="item.type==='input'&&item.trim"
            >
            </component>
            <component
                v-else
                :is="getType(item.type)"
                v-model="form[item.prop]"
                :item="item"
            >
            </component>
          </el-form-item>
        </template>
        <el-row v-else>
          <el-col v-for="(col,index) in item.columns" :key="index" :span="col.span">
            <el-form-item
                :label="col.label"
                :prop="col.prop"
                v-bind="{...col.formItemAttrs}"
                :rules="getRules(col)"
            >
              <component
                  :is="getType(col.type)"
                  v-model.trim="form[col.prop]"
                  :item="col"
                  v-if="item.type==='input'&&item.trim"
              >
              </component>
              <component
                  v-else
                  :is="getType(item.type)"
                  v-model="form[item.prop]"
                  :item="item"
              >
              </component>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </template>
    <slot name="submit">
      <el-form-item v-if="isSearchForm">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>

<script>

import TFormItem from './t-form-items/t-form-item'
import TInput from './t-form-items/t-input'
import TSelect from './t-form-items/t-select'
import TCheckboxGroup from './t-form-items/t-checkbox-group'
import TDatePicker from './t-form-items/t-date-picker'
import TInputNumber from './t-form-items/t-input-number'
import TRadioGroup from './t-form-items/t-radio-group'
import TRate from './t-form-items/t-rate'
import TSlider from './t-form-items/t-slider'
import TTimePicker from './t-form-items/t-time-picker'
import { carNumReg, idCardReg, integerNumberReg, priceReg, telReg, towPointReg } from '../../utils/regs'
// import { debounce } from 'throttle-debounce'

export default {
  name: 't-form',
  components: {
    TTimePicker,
    TSlider,
    TRate,
    TRadioGroup,
    TInputNumber,
    TDatePicker,
    TCheckboxGroup,
    TSelect,
    TInput,
    TFormItem
  },
  props: {
    formOptions: {
      type: Object,
      default: () => {}
    },
    originData: {
      type: Object,
      default: () => {}
    },
    isSearchForm: {
      type: Boolean,
      default: false
    },
    showSubmit: {
      type: Boolean,
      default: false
    },
    formItems: {
      type: Array,
      required: true
    },
    formClass: {
      type: String
    },
    rules: {
      type: [Object, Array],
      default: () => {}
    }
  },
  data () {
    return {
      form: {},
      defaultFormOptions: {
        labelWidth: '120px',
        labelPosition: 'right',
        labelSuffix: '：'
      }
    }
  },
  created () {
    if (this.originData && Object.keys(this.originData).length) {
      this.form = { ...this.form, ...this.originData }
    }
  },
  methods: {
    // search: debounce(300, function () {
    //   this.$emit('search', this.form)
    // }),
    search () {
      this.$emit('search', this.form)
    },
    reset () {
      this.$refs.form.resetFields()
      this.$nextTick(() => {
        this.$emit('reset', this.form)
      })
    },
    async validate () {
      try {
        await this.$refs.form.validate()
        return new Promise((resolve) => {
          resolve({ ...this.form })
        })
      } catch (e) {
        return new Promise((resolve) => {
          resolve(false)
        })
      }
    },
    async submit () {
      let valid = await this.validate()
      return new Promise((resolve, reject) => {
        if (valid) {
          resolve({ ...this.form })
        } else {
          reject('表单校验不通过')
        }
      })
    },
    getType (type) {
      const map = {
        'input': 't-input',
        'select': 't-select',
        'checkbox': 't-checkbox-group',
        'date': 't-date-picker',
        'radio': 't-radio-group',
        'rate': 't-rate',
        'slider': 't-slider',
        'switch': 't-switch',
        'time': 't-time-picker',
        'input-number': 't-input-number'
      }
      return map[type]
    },
    getRules (item) {
      if (!item.type) {
        return {}
      }
      const triggerMessage = item.type === 'input' ? '请输入' : '请选择'
      const trigger = item.type === 'input' ? 'blur' : 'change'
      let rules = [
        item.required ?
          { required: true, message: `${triggerMessage}${item.label}`, trigger }
          : undefined,
        item.idCard ? {
          pattern: idCardReg, message: '请输入正确的身份证号', trigger
        } : undefined,
        item.carNumber ? {
          pattern: carNumReg, message: '请输入正确的车牌号', trigger
        } : undefined,
        item.integer ? { pattern: integerNumberReg, message: '请输入正整数', trigger } : undefined,
        item.tel ? { pattern: telReg, message: '请输入正确的手机号码', trigger } : undefined,
        item.priceReg ? { pattern: priceReg, message: '请输入正确的金额', trigger } : undefined,
        item.towPoint ? { pattern: towPointReg, message: '请输入正确的两位小数', trigger } : undefined
      ]
      if (item.rules && item.rules instanceof Array) {
        rules = [...item.rules, ...rules]
      } else {
        rules = [item.rules, ...rules]
      }
      rules = rules.filter(v => v)
      return rules
    }
  },
  watch: {
    form: {
      deep: true,
      handler (val) {
        this.$emit('form-change', val)
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
