<template>
<!-- login -->
  <div class="mainGroup" id="login" >
  
    <div class="area" >
            <ul class="circles"> <li></li> <li></li> <li></li><li></li><li></li> <li></li><li></li><li></li><li></li><li></li> </ul>
    </div >

            <img class="logo" src="@/assets/logorelint.png" alt="logo" style="width:300px">
      
    <div class="from-login">
      <div class="form-container" >
        <div class="title">
          <input class="inputt" v-model="email" type="text"   placeholder="Email"  name="umail" >
        </div>

        <div class="title">
          <input class="inputt" v-model="password" type="password"  placeholder="Password" name="psw" >
        </div>
        <button class="btnSubmit" v-on:click="login">Login</button>
        <button class="btnSubmit" @click="openFormRE" >Register</button>
        <span class="psw"  @click="openFormFOR"  > Forgot <a class="pswL" href="#"  >password?</a></span>
        </div>
      </div>
    <!-- register -->
      <div class="form-popupRE" id="regis-from">
          <div  class="form-container">
            <h3 ><b-icon icon="person-fill" font-scale="1.5" class="rounded-circle bg-danger p-1" variant="light"></b-icon> Register </h3>
            <div class="title">
              <input class="inputt" v-model="usernameRE" type="text"  maxlength="15"  placeholder="Username"  name="uname" required>
            </div>
            <div class="title">
              <input class="inputt" v-model="emailRE" type="text"   placeholder="Email"  name="mail" required>
            </div>
            <div class="title">
              <input class="inputt" v-model="passwordRE" type="text"   placeholder="Password"  name="pass" required>
            </div>
              <button class="btnSubmit" @click="register" >Login</button>
              <button class="btnSubmit" @click="closeFormRE">Cancel</button>       
          </div>
      </div>
    <!-- forget password -->
      <div class="form-popup" id="forget-from">
        <div  class="form-container">
          <h3><b-icon icon="cursor-fill" font-scale="1.5" class="rounded-circle bg-danger p-1" variant="light"></b-icon> Send Email</h3>
          <div class="title">
            <input class="inputt" v-model="emailpWS" type="text"   placeholder="Email"  name="umail" required>
          </div>
            <button class="btnSubmit canover" @click="acceptSend" >Send</button>
            <button class="btnSubmit" type="button" v-on:click="closeFormFOR">Cancel</button>       
        </div>
      </div>
    <!-- accept-->
      <div class="form-popupAC" id="accept-from">
          <div  class="form-container">
              <h1> Success !</h1>
              <p id="count">If you don't get a new password. You can press "AGAIN" </p>
              <button class="btnSubmit canhover" type="button" v-on:click="closeFormAC" >OK</button> 
              <button id="btnAgain" class="btnSubmit" :class="counting ? null:'canhover'" :disabled = "counting"  @click="countDownTimer"  >AGAIN   </button>
              <span id="time">&nbsp; {{countDown}} &nbsp;Seconds </span>
              
          </div>
      </div>
  
   </div>
</template>
<script>
import firebase from "firebase"
import axios from "axios";
// eslint-disable-next-line
const client = axios.create({
  baseURL: "http://localhost:5001/relint-kmitl/us-central1/app",
  // baseURL: "https://us-central1-relint-kmitl.cloudfunctions.net/app",
});

export default {
  name: 'LoginPage',
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.replace('AddBoard')
      }
    })
  },
  data: function () {
    return {
      email: '',
      password: '',
      username: '',
      emailpWS: '',
      emailRE: '',
      passwordRE: '',
      usernameRE: '',
    }
  },
  methods: {
    //forget
    closeFormFOR() {
      document.getElementById("forget-from").style.display = "none";
      
    },
    openFormFOR() {
      document.getElementById("forget-from").style.display = "block";
    }, 
    //acceptSEnd
    acceptSend(e) { 
      firebase.auth()
        .sendPasswordResetEmail(this.emailpWS).then(() => {
          alert('Password reset email sent')
        }).catch(error => {
          // console.log(error)
          alert(error)
        })
      e.preventDefault()
    },
    //register
    closeFormRE() {
      document.getElementById("regis-from").style.display = "none";
    },
    openFormRE() {
      document.getElementById("regis-from").style.display = "block";
    },
    //anth
    login(e) {
      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => { 
          this.$router.replace('AddBoard')
          location.reload()
          // this.$router.go()
        })
        .catch(err => {
          alert(err)
        })
      e.preventDefault()
    },
    register(e) {
      this.$http({
        method: "get",
        url: "/reg",
        headers: {
          email: this.emailRE,
          password: this.passwordRE,
          username: this.usernameRE,
        }
      }).then(res => {
        // console.log(res.data)
        alert('Registration Completed')
        this.email = this.emailRE
        this.password = this.passwordRE
        this.login(e)
      }).catch(error => {
        // console.log(error.response.data)
        alert(error.response.data.code)
      })
      e.preventDefault()
    }
  }
}

</script>

<style lang="scss">
@import '@/components/Login/loginstyle.scss';
</style>