import Vue from 'vue';
import App from './App.vue';
import _ from 'underscore'
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
      var bool = false;
      state.cart.forEach(element => {
        if(element.id === card.id) bool = true;
      });
      if(bool === false)
        state.cart.push(card)
    },
    removeCart: (state, card) => {
      state.cart = state.cart.filter( (el) => { return el.id !== card.id }); 
    },
    instanceUser: (state, usr) => {
      state.usr = usr;
    },
    destroyUser: (state) => {
      state.usr = {};
      state.cart = {};
    }

  }
});

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/notFound');
  } else {
    next();
  }

  /*var token = localStorage.getItem('id_token');

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth) {
     next('/');
  } else {
    next();
  }*/
  });



new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
