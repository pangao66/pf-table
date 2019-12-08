<template>
  <pf-table
      :data="tableData"
      :columns="columns"
      :total="total"
      @get-table-data="getTableData"
  >
  </pf-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'page-table',
  data () {
    return {
      tableData: [
        { id: 'aaa', name: '周芳', address: '湖北省 武汉市', age: 16, birth: '1996-05-24', sex: 0 }
      ],
      total: 30
    }
  },
  methods: {
    async getTableData ({ currentPage, pageSize, ...query }, done) {
      let res = await axios.post('/page-table', { currentPage, pageSize, ...query })
      if (res.status === 200) {
        res = res.data
        this.tableData = res.list
        this.total = res.total
        console.log(res.list)
      }
      done()
    },
    getSex ({ cellValue }) {
      const map = {
        1: '男',
        0: '女'
      }
      return map[cellValue] || '-'
    }
  },
  computed: {
    columns () {
      return [
        { prop: 'id', label: 'id', attrs: { width: 260 } },
        { prop: 'name', label: '姓名', attrs: { width: 60 } },
        { prop: 'address', label: '地址', attrs: { minWidth: 160 } },
        { prop: 'age', label: '年龄', attrs: { width: 60 } },
        { prop: 'birth', label: '生日' },
        { prop: 'sex', label: '性别', formatter: this.getSex }
      ]
    }
  }
}
</script>

<style>

</style>
