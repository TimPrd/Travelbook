<template>
  <div>
    <div>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
      </label>
    </div>
    <gmap-map
      :center="center"
      :zoom="4"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import { HTTP } from "./../http/http-base";

Vue.use(VueGoogleMaps, {
  load: {
    //@todo: need to be erased in the final git
    key: "AIzaSyAnrCMvYZ_puf67n8Xj9tU_9LNgQgpGo90",
    libraries: "places"
  }
});
export default {
  name: "GoogleMap",
  data() {
    return {
      //default to Paris, UPMC - #FrenchDev #UPMC
      center: { lat: 48.8471036, lng: 2.3574989999999616 },
      markers: [],
      currentPlace: null
    };
  },

  mounted() {
    this.fetchItems();
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    //Get the user position
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    //Get all the position of the cards
    fetchItems() {
      HTTP.get(`/allcards`).then(response => {
        let cards = response.data;
        console.log(cards);

        for (var card of cards)
          this.markers.push({
            id: card.id,
            position: { lat: card.lat, lng: card.long },
            icon:{url:"./../../static/img/Marquer.svg"}
          });
      });
    }
  }
};
</script>
<style scoped>
#map {
  width: 500px;
  height: 300px;
}

</style>
