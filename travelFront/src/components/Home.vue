<template>
    <div id="page-top">
        <tb-popup-login v-show="showLoginPopup"></tb-popup-login>
        <!-- Header -->
        <tb-header></tb-header>
        <!-- End Header -->
        <!-- Content -->
        <section class="container center-align">
            <div class="filter-bar row">
                <input v-model="country" type="text" class="country margin-left-9 margin-left-0-phone tb-input center-align col m3 s12" placeholder="Pays">
                <input  @keyup.enter="showSearch" v-model="category" type="text" class="category tb-input center-align col m3 s12" placeholder="Catégorie">
                <button @click="showSearch" class="tb-btn btn-red search-btn btn-red col m3 s12">Rechercher</button>
            </div>

            <div v-show="searched" class="tb-cards row">
                <h2 class="">Résultat de la Recherche</h2>
                <div class="section-deco">v</div>
                <div class="deco-line col s12 m12"></div>
                <!-- Display result -->
                <div v-if="list.length === 0" class="center">
                  <p>Pas de fiches correspondantes :(</p>
                </div>
                <div v-else class="tb-cards row">
                  <tb-card v-for="card in list" :card="card" />
                </div>
                <!-- End Display result -->
            </div>

            <!-- Section favorites -->
            <div class="favorites row">
                <h2 class="">Les favoris</h2>
                <div class="section-deco">v</div>
                <div class="deco-line col s12 m12"></div>

                <!-- Cards section -->
                <div class="tb-cards row">
                    <tb-card v-for="card in cards" :card="card" />
                </div>
                <!-- End cards section -->
            </div>
            <!-- End section favorites -->
            <!-- Section map -->
            <div class="map row">
                <h2 class="">La carte</h2>
                <div class="section-deco">v</div>
                <div class="deco-line m12"></div>
                <div class="wrapper-map col m12 s12">
                    <tbMap/>
                <!-- <tbMap/> -->
                </div>
            </div>
            <!-- End section map -->
        </section>
        <!-- End Content -->
    </div>
</template>

<script>
import { HTTP } from "./../http/http-base";
import tbHeader from "./Header.vue";
import tbCard from "./Card.vue";
import tbMap from "./Map.vue";
import tbPopupLogin from "./Popup/Login";
import { EventBusModal } from "../events/event-modals";
import auth from "./../auth/";
import InfiniteLoading from "vue-infinite-loading";
import tbLoader from "./Loader/Loader";

export default {
  name: "HelloWorld",
  components: {
    tbHeader,
    tbCard,
    tbMap,
    tbPopupLogin,
    tbLoader,
    InfiniteLoading
  },
  data() {
    return {
      cards: [],
      showLoginPopup: false,
      searched: false,
      loggedIn: auth.loggedIn(),
      category: "",
      country: "",
      list: []
    };
  },

  mounted() {
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
    },
    showSearch() {
      EventBusModal.$emit("loading-loader", true);
      HTTP.get(`/cards`, {
        params: {
          country: this.country,
          category: this.category
        }
      }).then(response => {
        this.list = response.data;
        EventBusModal.$emit("loading-loader", false), 4000
      });
      this.searched = true;
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
    infiniteHandler($state) {
      let api = "/allcards";
      HTTP.get(api, {
        params: {
          country: this.country,
          category: this.category
        }
      }).then(({ data }) => {
        console.log(data);
        if (data.length) {
          if (this.checkDuplicateInObject("id", this.list)) {
            $state.complete();
          } else {
            this.list = this.list.concat(data);
            $state.loaded();
          }
        } else {
          $state.complete();
        }
      });
    },
    fetchItems() {
      EventBusModal.$emit("loading-loader", true);
      HTTP.get(`/favorites`).then(response => {
        this.cards = response.data;
        EventBusModal.$emit("loading-loader", false);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
