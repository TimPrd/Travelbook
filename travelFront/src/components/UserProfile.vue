<template>
    <div id="page-top">
        <tb-popup-login v-show="showLoginPopup"></tb-popup-login>
        <!-- Header -->
        <tb-header></tb-header>


        <section class="container center-align">
            <div class="main-info">
                <h2 class="">Profil</h2>
                <div class="row">
                    <button @click="disconnect()" class="tb-btn btn-red col s12 m4 offset-m4" >Deconnexion</button>
                </div>
                <div>
                    <p><b>ID : </b>{{ usr._id }}</p>
                    <p><b>PhotoPath : </b>{{ usr.avatar }}</p>
                    <p><b>username : </b>{{ usr.username }}</p>
                    <p><b>email : </b>{{ usr.email }}</p>
                    <p><b>firstName : </b>{{ usr.firstName }}</p>
                    <p><b>lastName : </b>{{ usr.lastName }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import tbHeader from "./Header.vue";
import tbPopupLogin from "./Popup/Login";
import tbLoader from "./Loader/Loader";
import auth from "./../auth/";
import { EventBusModal } from "../events/event-modals";

export default {
    name: "UserProfile",
    components: {
        tbHeader,
        tbPopupLogin,
        tbLoader,
    },
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
