import pfTable from './src/components/pf-table/pf-table'
import tFrom from './src/components/pf-table/t-form'
import tDialogForm from './src/components/pf-table/t-dialog-form'
import pfTabTable from './src/components/pf-table/pf-tab-table'
import tTable from './src/components/pf-table/t-table'

const elFromTable = {
  install: function (Vue) {
    Vue.component('pf-table', pfTable)
    Vue.component('p-form', tFrom)
    Vue.component('t-dialog-form', tDialogForm)
    Vue.component('pf-tab-table', pfTabTable)
    Vue.component('t-table', tTable)
  }
}
export default elFromTable