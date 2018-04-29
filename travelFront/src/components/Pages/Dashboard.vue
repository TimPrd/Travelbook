<template>
<div class="center">
    <ul>
      <li>
        <router-link v-if="!loggedIn" to="/login">Log in</router-link>
      </li>
    </ul>
    <button v-if="loggedIn" class="btn btn-primary" @click="getAccountDetail()">Detail user</button>
    <button v-if="loggedIn" class="btn btn-danger"  @click="logOut()">Log out</button>
    <div v-if="loggedIn" >
      <h1>Connecté ! </h1>
      
      <ul v-show="userShow">
          <li>username : {{user.username}}</li>
          <li>email : {{user.email}}</li>
          <li>lastName : {{user.lastName}}</li>
      </ul>

    </div>
    <div v-else>
      <h1>Pas Connecté :'( ! </h1>
    </div>

</div>
</template>

<script>
import auth from "./../../auth";
import { HTTP } from "./../../http/http-base";

export default {
  data() {
    return {
      userShow: false,
      user: "",
      loggedIn: auth.loggedIn()
    };
  },
  methods: {
    logOut() {
      auth.logout();
    },
    getAccountDetail() {
      let that = this;
      HTTP.get("account", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('id_token'),
          authorization: localStorage.getItem('id_token'),
          'x-access-token': localStorage.getItem('id_token'),
          Accept: "application/json"
        }
      }).then(response => {
        that.userShow = true;
        that.user = response.data;
        that.$store.commit("instanceUser", response.data);
        //that.$router.replace("/"); //modal = false
        console.log(this.user);
      });
    }
  },
  created() {
    console.log("created");
    this.getAccountDetail();
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn;
    };
  }
};
</script>

<style>

</style>