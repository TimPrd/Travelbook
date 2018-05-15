<template>
  <!-- Card -->
  <div class="tb-card">
    <img :style="{ 'backgroundImage': 'url(' + imgSrc + ')' }" class="card-img col m5 s5">
    <div class="card-desc col m7 s7 row">
      <div class="header m12">

        <h3 class="title m12">{{card.title}}</h3>
        <img src="#" class="cat-ico m3" alt=""/>
        <div class="localisation bold italic m9">{{card.adress}}</div>
        <div class="category bold m9">{{card.category.toUpperCase() || "Non reconnue"}}</div>
        <div class="score">
          <i class="fas fa-star star"></i><!-- Full star -->
          <i class="fas fa-star star"></i><!-- Full star -->
          <i class="fas fa-star star"></i><!-- Full star -->
          <i class="fas fa-star star"></i><!-- Full star -->
          <i class="far fa-star star"></i><!-- Empty star -->
        </div>
      </div>
      <div class="summary m12">
        {{card.body}}
      </div>
      <div class="btn-bar m12">
        <router-link :to="{ name: 'cardView', params: {id:card.id} }">
            <button class="btn-white m4">Lire la suite</button>
        </router-link>
        <button @click="addInCart(card)" class="btn-white m1">+</button> <!-- trigger event : add -->
        <button @click="removeInCart(card)" class="btn-white m1">-</button> <!-- trigger event : add -->
      </div>
    </div>
  </div>
  <!-- End card -->
</template>

<script>
import Vue from "vue";
import { EventBusModal } from "../events/event-modals";
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);

export default {
    props: {
        card: {
          type: Object
        }
    },
    data() {
        return {
            imgSrc: this.card.cover_picture,
        }
    },
    computed: {
        usr: function() {
            // `this` pointe sur l'instance vm
            return this.$store.state.usr
        }
    },
    mounted() {
        console.log("Card : "+this.card);
    },
    created() {
        EventBusModal.$on("usr-loaded", usrLoaded => {
            this.usr = this.$store.state.usr;
        });
    },
    methods: {
        addInCart(card) {
            if(typeof this.usr._id === 'undefined')
                EventBusModal.$emit("change-state-login", true).then(
                    this.$store.commit("addCart", card)
                );
            else
                this.$store.commit("addCart", card);
            Vue.swal({
              type: 'info',
              title: 'Fiche ajoutée !',
              text: 'Vous avez ajouté : ' + card.title,
          });
        },
        removeInCart(card){
            this.$store.commit("removeCart", card);
            Vue.swal({
              type: 'info',
              title: 'Fiche retirée !',
              text: 'Vous avez retirée : ' + card.title,
          });
        }
    }
};
</script>
