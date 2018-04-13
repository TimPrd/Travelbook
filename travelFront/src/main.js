import Vue from 'vue';
import App from './App.vue';

import router from './router'

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);


Vue.config.productionTip = false;

import './assets/css/main-style.css';
import './assets/css/materialize.min.css';
import auth from './auth'

if(auth.checkAuth() )
  {
    alert('youhou')
  }
  else{
    alert('nope')
  }

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth) {
     next('/');
  } else {
    next();
  }
  });

  

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})