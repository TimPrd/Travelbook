<template>
  <div class="container">
    <h1>{{items.message}}</h1>
    <h1>FOR TEST PURPOSE ONLY</h1>
  </div>
</template>
<script>
import {HTTP} from './../http/http-base';
import geocoder from 'geocoder';

export default {
  data() {
    return {
      items: {}
    };
  },
  created: function() {
    this.fetchItems();
  },

  methods: {
   
    fetchItems() {
       HTTP.get(``).then(response => {
        this.items = response.data;
        console.log(this.items)
      });
    }
  }
};
</script>
<style scoped>
body{
  background-color: coral;
}
</style>
