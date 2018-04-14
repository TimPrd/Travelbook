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
        <iframe id="ytplayer" type="text/html" width="640" height="360"
        src="http://www.youtube.com/embed/kxopViU98Xo?autoplay=1&origin=http://example.com"
        frameborder="0"/>
      
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
import auth from './../../auth'
import {HTTP} from './../../http/http-base';

export default {
  data () {
    return {
      userShow: false,
      user: "",
      loggedIn: auth.loggedIn()
    }
  },
  methods: {
      logOut() {
        auth.logout()
      },
      getAccountDetail(){
      HTTP.get('account').then(response => {
        this.userShow = true;
        this.user = response.data;
        console.log(this.user)
      });
      }
  },
  created () {
    console.log("created")
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  },

 

}
</script>