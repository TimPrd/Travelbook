<template v-for="item in items">
  <div class="container">
    <h1>{{item.email}}</h1>

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
