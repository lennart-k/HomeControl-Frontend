import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { homeControl, authContext } from '/api/homeControl'

import 'typeface-inter'
import '/styles/style.sass'

Vue.config.productionTip = false

Vue.config.ignoredElements = [/^mwc-/]
import '@material/mwc-button'
import '@material/mwc-icon-button'
import '@material/mwc-textfield'
import '@material/mwc-formfield'
import '@material/mwc-select'
import '@material/mwc-list/mwc-list-item'
import '@material/mwc-switch'
import '@material/mwc-linear-progress'


let app = new Vue({
  el: '#app-mount',
  render: h => h(App),
  components: { App },
  template: '<App/>',
  router,
  homeControl,
  authContext,
  store
})

window.app = app
window.homeControl = homeControl
