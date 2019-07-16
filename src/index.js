// Dependencies
import Fragment from 'vue-fragment'

// Import vue components
import CrudTable from '@/components/CrudTable.vue'
import CrudFragment from '@/components/CrudFragment.vue'
import CrudFormMixin from '@/mixins/CrudForm.js'

// Declare install function executed by Vue.use()
const VuetifyEasyCrud = {
  install (Vue, options) {
    // Register plugin dependencies
    Vue.use(Fragment.Plugin)

    // Components
    Vue.component('vec-table', CrudTable)
    Vue.component('vec-fragment', CrudFragment)

    // Mixins
    if (options.globalMixins) {
      Vue.mixin(CrudFormMixin)
    }
  }
}

export default VuetifyEasyCrud
