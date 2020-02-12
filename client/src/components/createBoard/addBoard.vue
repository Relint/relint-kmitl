<template>
<div>
    <h5><span v-html=authorization></span></h5>
    <button class="btnSignout" v-on:click="logout" type="submit" >Signout</button>
</div>
</template>
<script>
/* eslint-disable */
import firebase from "firebase"
import axios from "axios"
const client = axios.create({
  baseURL: "http://localhost:5001/relint-kmitl/us-central1/app",
  // baseURL: "https://us-central1-relint-kmitl.cloudfunctions.net/app",
});
export default {
  name: 'AddBoard',
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.replace('/')
      } else {
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(idToken => {
              client({
                method: "get",
                url: "/auth",
                headers: {
                  AuthToken: idToken
                }
              })
                .then(res => {
                  this.authorization = res.data.message;
                })
                .catch(error => {
                  this.authorization = error.response.data;
                });
            })
            .catch(() => {
              this.authorization = "Error getting auth token";
            });
      }
    })
  },
  data: function (){
    return {
      authorization: '',
    }
  },
  methods: {
    logout : function () {
        firebase.auth().signOut()
    },
  }
}
</script>
