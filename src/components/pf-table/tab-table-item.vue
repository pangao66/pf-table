<template>
  <div>
    <t-table :data="tableData" :columns="columns" v-loading="loading">
      <template v-for="item in columnSlots" v-slot:[item]="scope">
        <slot :name="item" v-bind="{...scope}"></slot>
      </template>
    </t-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
        v-bind="pageInfo"
        style="text-align:center;"
        v-if="pagination"
    >
      <slot name="pagination-slot"></slot>
    </el-pagination>
  </div>
</template>
<script>
import TTable from './t-table'

export default {
  name: 'tab-table-item',
  props: {
    pagination: {
      type: Boolean,
      default: true
    },
    pageConfig: {
      type: Object,
      default: () => {}
    },
    info: {
      type: Object,
      default: () => {}
    },
    tabChangeGetDta: {
      type: Boolean,
      default: false
    },
    autoLoading: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    searchedTabs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      pageInfo: {
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSize: 10,
        currentPage: 1,
        pageSizes: [10, 20, 50, 100]
      },
      tableData: [],
      total: 0,
      loading: false,
      isFirst: true
    }
  },
  created () {
    if (!this.tabChangeGetDta) {
      this.getTableData()
    }
  },
  activated () {
    if (this.tabChangeGetDta) {
      if (this.searchedTabs.length && !(this.searchedTabs.indexOf(this.name) > -1)) {
        this.search()
      } else {
        this.getTableData()
      }
    }
  },
  methods: {
    search () {
      this.pageInfo.currentPage = 1
      this.getTableData()
    },
    handleCurrentChange (val) {
      this.pageInfo.currentPage = val
      this.getTableData()
    },
    handleSizeChange (val) {
      this.pageInfo.pageSize = val
      this.pageInfo.currentPage = 1
      this.getTableData()
    },
    getTableData () {
      if (this.autoLoading) {
        this.loading = true
      }
      this.$emit('get-table-data',
        {
          ...this.currentPageInfo,
          name: this.name
        },
        ({ tableData, total }) => {
          if (tableData) {
            this.tableData = tableData
            this.total = total
          }
          this.loading = false
        })
    }
  },
  computed: {
    currentPageInfo () {
      const { pageSize, currentPage } = this.pageInfo
      return {
        pageSize, currentPage
      }
    },
    name () {
      return this.info.name
    },
    columnSlots () {
      return this.columns.filter((c) => c.slot).map((c) => c.slot)
    }
    // columns () {
    //   return [
    //     { prop: 'id', label: 'id' },
    //     { prop: 'name', label: '姓名', attrs: { width: 60 } },
    //     { prop: 'address', label: '地址', attrs: { minWidth: 140 } },
    //     { prop: 'age', label: '年龄', attrs: { width: 60 } },
    //     { prop: 'birth', label: '生日', formatter: 'date' },
    //     { prop: 'job', label: '职位' },
    //     { prop: 'sex', label: '性别', formatter: this.getSex },
    //     { slot: 'handle', label: '操作', attrs: { width: 170 } }
    //   ]
    // }
  },
  components: { TTable },
  watch: {}
}
</script>
<style>

</style>
