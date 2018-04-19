<template>
  <div class="content-wrapper">
      <div class="content row col s10 offset-s1 m9 offset-m1">
        <p class="row">
          <label for="mail">Email : </label>
          <input 
            type="email"
            id="mail"
            class="tb-input"
            placeholder="Enter your username"
            v-model="credentials.username"
          />
        </p>
        <p class="row">
          <label for="pwd">Mot de passe : </label>
          <input 
            type="password" 
            id="pwd" 
            class="tb-input" 
            placeholder="Enter your password"
            v-model="credentials.password"
          />
        </p>
      </div>
      <div class="col s12 m12">
        <button @keyup.enter="submit()" @click="submit()" class="btn-next tb-btn btn-red right">Connexion</button>
        <button @click="close()" class="btn-close tb-btn btn-red right">Fermer</button>
      </div>
  </div>
</template>

<script>
import { EventBusModal } from "../../events/event-modals";
import auth from "./../../auth/index";
import { HTTP } from "./../../http/http-base"
export default {
  name: "modalLoginContent",
  data() {
    return {
      showModal: false,
      credentials: {
        username: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    close() {
      this.showModal = false;
      EventBusModal.$emit("change-state-login", this.showModal);
    },

    submit() {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      };
      auth.login(this, credentials, "secretquote");
    }
  }
};
</script>
