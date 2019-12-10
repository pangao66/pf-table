<template>
  <div>
    <t-form
        v-if="formItems.length"
        v-bind="formOptions"
        :form-items="formItems"
        :is-search-form="true"
        v-on="$listeners"
        inline
    >
      <template v-for="item in formSlots" v-slot:[item]="scope">
        <slot :name="item" v-bind="scope"></slot>
      </template>
    </t-form>
    <slot name="form-after"></slot>
    <el-tabs v-model="activeName" type="border-card" @tab-click="changeTab">
      <el-tab-pane
          v-for="item in tabs"
          :label="item.label"
          :name="item.name"
          :key="item.name"
      >
        <template v-slot:label>
          <span>{{item.label}}</span>
          <slot name="tab-label" v-bind="{...item}"></slot>
        </template>
        <keep-alive>
          <tab-table-item
              v-if="activeName===item.name"
              :activeName="activeName"
              :info="item"
              :columns="columns"
              :data="dataObject[item.name]?dataObject[item.name].data:[]"
              :total="dataObject[item.name]?dataObject[item.name].total:10"
              v-on="$listeners"
              ref="tab-table-item"
              :searched-tabs="searchedTabs"
              @hook:activated="tabTableItemActivated(item)"
          >
            <template v-for="item in columnSlots" v-slot:[item]="scope">
              <slot :name="item" v-bind="{...scope}"></slot>
            </template>
            <template v-slot:pagination-slot>
              <slot name="pagination-slot"></slot>
            </template>
          </tab-table-item>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TForm from './t-form'
import TabTableItem from './tab-table-item'

export default {
  name: 'pf-tab-table',
  props: {
    columns: {
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
    tabs: {
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
      searchQuery: {},
      formData: {},
      loading: false,
      activeName: '',
      dataObject: {},
      searchedTabs: []
    }
  },
  created () {
    this.activeName = this.tabs[0].name
  },
  methods: {
    changeTab () {
    },
    search () {
      this.$refs['tab-table-item'][0].search()
      this.searchedTabs.push(this.activeName)
    },
    tabTableItemActivated (item) {

    },
    reset () {
    },
    formChange (val) {
      this.formData = { ...val }
    }
  },
  computed: {
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
  watch: {},
  components: {
    TabTableItem,
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

