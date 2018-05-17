<template>
  <section class="container row center-align">
        <h2 class="specialTitle">Fiches</h2>
        <div class="section-deco">v</div>
        <div class="deco-line col m12"></div>

        <div class="tb-cards row">
            <tb-card v-for="card in cards" :card="card" />
        </div>

      <div class="pagination-section center" v-if="pages>0">
        <ul class="pagination text-center">
          <li @click="fetchPagination(Number(current) - 1)" v-if="current != 1" class="waves-effect"><a class="a-hover"><i class="material-icons">chevron_left</i></a></li>
          <li @click="fetchPagination(1)" v-if="current != 1" ><a class="a-hover">First</a></li>

          <li v-for="i in range" v-if="i == current" class="active"><a>{{i}}</a></li>
          <li @click="fetchPagination(i)" v-else ><a class="a-hover">{{i}}</a></li>
          <li v-for="i in range" v-if="i == Number(i) + 4 && i < pages" class="disabled"><a>...</a></li>

          <li @click="fetchPagination(pages)" v-if="(current != pages)"><a class="a-hover">Last</a></li>
          <li v-if="(current != pages)"  @click="fetchPagination(Number(current) + 1)"  class="waves-effect"><a class="a-hover"><i class="material-icons">chevron_right</i></a></li>
        </ul>
      </div>
  </section>
</template>
<script>

import {HTTP} from './../http/http-base';
import tbCard from "./Card.vue";
import tbLoader from "./Loader/Loader";
import { EventBusModal } from "../events/event-modals";

export default {
    components: {
        tbCard,
        tbLoader,
    },
  data() {
    return {
      cards: [],
      pages: 0,
      current:1,
      count : (Number(this.current) > 5 ? Number(this.current) - 4 : 1),
      i:0
    }
  },
  created() {
     this.fetchPagination(this.current);
  },
  props: {
      data: String
    },

  methods: {
    fetchPagination(page){
        EventBusModal.$emit("loading-loader", true);
        HTTP.get(`cards/pagination/`+ page ).then(response => {
            this.cards = response.data.cards;
            this.current = response.data.current;
            this.pages = response.data.pages;
            EventBusModal.$emit("loading-loader", false);
        });
    },
  },
  computed:{
    range: function(){
    var array = [],
    j = 0;

    for(var z = this.count ; z <= (Number(this.current) + 4) && z <= this.pages; z++){
    array[j] = z;
    j++;
    }
    return array;
    }
  }
}
</script>
<style>

</style>
