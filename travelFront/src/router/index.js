import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Sandbox from '@/components/Sandbox'
import Users from '@/components/Users'
import Connexion from '@/components/Connexion'
import Dashboard from '@/components/Dashboard'

import Signup from '@/components/Signup'
import Login from '@/components/Login'

import MapTB from '@/components/Map'
Vue.use(Router)

export default new Router({
      mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    /* SANDBOX */
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
   },
    /* END SANDBOX */
    
    /* USER */
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/connexion',
      name: 'Connexion',
      component: Connexion
    },
    {
      path: '/map',
      name: 'Map',
      component: MapTB
    },
    {
      path:'/login',
      component: Login
    },
    {
      path: '/signup',
      component: Signup
    }
    
  ]
})
