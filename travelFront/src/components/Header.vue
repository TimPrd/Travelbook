<template>
    <header class="row">
        <div class="left-side col s5 m4">
            <div class="search-bar row margin-bottom-0">
                <input class="search col s10 m4 right" type="text" placeholder="Recherche" />
                <i class="ico fas fa-search right"></i>
            </div>
            <div class="button-menu row margin-bottom-0">
                <div v-if="!usr.username" >
                    <!-- Disconnected -->
                    <router-link to="/" tag="button" class="tb-btn btn-red col s12 m5 right" >Fiches</router-link>
                    <button @click="openLogin()" class="tb-btn btn-red col s12 m5 right" >Connexion</button>
                </div>
                <div v-if="usr.username" >
                    <!-- Connected -->
                    <router-link to="/" tag="button" class="tb-btn btn-red col s12 m5 right" >Nouveau Book</router-link>
                    <router-link to="/" tag="button" class="tb-btn btn-red col s12 m5 right" >Nouvelle Fiche</router-link>
                </div>
            </div>
          </div>
        <div class="wrapper-logo col s4 m4 offset-m4">
            <router-link to="/">
                <img src="../assets/img/logo.png" class="logo" alt="TravelBook"/>
            </router-link>
            <!-- Connected -->
            <router-link to="/profile" v-if="usr.username" class="btn-account btn-round">
                <img v-if="usr.username" :src="usr.avatar" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
                <span class="center">{{usr.email}}</span>
                <button @click="disconnect()" class="tb-btn btn-red col s12 m5 right" >Deconnexion</button>
            </router-link>
        </div>
    </header>
</template>

<script>
import tbPopupLogin from "./Popup/Login";
import auth from "./../auth/";
import { EventBusModal } from "../events/event-modals";

export default {
  name: "Home",
  components: { tbPopupLogin },
  computed: {
    usr: function() {
      // `this` pointe sur l'instance vm
      return this.$store.state.usr
    }
  },
  methods: {
    openLogin() {
      this.showModal = true;
      EventBusModal.$emit("change-state-login", this.showModal);
    },
    disconnect() {
      auth.logout(this);
    }
  },
  data() {
    return {
      showModal: false,
      showSignin: false,
      loggedIn: auth.loggedIn()
    };
  },
  created() {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn;
    };
    EventBusModal.$on("usr-loaded", usrLoaded => {
      this.usr = this.$store.state.usr;
    });
  }
};
</script>
