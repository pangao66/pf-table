<template>
  <el-table
      :data="data"
      v-on="$listeners"
      v-bind="{border:true,...$attrs}"
      :class="tableClass"
      :style="tableStyle"
  >
    <template v-for="(col,index) in tableColumns">
      <!-- 无列slot情况-->
      <el-table-column
          v-if="!col.slot"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          v-bind="col.attrs||{}"
          show-overflow-tooltip
          :formatter="(row,column,cellValue,index)=>formatCell(row,column,cellValue,index,col.formatter)"
      >
        <template v-slot:header="scope">
          {{col.label}}
          <template v-if="col.headerSlot || col.tip">
            <template v-if="col.tip">
              <el-tooltip class="item" effect="dark" :content="col.tip" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <slot :name="col.headerSlot" v-bind="{...scope}" v-if="col.headerSlot"></slot>
          </template>
        </template>
      </el-table-column>
      <!--有列slot情况-->
      <el-table-column
          v-else
          :key="index"
          :label="col.label"
          v-bind="col.attrs||{}"
          :formatter="(row,column,cellValue,index)=>formatCell(row,column,cellValue,index,col.formatter)"
      >
        <template v-slot="scope">
          <!--自定义列 模板写法-->
          <template v-if="!col.slot.renderFn">
            <slot :name="col.slot" v-bind="{...scope}"></slot>
          </template>
          <!--自定义列 render写法-->
          <template v-else>
            {{col.slot.renderFn(scope)}}
            <!--            <VNodes :vnodes="col.slot.renderFn(scope)"></VNodes>-->
          </template>
        </template>
        <!-- 列头部slot-->
        <template v-slot:header="scope">
          {{col.label}}
          <template v-if="col.headerSlot || col.tip">
            <template v-if="col.tip">
              <el-tooltip class="item" effect="dark" :content="col.tip" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <slot :name="col.headerSlot" v-bind="{...scope}" v-if="col.headerSlot"></slot>
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { formatDate } from 'element-ui/lib/utils/date-util'
import NP from 'number-precision'

export default {
  name: 't-table',
  props: {
    columns: {
      required: true,
      default: () => []
    },
    data: {
      required: true,
      default: () => []
    },
    tableClass: {
      type: [String, Array, Object, Function]
    },
    tableStyle: {
      type: [String, Array, Object, Function]
    }
  },
  methods: {
    formatCell (row, column, cellValue, index, formatter) {
      if (cellValue === null || cellValue === '' || typeof cellValue === 'undefined') {
        return '-'
      }
      if (!formatter) {
        return cellValue
      }
      const type = typeof formatter
      if (type === 'function') {
        return formatter({ row, column, cellValue, index })
      }
      if (type === 'string') {
        switch (formatter) {
          case 'date':
            return formatDate(cellValue, 'yyyy-MM-dd')
          case 'time':
            return formatDate(cellValue, 'yyyy-MM-dd hh:mm:ss')
          case 'money': // 金额三位分割
            return cellValue.toLocaleString()
          case 'point2': // 保留两位小数
            return NP.round(cellValue, 2).toFixed(2)
          case 'rmb': // 人民币分变成元
            return NP.round(NP.divide(cellValue, 100), 2)
          default :
            return cellValue
        }
      }
      if (type === 'object') {
        if (formatter.type && formatter.type === 'date') {
          return formatDate(cellValue, formatter.content)
        }
      }
      return cellValue
    }
  },
  computed: {
    tableColumns () {
      return this.columns.filter((item) => !item.hidden)
    }
  }
}
</script>

<style scoped>

</style>
