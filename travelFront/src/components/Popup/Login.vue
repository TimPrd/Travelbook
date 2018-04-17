<template>
  <!-- Connection Popup -->
  <div class="row margin-bottom-0">
    <div class="popup-bg" v-on:click="close()"></div>
      <div class="popup connection col s10 offset-s2 pull-s1 m10 offset-m2 pull-m1">
        <div class="header">
          <div class="wrapper-logo">
            <img src="../../assets/img/logo.png" class="logo" alt="TravelBook"/>
          </div>
          <div class="wrapper-btn">
            <button @click="showLogin()" v-bind:class={selected:!showSignupPart} class="tb-btn btn-red col s12 m4">Connexion</button>
            <button @click="showSignup()" v-bind:class={selected:showSignupPart} class="tb-btn btn-red col s12 m4">Inscription</button>
          </div>
        </div>

        <div v-show="!showSignupPart" class="content row col s10 offset-s1 m9 offset-m1">
          <p class="row">
            <label for="mail">Email : </label>
            <input type="email" id="mail" class="tb-input"/>
          </p>
          <p class="row">
            <label for="pwd">Mot de passe : </label>
            <input type="password" id="pwd" class="tb-input"/>
          </p>
        </div>
        <div v-show="!showSignupPart" class="col s12 m12">
          <button class="btn-next tb-btn btn-red right">S'inscrire</button>
        </div>

        <div v-show="showSignupPart" class="content row col s10 offset-s1 m9 offset-m1">
          <p class="row">
            <label for="mail">Nom : </label>
            <input type="text" id="nom2" class="tb-input"/>
          </p>
          <p class="row">
            <label for="mail">Email : </label>
            <input type="email" id="mail2" class="tb-input"/>
          </p>
          <p class="row">
            <label for="pwd">Mot de passe : </label>
            <input type="password" id="pwd2" class="tb-input"/>
          </p>
        </div>
        <div v-show="showSignupPart" class="col s12 m12">
          <button class="btn-next tb-btn btn-red right">S'inscrire</button>
        </div>
      </div>
  </div>
  <!-- End Connection Popup -->
</template>

<script>
  import { EventBusModal} from "../../events/event-modals";

  export default {
      name: "modalLogin",
      methods: {
        close() {
          this.showModal = false;
          EventBusModal.$emit('change-state-login', this.showModal);
        },
        showLogin() {
          this.showSignupPart = false;
        },
        showSignup() {
          this.showSignupPart = true;
        },
      },
      data() {
          return {
            showModal: false,
            showSignupPart: false
          }
      },
  }
</script>
