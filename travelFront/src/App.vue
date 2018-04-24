<template>
  <div id="app" > <!-- v-bind:class="{ 'black': isLoading}" -->
    <div v-show="isLoading" ><tbLoader/></div>
    <router-view/>
  </div>
</template>

<script>
import tbLoader from "./components/Loader/Loader";
import {EventBusModal} from "./events/event-modals";

export default {
  name: 'App',
  components: { tbLoader },
  data() {
    return {
      isLoading: false,
    }
  },
  mounted() {
    //Listen for changement on login popup
    EventBusModal.$on('loading-loader', loading => {
      this.isLoading = loading;
    })
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

body {
  margin: 0px;
  font-family: Helvetica, Verdana, sans-serif;
}

</style>
