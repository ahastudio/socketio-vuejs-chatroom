import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import App from './App'
import './assets/reset.css'

Vue.config.productionTip = false

Vue.use(VueSocketio, 'http://localhost:1923')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
