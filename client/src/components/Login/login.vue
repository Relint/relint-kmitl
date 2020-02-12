<template>
<!-- login -->
  <div class="mainGroup" id="login" >
    <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    <img class="logo" src="@/assets/logorelintv3.png" alt="Mountain" style="width:300px">
    <div class="from-login">
      <form @submit="loginWithEmail">
        <div class="title">
          <input class="input" v-model="email" type="email"   placeholder="Email"  name="umail" required>
        </div>

        <div class="title">
          <input class="input" v-model="password" type="password"  placeholder="Password" name="psw" required>
        </div>
        <button class="btnSubmit" type="submit" value="submit" v-on:click="login">Login</button>
        <button class="btnSubmit" type="submit" value="submit" v-on:click="openFormRE" >Register</button>
        <span class="psw"  v-on:click="openFormFOR" style="padding-left:2em" > Forgot <a href="#">password?</a></span>
        </form>
      </div>
    <!-- register -->
      <div class="form-popupRE" id="regis-from">
          <form  class="form-container">
            <h1>Register</h1>
            <div class="title">
              <input class="input" v-model="usernameRE" type="text"   placeholder="Username"  name="uname" required>
            </div>
            <div class="title">
              <input class="input" v-model="emailRE" type="email"   placeholder="Email"  name="mail" required>
            </div>
            <div class="title">
              <input class="input" v-model="passwordRE" type="password"   placeholder="Password"  name="pass" required>
            </div>
              <button class="btnSubmit" type="submit" value="submit" v-on:click="register" >Register</button>
              <!-- start-->
              
            <button class="btnSubmit"  type="button" v-on:click="closeFormRE">Cancle</button>       
          </form>
      </div>
    <!-- forget password -->
      <div class="form-popup" id="forget-from">
        <form  class="form-container">
          <h1>Send Email</h1>
          <div class="title">
            <input class="input" v-model="emailpWS" type="email"   placeholder="Email"  name="umail" required>
          </div>
            <button class="btnSubmit" type="submit" value="submit" v-on:click="acceptSend" >Send</button>
            <button class="btnSubmit" type="button" v-on:click="closeFormFOR">Cancle</button>       
        </form>
      </div>
  </div>
</template>
<script>
import firebase from "firebase"

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
  },
  created(){
    this.countDownTimer()
  }
}
</script>

<style lang="scss">
@import '@/components/Login/loginstyle.scss';
</style>