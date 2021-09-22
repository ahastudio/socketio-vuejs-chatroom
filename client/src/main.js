import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

import App from './App.vue';

import './assets/reset.css';

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:1923',
}));

new Vue({
  render: (h) => h(App),
}).$mount('#app');
