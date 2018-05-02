<template>
  <!-- Card -->
<div>
   <div class="content-wrapper">
      <div class="container">
         <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
            @vdropzone-complete="afterComplete" style="width:750px;height:355px"/>
         <div class="content">
           <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
            <p style="text-align:center; font-size:18px;" >{{infos.adress}}</p>
            <!--ville/pays-->
            <!-- nom du lieux-->
            <div class="row">
               <input class="col m6" v-model="infos.title" style="text-align:center">
               <!--<p v-if="infos.adress" > Latitude : {{infos.adress.geometry.location.lat()}} - Longitude : {{infos.adress.geometry.location.lng()}} </p> -->
               <p style="color:#7DB7FF"> {{new Date().getFullYear()}} </p>
            </div>
            <!--date-->
         </div>
      </div>
      <div class="barre">
         <!--nom d'utilisateur-->
         <p>{{infos.adress}}</p>
         <img src="location-pointer.svg" style="width:3%">
         <!--adresse-->
      </div>
      <br/>
      <div id="conteneur">
         <div id="colonne1">
            <div>
               <vue-dropzone ref="myVueDropzone" id="img2" :options="dropzoneOptions"
                  @vdropzone-complete="afterComplete"/>
               <div class="row">
                  <div class="input-field col s12">
                     <textarea v-model="infos.para1" id="textarea1" class="materialize-textarea"></textarea>
                  </div>
               </div>
            </div>
         </div>
         <div id="colonne2">
            <div>
               <div class="row">
                  <div class="input-field col s12">
                     <textarea v-model="infos.para2" id="textarea2" class="materialize-textarea"></textarea>
                  </div>
               </div>
               <vue-dropzone ref="myVueDropzone" id="img3" :options="dropzoneOptions"
                  @vdropzone-complete="afterComplete"/>
            </div>
         </div>
         <div id="bas">
         </div>
      </div>
   </div>
    <div class="col s12 m12">
      <button @click="submit()" class="btn-next tb-btn btn-red right">Créer</button>
    </div>
</div>
  <!-- End card -->
</template>

<script>
import Vue from "vue";
import { EventBusModal } from "../events/event-modals";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.css";
import { HTTP } from "./../http/http-base";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    //@todo: need to be erased in the final git
    key: "AIzaSyAnrCMvYZ_puf67n8Xj9tU_9LNgQgpGo90",
    libraries: "places"
  }
});
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFiles: 1,
        maxFilesize: 0.05,
        addRemoveLinks: true,
        headers: { "My-Awesome-Header": "header value" },
        accept: function accept(file, done) {
          done();
        }
      },
      infos: {
        title: "Your Title",
        para1: "Your text",
        para2: "Your text",
        author: this.$store.state.usr.username,
        adress: "",
        pictures: []
      }
    };
  },
  methods: {
    afterComplete(file) {
      if (this.infos.pictures.length <= 4)
        this.infos.pictures.push(file.dataURL); //gérer le remove
      else alert("Trop d'images");
    },
    submit() {
      HTTP.post("/card", this.infos).then(response => {
        console.log(response);
        alert("ok");
      });
    },
    setPlace(place) {
      this.infos.adress = place.formatted_address;
    },
  }
};
</script>
<style scoped>
.container {
  position: relative;
  max-width: 750px;
  margin: auto;
}

.container .content {
  position: absolute;
  bottom: 0;
  background: #f1f1f1;
  opacity: 0.8;
  color: #7db7ff;
  width: 100%;
}

.barre {
  width: 750px;
  border-style: dashed;
  border-color: #7db7ff;
  overflow: auto;
  margin: auto;
}

p {
  display: inline-block;
  color: black;
  font-size: 15px;
  font-family: Arial, Times New Roman;
  text-align: justify;
}

#img2 {
  width: 350px;
  height: 250px;
}

#img3 {
  width: 350px;
  height: 250px;
}

#conteneur {
  width: 750px;
  margin-top: 20px;
  padding-bottom: 25px;
  padding-top: 5px;
  margin: auto;
}

#colonne1 {
  width: 350px;
  height: 250px;
  background-color: ;
  float: left;
}

#colonne2 {
  width: 350px;
  height: 250px;
  background-color: ;
  float: right;
}

#bas {
  clear: both;
}
</style>
