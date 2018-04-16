<template>
  <div>
    <div class="tb-cards row">
      <div v-for="card in cards">
        <tb-card :card="card"/>
      </div>
    </div>
  </div>

</template>

<script>
  import {HTTP} from './../http/http-base';
  import tbHeader from './Header.vue';
  import tbCard from './Card.vue';
  import tbMap from './Map.vue';

  export default {
    name: "Favorites",
    components: {tbHeader, tbCard, tbMap},
    data() {
      return {
        cards: {},
        title: ''
      };
    },

    created: function () {
      this.fetchItems();
    },

    methods: {
      submit() {
        HTTP.post(`/cards`, {'title': this.title}).then(response => {
          this.items = response.data;
          console.log(this.items)
        });
      },

      fetchItems() {
        HTTP.get(`/cards`).then(response => {
          console.log(response.data)
          this.cards = response.data;
          console.log(this.items)
        });
      }
    }
  }
</script>

<style scoped>

</style>
