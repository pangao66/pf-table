<template>
  <div>
    <t-form
        v-if="formItems.length"
        v-bind="formOptions"
        :form-items="formItems"
        :is-search-form="true"
        @search="search"
        @reset="reset"
        @form-change="formChange"
        inline
    >
      <template v-for="item in formSlots" v-slot:[item]="scope">
        <slot :name="item" v-bind="scope"></slot>
      </template>
    </t-form>
    <slot name="form-after"></slot>
    <t-table
        v-loading="loading"
        :data="data"
        :columns="columns"
        v-on="$listeners"
        v-bind="$attrs"
        :class="tableClass"
        :style="tableStyle"
    >
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
import TForm from './t-form'
import TTable from './t-table'

export default {
  name: 'pf-table',
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
    },
    formItems: {
      type: Array,
      default: () => []
    },
    formOptions: {
      type: Object,
      default: () => {}
    },
    pagination: {
      type: Boolean,
      default: true
    },
    pageConfig: {
      type: Object,
      default: () => {}
    },
    total: {
      type: Number,
      default: 10
    },
    initGetData: {
      type: Boolean,
      default: true
    },
    syncFormQuery: {
      type: Boolean,
      default: true
    },
    autoLoading: {
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      pageInfo: {
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSize: 10,
        currentPage: 1,
        pageSizes: [10, 20, 50, 100]
      },
      searchQuery: {},
      formData: {},
      loading: false
    }
  },
  created () {
    this.pageInfo = { ...this.pageInfo, ...this.pageConfig }
    if (this.initGetData) {
      this.getTableData()
    }
  },
  methods: {
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
          ...this.formQuery
        },
        () => {
          this.loading = false
        })
    },
    search (formData) {
      this.searchQuery = { ...formData }
      this.pageInfo.currentPage = 1
      this.getTableData()
    },
    reset () {
      this.searchQuery = {}
      this.pageInfo.currentPage = 1
      this.getTableData()
    },
    formChange (val) {
      this.formData = { ...val }
    }
  },
  computed: {
    currentPageInfo () {
      const { pageSize, currentPage } = this.pageInfo
      return {
        pageSize, currentPage
      }
    },
    formQuery () {
      return this.syncFormQuery ? this.formData : this.searchQuery
    },
    formSlots () {
      return this.formItems.filter((list) => list.slot).map((v) => v.slot)
    },
    columnSlots () {
      return this.columns.filter((c) => c.slot).map((c) => c.slot)
    }
  },
  components: {
    TTable,
    TForm,
    VNodes: {
      functional: true,
      render: (h, ctx) => {
        return ctx.props.vnodes()
      }
    }
  }
}
</script>

<style scoped>

</style>
