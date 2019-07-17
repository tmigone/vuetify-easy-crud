// Dependencies
import Fragment from 'vue-fragment'

// Import vue components
import CrudTable from '@/components/CrudTable.vue'
import VuexTable from '@/components/VuexTable.vue'
import CrudFragment from '@/components/CrudFragment.vue'
import CrudFormMixin from '@/mixins/CrudForm.js'

// Declare install function executed by Vue.use()
const VuetifyEasyCrud = {
  install (Vue, options) {
    // Register plugin dependencies
    Vue.use(Fragment.Plugin)

    // Components
    Vue.component('vec-table', CrudTable)
    Vue.component('vex-table', VuexTable)
    Vue.component('vec-fragment', CrudFragment)

    // Mixins
    if (options && options.globalMixins) {
      Vue.mixin(CrudFormMixin)
    }
  }
}

export {
  CrudTable as VecTable,
  VuexTable as VexTable,
  CrudFragment as VecFragment,
  CrudFormMixin as VecFormMixin
}

export default VuetifyEasyCrud
