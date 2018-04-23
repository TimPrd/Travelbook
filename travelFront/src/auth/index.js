import { HTTP } from "./../http/http-base";
import auth from "../auth";

export default {
  user: {
    authenticated: false
  },

  login(context, creds, redirect) {
    HTTP.post(
      "/login",
      {
        email: creds.username,
        password: creds.password
      },
      {
        //headers: auth.getAuthHeader()
      }
    )
      .then(response => {
        console.log(response.data);
        this.user.authenticated = true;
        localStorage.setItem("id_token", response.data.token);
        if (redirect) {
          context.$router.replace("/dashboard");
          // should be : context.$router.replace("/");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  signup(context, creds, redirect) {
    HTTP.post(
      "/register",
      {
        email:creds.email,
        username: creds.username,
        firstName: creds.firstName,
        lastName: creds.lastName,
        password: creds.password,
        passwordConf: creds.passwordConf
      },
      {
        //headers: auth.getAuthHeader()
      }
    )
      .then(response => {
        console.log(response.data);
        this.user.authenticated = true;
        localStorage.setItem("id_token", response.data.token);
        if (redirect) {
          context.$router.replace("/");
          // should be : context.$router.replace("/");
        }
        console.log("ok")
      })
      .catch(function(error) {
        return error;
        console.log(error);
      });
  },

  signupErasable(context, creds, redirect) {
    context.$http
      .post(SIGNUP_URL, creds, data => {
        localStorage.setItem("id_token", data.id_token);

        this.user.authenticated = true;

        if (redirect) {
        }
      })
      .error(err => {
        context.error = err;
      });
  },

  logout() {
    localStorage.removeItem("id_token");
    this.user.authenticated = false;
  },
  onChange() {},

  checkAuth() {
    var jwt = localStorage.getItem("id_token");
    if (jwt) {
      this.user.authenticated = true;
    } else {
      this.user.authenticated = false;
    }
  },

  loggedIn() {
    console.log(localStorage.getItem("id_token"));
    return localStorage.getItem("id_token");
  },

  getAuthHeader() {
    return {
      Authorization: "Bearer " + localStorage.getItem("id_token")
    };
  }
};
