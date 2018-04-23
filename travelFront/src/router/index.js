import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Sandbox from "@/components/Sandbox";
import Users from "@/components/Users";
import Dashboard from "@/components/Pages/Dashboard";
import Signup from "@/components/Signup";
import Login from "@/components/Login";
import Favorites from "@/components/Favorites";
import Loader from "@/components/Loader/Loader";
import Cards from "@/components/Cards";
import CardView from "@/components/CardView"
import MapTB from "@/components/Map";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },

    /* SANDBOX */
    {
      path: "/sandbox",
      name: "Sandbox",
      component: Sandbox
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
      /*meta: {
        requiresAuth: true
      }*/
    },

    /* END SANDBOX */

    /* USER */
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/map",
      name: "Map",
      component: MapTB
    },
    {
      path: "/signin",
      component: Login
    },
    {
      path: "/signup",
      component: Signup
    },
    {
      path: "/favorites",
      component: Favorites
    },
    {
      path: "/loader",
      component: Loader
    },
    {
      path: "/cards",
      component: Cards,
      name: "cards",
      props: true
    },
    {
      path: "/card/:id",
      component: CardView,
      name: "cardView"
    },/*
    {
      path: "/card/",
      component: CardCreate,
      name: "cardCreate"
    }*/
  ]
});
