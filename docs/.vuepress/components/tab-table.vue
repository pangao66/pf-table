<template>
  <pf-tab-table
      :tabs="tabs"
      :columns="columns"
      :form-items="formItems"
      @get-table-data="getTableData"
      @search="searchForm"
      ref="pf-table-data"
  >
    <template v-slot:handle="{row}">
      <el-button @click="deleteRow(row)">删除</el-button>
    </template>
  </pf-tab-table>
</template>

<script>
import axios from 'axios'

export default {
  name: '',
  data () {
    return {
      tableData: [],
      total: 0
    }
  },
  created () {
  },
  methods: {
    async getTableData (query, done) {
      const { name, ...other } = query
      let res = await axios.post('/search-table', { job: name, ...other })
      if (res.status === 200) {
        res = res.data
        this.tableData = res.list
        this.total = res.total
        done({
          tableData: res.list,
          total: res.total
        })
      } else {
        done()
      }
    },
    searchForm () {
      this.$refs['pf-table-data'].search()
    },
    getSex ({ cellValue }) {
      const map = {
        1: '男',
        0: '女'
      }
      return map[cellValue] || '-'
    },
    deleteRow (row) {
      console.log(row)
    }
  },
  computed: {
    tabs () {
      return [
        { label: '设计', name: 'designer' },
        { label: '程序员', name: 'programmer' },
        { label: '测试', name: 'testers' },
        { label: '产品', name: 'product' }
      ]
    },
    columns () {
      return [
        { prop: 'id', label: 'id' },
        { prop: 'name', label: '姓名', attrs: { width: 60 } },
        { prop: 'address', label: '地址', attrs: { minWidth: 140 } },
        { prop: 'age', label: '年龄', attrs: { width: 60 } },
        { prop: 'birth', label: '生日', formatter: 'date' },
        { prop: 'job', label: '职位' },
        { prop: 'sex', label: '性别', formatter: this.getSex },
        { slot: 'handle', label: '操作', attrs: { width: 170 } }
      ]
    },
    formItems () {
      return [
        { type: 'input', prop: 'name', label: '姓名' },
        {
          type: 'select', prop: 'sex', label: '性别', options: [
            { label: '男', value: 1 },
            { label: '女', value: 0 }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
