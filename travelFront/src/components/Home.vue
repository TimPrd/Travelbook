<template>
    <div id="page-top">
        <tb-popup-login v-show="showLoginPopup"></tb-popup-login>
        <!-- Header -->
        <tb-header></tb-header>
        <!-- End Header -->
        <!-- Content -->
        <section class="container center-align">
            <div class="filter-bar row">
                <input type="text" class="country tb-input center-align col m3 s12" placeholder="Pays">
                <input type="text" class="category tb-input center-align col m3 s12" placeholder="Catégorie">
                <button class="tb-btn btn-red search-btn btn-red col m3 s12">Rechercher</button>
            </div>
            <!-- Section favorites -->
            <div class="favorites row">
                <h2 class="">Les favoris</h2>
                <div class="section-deco">v</div>
                <div class="deco-line col m12"></div>

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

export default {
  name: "HelloWorld",
  components: { tbHeader, tbCard, tbMap, tbPopupLogin },
  data() {
    return {
      cards: [],
      showLoginPopup: false
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
  },
  methods: {
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
