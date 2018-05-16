<template>
    <div id="page-top">
        <!-- Content -->
        <section class="container center-align">
            <div class="filter-bar row">
                <input  @keyup.enter="showSearch" v-model="country" type="text" class="country margin-left-9 margin-left-0-phone tb-input center-align col m3 s12" placeholder="Pays">
                <select class="tb-select category center-align col m3 s12" v-model="category">
                    <option disabled value="">Catégorie</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Lieu">Lieu</option>
                    <option value="Monument">Monument</option>
                </select>
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
import tbCard from "./Card.vue";
import tbMap from "./Map.vue";
import { EventBusModal } from "../events/event-modals";
import auth from "./../auth/";
import InfiniteLoading from "vue-infinite-loading";
import tbLoader from "./Loader/Loader";

export default {
  name: "HelloWorld",
  components: {
    tbCard,
    tbMap,
    tbLoader,
    InfiniteLoading
  },
  data() {
    return {
      cards: [],
      searched: false,
      loggedIn: auth.loggedIn(),
      category: "",
      country: "",
      list: []
    };
  },
  created() {
    this.fetchItems();
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn;
    };
  },
  methods: {
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
