<template>
  <div class="container">
    <h1>{{items.message}}</h1>
    <h1>FOR TEST PURPOSE ONLY</h1>
    <button @click="getGeo"> ici </button>
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
    getGeo(){
// Geocoding
      geocoder.geocode("21 boulevard de grenelle ", function ( err, data ) {
        // do something with data
        console.log(data)
      });

    },
    fetchItems() {
       HTTP.get(``).then(response => {
        this.items = response.data;
        console.log(this.items)
      });
    }
  }
};
</script>
<style>
body{
  background-color: coral;
}
</style>
