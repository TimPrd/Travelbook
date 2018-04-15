<template>
  <div class="container">
    <h1>Users</h1>
    <ul v-for="item in items"><li>{{item.email}}</li></ul>
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
       HTTP.get('users').then(response => {
        this.items = response.data;
        console.log(this.items)
      });
    }
  }
};
</script>
<style>

</style>
