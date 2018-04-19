<template>
  <div class="container">
    <h1>FOR TEST PURPOSE ONLY</h1>
    <button class="btn btn-primary" @click="fetchItems()">retrieve </button>

    <ul v-for="item in items">
      <li>{{item.title}}</li>
    </ul>


    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your title"
        v-model="title"
      >
    </div>
    <button class="btn btn-primary" @click="submit()">add fiche</button>


  </div>
</template>
<script>
import {HTTP} from './../http/http-base';
import Loader from './loader/Loader';
import geocoder from 'geocoder';

export default {
  data() {
    return {
      items: {},
      title:''
    };
  },
  created: function() {
    this.fetchItems();
  },
  components: { Loader },
  methods: {
    submit(){
      HTTP.post(`/cards`, {'title':this.title} ).then(response => {
        this.items = response.data;
        console.log(this.items)
      });
    },

    fetchItems() {
       HTTP.get(`/cards`).then(response => {
        this.items = response.data;
        console.log(this.items)
      });
    }
  }
};
</script>
<style>

</style>
