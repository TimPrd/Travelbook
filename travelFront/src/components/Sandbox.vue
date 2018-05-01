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



  <file-base64
    v-bind:multiple="true"
    v-bind:done="getFiles">
  </file-base64>

  </div>
</template>
<script>
import {HTTP} from './../http/http-base';
import Loader from './loader/Loader';
import geocoder from 'geocoder';
import fileBase64 from 'vue-file-base64'

export default {
  components: {
    fileBase64
  },
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
     onChangeImage(file) {
      console.log(file)
    },
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
    },
     getFiles(files){
        console.log(files);
      }
  }
};
</script>
<style>
.user {
  width: 128px;
  height: 128px;
}

</style>
