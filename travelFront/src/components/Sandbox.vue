<template>
  <div class="container">
    <h1>{{items.message}}</h1>
    <h1>Create A Ticket</h1>

  </div>
</template>
<script>
import {HTTP} from './../http/http-base';
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
<style>
body{
  background-color: coral;
}
</style>
