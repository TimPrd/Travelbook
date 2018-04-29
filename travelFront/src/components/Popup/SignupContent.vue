<template>
  <div class="content-wrapper">
    <form @submit.prevent="validateBeforeSubmit()" class="content row col s10 offset-s1 m9 offset-m1">
      <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
 @vdropzone-complete="afterComplete" />
      <p class="row">
        <label for="pseudo">Pseudo : </label>
        <input v-model="credentials.username" type="text" id="pseudo" class="tb-input" required/>
      </p>
      <p class="row">
        <label for="pseudo">Nom : </label>
        <input v-model="credentials.lastName" type="text" id="lastname" class="tb-input" required/>
      </p>
      <p class="row">
        <label for="pseudo">Prénom : </label>
        <input v-model="credentials.firstName" type="text" id="firstname" class="tb-input" required/>
      </p>
      <p class="row">
        <label for="mail">Email : </label>
        <input v-model="credentials.email" type="email" id="mail" class="tb-input" required/>
      </p>
      <p class="row">
        <label for="pwd">Mot de passe : </label>
        <input v-model="credentials.password" type="password" id="pwd" class="tb-input" required/>
      </p>
      <p class="row">
        <label for="pwdConfirm">Confirmation mot de passe : </label>
        <input v-model="credentials.passwordConf" @change="chkPass" type="password" id="pwdConfirm" class="tb-input" required/>
      </p>
      <p class="row">
        <label for="city">Ville : </label>
        <input v-model="credentials.city" type="text" id="city" class="tb-input"/>
      </p>
      <p class="row">
        <label for="country">Pays : </label>
        <input v-model="credentials.country" type="text" id="country" class="tb-input"/>
      </p>
      <div class="col s12 m12">
      <button type="submit" ref="btnSubmit" class="btn-next tb-btn btn-red right">S'inscrire</button>
      <button @click="close()" class="btn-close tb-btn btn-red right">Fermer</button>
    </div>
      <p>{{passInfo}}</p>

    <p></p>
    </form>
    
  </div>
</template>

<script>
import { EventBusModal } from "../../events/event-modals";
import auth from "./../../auth/index";
import { HTTP } from "./../../http/http-base";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.css";

export default {
  name: "modalSignupContent",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFiles: 4,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: { "My-Awesome-Header": "header value" },
        accept: function accept(file, done) {
          done();
        }
      },
      showModal: false,
      credentials: {
        avatar: "",
        username: "",
        pseudo: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConf: ""
      },
      passInfo: ""
    };
  },
  methods: {
    afterComplete(file) {
      console.log(file);
      this.credentials.avatar = file.dataURL;
    },
    validateBeforeSubmit() {
      //add more security
      this.submit();
    },
    chkPass() {
      if (this.credentials.password !== this.credentials.passwordConf) {
        this.passInfo = "Passwords don't match !";
        this.$refs.btnSubmit.disabled = true;
      } else {
        this.passInfo = "Passwords matches !";
        this.$refs.btnSubmit.disabled = false;
      }
    },
    close() {
      this.showModal = false;
      EventBusModal.$emit("change-state-login", this.showModal);
    },
    submit() {
      var that = this;
      console.log(this.credentials)
      var p1 = new Promise(function(resolve, reject) {
        resolve(auth.signup(this, that.credentials, "secretquote"));
      });

      p1
        .then(function(value) {
          console.log(value); // "Succès!"
           HTTP.get("/account").then(response => {
                    let user = response.data;
                    that.$store.commit("instanceUser",user);
                    console.log(user)
                    EventBusModal.$emit('usr-loaded', user);
                });
          throw "Inscription impossible";
        })
        .catch(function(e) {
          console.error(e);
        })
        .then(function(e) {
          that.error = e;
        });
    }
  }
};
</script>
