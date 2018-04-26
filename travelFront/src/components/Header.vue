<template>
    <header class="row">
        <div class="left-side col s5 m4">
            <div class="search-bar row margin-bottom-0">
                <input class="search col s10 m4 right" type="text" placeholder="Recherche" />
                <i class="ico fas fa-search right"></i>
            </div>
            <div class="button-menu row margin-bottom-0">
                <div v-if="!loggedIn" >
                    <!-- Disconnected -->
                    <router-link to="/" tag="button" class="tb-btn btn-red col s12 m5 right" >Fiches</router-link>
                    <button @click="openLogin()" class="tb-btn btn-red col s12 m5 right" >Connexion</button>
                </div>
                <div v-if="loggedIn" >
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
            <div v-if="loggedIn" class="btn-account btn-round"></div>
        </div>
    </header>
</template>

<script>
import tbPopupLogin from './Popup/Login';
import auth from "./../auth/";
import {EventBusModal} from "../events/event-modals";

export default {
    name: "Home",
    components: { tbPopupLogin },
    methods: {
        openLogin() {
            this.showModal = true;
            EventBusModal.$emit('change-state-login', this.showModal);
        },
        disconnect() {
            auth.logout();
        },
    },
    data() {
        return {
            showModal: false,
            showSignin: false,
            loggedIn: auth.loggedIn(),
        }
    },
    created() {
        auth.onChange = loggedIn => {
            this.loggedIn = loggedIn;
        };
    },
}
</script>
