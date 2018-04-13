import Vue from 'vue';
import App from './App.vue';

import router from './router'

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

import './assets/css/main-style.css';
import './assets/css/materialize.min.css';


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})