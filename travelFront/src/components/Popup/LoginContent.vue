<template>
  <div class="content-wrapper">
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
        <button class="btn-next tb-btn btn-red right">Connexion</button>
        <button @click="close()" class="btn-close tb-btn btn-red right">Fermer</button>
      </div>
  </div>
</template>

<script>
  import { EventBusModal} from "../../events/event-modals";

  export default {
    name: "modalLoginContent",
    data() {
      return {
        showModal: false,
      }
    },
    methods: {
      close() {
        this.showModal = false;
        EventBusModal.$emit('change-state-login', this.showModal);
      },
    }
  }
</script>
