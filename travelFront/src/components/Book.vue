<template>
  <div id="page-top">
    <!-- Content -->
    <section class="container center-align">

      <!-- Section Book -->
      <div class="bookCards row">
        <h2 class="specialTitle">Nouveau Book</h2>
        <div class="section-deco">v</div>
        <div class="deco-line col m12"></div>

          <div class="filter-bar row">
              <button @click="generateEbook()" class="tb-btn btn-red search-btn btn-red col m4 s12 offset-m8 pull-m4">Générer Book</button>
              <button @click="generatePDF()" class="tb-btn btn-red search-btn btn-red col m4 s12 offset-m8 pull-m4">Générer PDF</button>
          </div>

        <!-- Cards section -->
        <div class="tb-cards row">
          <tb-card v-for="card in cart" :card="card" />
        </div>
        <!-- End cards section -->
      </div>

      <!-- End section favorites -->
      <!-- Section map -->
      <div class="bookMap row">
        <h2 class="specialTitle">Carte du book</h2>
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
import tbCard from "./CardBook.vue";
import tbMap from "./Map.vue";
import tbPopupLogin from "./Popup/Login";
import { EventBusModal } from "../events/event-modals";
import auth from "./../auth/";
import InfiniteLoading from "vue-infinite-loading";
import tbLoader from "./Loader/Loader";

export default {
  name: "Book",
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
      published: false,
      loggedIn: auth.loggedIn(),
      category: "",
      country: "",
      list: [],
    };
  },
computed: {
    cart () {
      return this.$store.state.cart
    }
  },
  mounted() {
    //Listen for changement on login popup
    EventBusModal.$on("change-state-login", showModal => {
      this.showLoginPopup = showModal;
    });
  },
  created() {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn;
    };
  },
  methods: {
    disconnect() {
      auth.logout();
    },
    generatePDF(){
    let ids = []
      this.cart.forEach(element => {
          ids.push(element.id)
      });
      var that=this;
      HTTP.put("generatorPDF", ids, {responseType: 'arraybuffer'}
      ).then(function (response) {
        console.log(response)
        that.download(response,"file.pdf")
     
      })
    },
    generateEbook() {
      let ids = []
      this.cart.forEach(element => {
          ids.push(element.id)
      });
      var that = this;
      HTTP.put("generatorEPUB", ids , {responseType: 'arraybuffer'}
      ).then(function (response) {
        console.log(response)
        that.download(response,"book.epub")
    })
    },
    download(response, nameFile){
      const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', nameFile); //or any other extension
        document.body.appendChild(link);
        link.click();
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
