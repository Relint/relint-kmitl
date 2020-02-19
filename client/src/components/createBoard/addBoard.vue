<template>
  <b-navbar toggleable="lg" type="light" >
      <b-navbar-brand >Relint</b-navbar-brand>
      
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
         <!-- Left aligned nav items -->
          <b-navbar-nav>
            <b-nav-item ><b-icon icon="house" font-scale="3"></b-icon></b-nav-item>
            <b-nav-item  ><b-icon icon="kanban" font-scale="3"></b-icon></b-nav-item>
          </b-navbar-nav>
        <!-- Right aligned nav items -->
        <!--Search-->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="l" class="mr-sm-2"  placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" ><b-icon icon="search" font-scale="1.8"  ></b-icon></b-button>
          </b-nav-form>
          <!--User-->
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em><b-icon icon="person" font-scale="3"></b-icon></em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <h5><span v-html=authorization></span></h5>
            <b-dropdown-item  v-on:click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>
<script>
/* eslint-disable */
import firebase from "firebase"

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
              this.$http({
                method: "get",
                url: "/auth",
                headers: {
                  AuthToken: idToken
                }
              })
                .then(res => {
                  this.authorization = res.data.message
                })
                .catch(error => {
                  this.authorization = error.response.data
                });
            })
            .catch(() => {
              this.authorization = "Error getting auth token"
            });
      }
    })
  },
  data: function (){
    return {
      authorization: ''
     
    }
  },
  methods: {
    logout : function () {
        firebase.auth().signOut()
    },
    
  }
}
</script>
<style scoped lang="scss">
@import '@/components/createBoard/navbarstyle.scss';

</style>