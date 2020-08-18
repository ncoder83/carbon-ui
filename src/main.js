import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store'

import $ from 'jquery'

Vue.prototype.$http = axios;
Vue.prototype.jq = $;

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.filter('currency', function (value) {
  if (value)
    return value.toLocaleString("en-US", { style: 'currency', currency: 'USD' });
  return 0;
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
