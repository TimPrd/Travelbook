<template>
  <!-- Card (book version) -->
  <div class="tb-card">
      <div :style="{ 'backgroundImage': 'url(' + imgSrc + ')' }" class="card-img col m5 s5"></div>
    <div class="card-desc col m7 s7 row">
      <div class="header m12">

        <h3 class="title m12">{{card.title}}</h3>
        <img src="#" class="cat-ico m3" alt=""/>
        <div class="localisation bold italic m9">{{card.adress}}</div>
        <div class="category bold m9">Catégorie</div>
      </div>
      <div class="summary m12">
        {{card.body}}
      </div>
      <div class="btn-bar m12">
        <button class="btn-white m4">
          <router-link :to="{ name: 'cardView', params: {id:card.id} }">Lire la suite</router-link>
        </button>
        <button @click="removeFromCart(card)" class="btn-blue btn-round m1"><i class="fas fa-trash-alt"></i></button> <!-- trigger event : add -->
      </div>
    </div>
  </div>
  <!-- End card -->
</template>

<script>
import Vue from "vue";
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
        mounted: function () {
            console.log(this.card)
        },
        methods: {
        removeFromCart(card){
            this.$store.commit("removeCart", card);
            Vue.swal({
              type: 'info',
              title: 'Fiche retirée !',
              text: 'Vous avez retirée : ' + card.title,
          });
        }
    }
  }
</script>
