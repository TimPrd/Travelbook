<template>
    <div id="app" > <!-- v-bind:class="{ 'black': isLoading}" -->
        <div v-show="isLoading" ><tbLoader/></div>
        <tb-popup-login v-show="showLoginPopup"></tb-popup-login>
        <!-- Header -->
        <tb-header></tb-header>
        <!-- End Header -->
        <router-view/>
    </div>
</template>

<script>
import tbLoader from "../src/components/Loader/Loader";
import tbHeader from "../src/components/Header.vue";
import tbPopupLogin from "../src/components/Popup/Login";
import auth from "./auth";
import router from "./router";
import {EventBusModal} from "./events/event-modals";

export default {
    name: 'App',
    components: { tbLoader, tbPopupLogin, tbHeader },
    data() {
    return {
        isLoading: false,
        showLoginPopup: false,
        loggedIn: auth.loggedIn(),
    }
    },
    mounted() {
        //Listen for changement on login popup
        EventBusModal.$on('loading-loader', loading => {
          this.isLoading = loading;
        }),
        //Listen for changement on login popup
        EventBusModal.$on("change-state-login", showModal => {
            this.showLoginPopup = showModal;
        });
    },
    created() {
        this.fetchItems();
        auth.onChange = loggedIn => {
            this.loggedIn = loggedIn;
        };
    },
    methods: {
        disconnect() {
            auth.logout();
            router.push("/");
        },
        hasDuplicates(array) {
            return new Set(array).size !== array.length;
        },
        checkDuplicateInObject(propertyName, inputArray) {
            var seenDuplicate = false,
                testObject = {};

            inputArray.map(function(item) {
                var itemPropertyName = item[propertyName];
                if (itemPropertyName in testObject) {
                    testObject[itemPropertyName].duplicate = true;
                    item.duplicate = true;
                    seenDuplicate = true;
                } else {
                    testObject[itemPropertyName] = item;
                    delete item.duplicate;
                }
            });
            console.log(seenDuplicate);
            return seenDuplicate;
        },
    }

}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

body {
  margin: 0px;
  font-family: Helvetica, Verdana, sans-serif;
}

</style>
