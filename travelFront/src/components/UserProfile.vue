<template>
    <div id="page-top">
        <section class="container center-align row">
            <h2 class="center-align specialTitle">Profil</h2>
            <div class="section-deco center-align">v</div>
            <div class="deco-line col s12 m12 center-align"></div>

            <div class="col m12 s12 margin-bottom-30">
                <div class="row">
                    <button @click="disconnect()" class="tb-btn btn-red col s12 m4 offset-m4" >Deconnexion</button>
                </div>
                <div class="user main-info col m4 offset-m4">
                    <div>
                        <p><b>Username : </b>{{ usr.username }}</p>
                        <p><b>Photo : </b><br/><img v-if="usr.username" :src="usr.avatar" alt="" class="circle responsive-img"></p>
                        <p><b>Email : </b>{{ usr.email }}</p>
                        <p><b>FirstName : </b>{{ usr.firstName }}</p>
                        <p><b>LastName : </b>{{ usr.lastName }}</p>
                    </div>
                </div>
            </div>

            <h2 class="center-align specialTitle">Fiches</h2>
            <div class="section-deco center-align">v</div>
            <div class="deco-line col s12 m12 center-align"></div>
            <div class="tb-cards row">
                <tb-card v-for="card in list" :card="card" />
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
import tbCard from "./Card.vue";
import { HTTP } from "./../http/http-base";

export default {
    name: "UserProfile",
    components: {
        tbLoader,
        tbCard,
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
            loggedIn: auth.loggedIn(),
            list: [],
        };
    },
    created() {
        auth.onChange = loggedIn => {
            this.loggedIn = loggedIn;
        };
        EventBusModal.$on("usr-loaded", usrLoaded => {
            this.usr = this.$store.state.usr;
        });
        HTTP.get(`/createdBy`,  { params: { username: this.usr.username } } )
        .then(response => {
            console.log(response.data)
            this.list = response.data;
        });
    }
};
</script>
