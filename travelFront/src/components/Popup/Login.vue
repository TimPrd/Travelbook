<template>
  <!-- Connection Popup -->
  <transition name="modal-fade">
    <div class="popup-bg row" v-on:click="close()">
      <div class="popup connection col s10 offset-s2 pull-s1 m10 offset-m2 pull-m1">
        <div class="header">
          <div class="wrapper-logo">
            <img src="../../assets/img/logo.png" class="logo" alt="TravelBook"/>
          </div>
          <div class="wrapper-btn">
            <button class="selected tb-btn btn-red col s12 m4">Connexion</button>
            <button class="tb-btn btn-red col s12 m4">Inscription</button>
          </div>
        </div>
        <div class="content row col s10 offset-s1 m9 offset-m1">
          <p class="row">
            <label for="mail">Email : </label>
            <input type="email" id="mail" class="tb-input"/>
          </p>
          <p class="row">
            <label for="pwd">Mot de passe : </label>
            <input type="password" id="pwd" class="tb-input"/>
          </p>
        </div>
        <div class="col s12 m12">
          <button class="btn-next tb-btn btn-red right">S'inscrire</button>
        </div>
      </div>
    </div>
  </transition>
  <!-- End Connection Popup -->
</template>

<script>
  export default {
      name: "modalLogin",
      data() {
          return {
            showModal: false,
            showSignin: false
          }
      },
      methods: {
          close() {
              showModal=false;
          }
      }
  }
</script>
