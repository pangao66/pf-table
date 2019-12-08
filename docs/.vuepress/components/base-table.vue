<template>
  <pf-table
      :data="tableData"
      :columns="columns"
      :pagination="false"
      @get-table-data="getTableData"
  >
  </pf-table>
</template>
<script>
import axios from 'axios'

export default {
  name: 'base-table',
  data () {
    return {
      tableData: [{ id: 11, email: 'p.ldx@ljrprqgz.cn', name: '段军', address: '湖北省 襄阳市 南漳县' }]
    }
  },
  methods: {
    async getTableData ({}, done) {
      let res = await axios.get('/base-table')
      if (res.status === 200) {
        res = res.data
        this.tableData = res.list
        console.log(res.list)
      }
      done()
    }
  },
  computed: {
    columns () {
      return [
        { prop: 'id', label: 'id' },
        { prop: 'name', label: '姓名' },
        { prop: 'email', label: '邮箱' },
        { prop: 'address', label: '地址' }
      ]
    }
  }
}
</script>

