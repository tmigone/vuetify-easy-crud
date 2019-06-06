import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify'
import './plugins/fragment'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
