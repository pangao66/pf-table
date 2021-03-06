<template>
  <div>
    <p-form
        v-if="formItems.length"
        v-bind="formOptions"
        :form-items="formItems"
        :is-search-form="true"
        v-on="$listeners"
        @form-change="formChange"
        @search="search"
        @reset="reset"
        :rules="rules"
        :form-options="{inline:true}"
    >
      <template v-for="item in formSlots" v-slot:[item]="{form,item}">
        <slot :name="item" v-bind="{form,item}"></slot>
      </template>
    </p-form>
    <slot name="form-after"></slot>
    <el-tabs v-model="activeName" v-bind="tabConfig" type="border-card" @tab-click="changeTab">
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
              :columns="item.columns||columns"
              :data="dataObject[item.name]?dataObject[item.name].data:[]"
              :total="dataObject[item.name]?dataObject[item.name].total:10"
              v-on="$listeners"
              v-bind="$attrs"
              ref="tab-table-item"
              :searched-tabs="searchedTabs"
              :form-query="formQuery"
              :key="item.name"
              @tab-activated="tabTableItemActivated"
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
import PForm from './p-form'
import TabTableItem from './tab-table-item'

export default {
  name: 'pf-tab-table',
  props: {
    columns: {
      type: Array,
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
    rules: {
      type: [Object, Array],
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
    },
    tabConfig: {
      type: Object,
      default: () => {}
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
      if (this.tabChangeGetData) {
        return
      }
      this.searchedTabs.push(this.activeName)
    },
    tabTableItemActivated (name,done) {
      if (this.tabChangeGetData) {
        return
      }
      console.log()
      if (this.searchedTabs.length && !(this.searchedTabs).indexOf(name) > -1) {
        done()
        this.searchedTabs.push(name)
        if (this.searchedTabs.length === this.tabs.length) {
          this.searchedTabs = []
        }
      }
    },
    reset () {
      this.formData = {}
      this.search()
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
      let list = []
      this.formItems.forEach((item) => {
        if (item.slot) {
          list.push(item.slot)
        }
        if (item.type === 'grid') {
          item.columns.forEach((col) => {
            if (col.slot) {
              list.push(col.slot)
            }
          })
        }
      })
      return list
    },
    columnSlots () {
      if (!this.columns.length) {
        return this.tabs.forEach((item) => {
          return item.columns.filter((c) => c.slot).map((c) => c.slot)
        })
      }
      return this.columns.filter((c) => c.slot).map((c) => c.slot)
    }
  },
  watch: {},
  components: {
    TabTableItem,
    PForm,
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

