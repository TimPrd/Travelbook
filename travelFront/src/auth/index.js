import {HTTP} from './../http/http-base';
import auth from '../auth'
    
export default {

  user: {
    authenticated: false
  },

  login(context, creds, redirect) {
    HTTP.post('login', {
        email:"hello@eu.com",
        password:"azerty"
    }, { 
        headers: auth.getAuthHeader()
      }).then(response => {
        this.user.authenticated = true;
        localStorage.setItem('id_token', response.data.token)

        alert( response.data.token)
      })
      .catch(function (error) {
        alert('Boloss')
      });

  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if(redirect) {
      }

    }).error((err) => {
      context.error = err
    })
  },

  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },


  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}