import Vue from 'vue';
import App from './App.vue';

import router from './router';

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)



Vue.config.productionTip = false;

import './assets/css/main-style.css';
import './assets/css/popup.css';
import './assets/css/materialize.min.css';
import auth from './auth'


const store = new Vuex.Store({
  state: {
    cart: [],
    usr: {}
  },
  plugins: [createPersistedState()],
  mutations: {
    addCart: (state, card) => {
      state.cart.push(card)
    },
    removeCart: (state, card) => {
      state.cart = state.cart.filter( (el) => { return el._id !== card._id }); 
    },
    instanceUser: (state, usr) => {
      state.usr = usr;
    },
    destroyUser: (state) => {
      state.usr = {};
    }

  }
});


router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('id_token');

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth) {
     next('/');
  } else {
    next();
  }
  });



new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
