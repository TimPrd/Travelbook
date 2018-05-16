<template>
  <!-- Card -->
  <div >
    
        <h3 class="title m12">{{card.title}}</h3>
        
  </div>
  <!-- End card -->
</template>

<script>
import { HTTP } from "./../http/http-base";

import { EventBusModal } from "../events/event-modals";
  export default {
    data() {
      return { card: '' }
    },
    created() {
      EventBusModal.$emit("loading-loader", true);
      HTTP.get(`card/`+ this.$route.params.id ).then(response => {
        this.card = response.data;
        EventBusModal.$emit("loading-loader", false);
      });
    },
  }
</script>

