import pfTable from './src/components/pf-table/pf-table'
import pFrom from './src/components/pf-table/p-form'
import pDialogForm from './src/components/pf-table/p-dialog-form'
import pfTabTable from './src/components/pf-table/pf-tab-table'
import pTable from './src/components/pf-table/p-table'

const elFromTable = {
  install: function (Vue) {
    Vue.component('pf-table', pfTable)
    Vue.component('p-form', pFrom)
    Vue.component('p-dialog-form', pDialogForm)
    Vue.component('pf-tab-table', pfTabTable)
    Vue.component('p-table', pTable)
  }
}
export default elFromTable
