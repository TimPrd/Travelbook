<template>
    <div id="page-top">
        <section class="container center-align">
            <div class="main-info">
                <h2 class="">Profil</h2>
                <div class="row">
                    <button @click="disconnect()" class="tb-btn btn-red col s12 m4 offset-m4" >Deconnexion</button>
                </div>
                <div>
                    <p><b>Username : </b>{{ usr.username }}</p>
                    <p><b>Photo : </b><br/><img v-if="usr.username" :src="usr.avatar" alt="" class="circle responsive-img"></p>
                    <p><b>Email : </b>{{ usr.email }}</p>
                    <p><b>FirstName : </b>{{ usr.firstName }}</p>
                    <p><b>LastName : </b>{{ usr.lastName }}</p>
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
import router from "./../router";
import { EventBusModal } from "../events/event-modals";

export default {
    name: "UserProfile",
    components: {
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
            router.push("/");
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
