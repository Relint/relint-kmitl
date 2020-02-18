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
        <button class="btnSubmit" @click="addBoard">Login</button>
        <button class="btnSubmit" @click="openFormRE" >Register</button>
        <span class="psw"  @click="openFormFOR"  > Forgot <a class="pswL" href="#"  >password?</a></span>
        </div>
      </div>
    <!-- register -->
      <div class="form-popupRE" id="regis-from">
          <div  class="form-container">
            <h3 ><b-icon icon="person-fill" font-scale="1.5" class="rounded-circle bg-danger p-1" variant="light"></b-icon> Register </h3>
            <div class="title">
              <input class="inputt" v-model="usernameRE" type="text"   placeholder="Username"  name="uname" required>
            </div>
            <div class="title">
              <input class="inputt" v-model="emailRE" type="text"   placeholder="Email"  name="mail" required>
            </div>
            <div class="title">
              <input class="inputt" v-model="passwordRE" type="text"   placeholder="Password"  name="pass" required>
            </div>
              <button class="btnSubmit" @click="addBoard" >Login</button>
              <button class="btnSubmit" @click="closeFormRE">Cancle</button>       
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
            <button class="btnSubmit" type="button" v-on:click="closeFormFOR">Cancle</button>       
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
  data: function () {
    return {
      email: '',
      password: '',
      username: '',
      emailpWS: '',
      emailRE: '',
      passwordRE: '',
      usernameRE: '',
      countDown : 10,
      counting:false,
      interval: null
    }
  },
  watch:{
    countDown:function(newc,oldc){
      if(this.countDown === 0){
        this.countDown = 10
         clearInterval(this.interval)
        this.counting = false
      }
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
    countDownTimer() {
                if(this.countDown === 10){
                  this.counting = true
                    this.interval  = setInterval(()=>{
                      this.countDown -= 1
                    },1000)
                }
    },     
    //acceptSEnd
    acceptSend() { 
      document.getElementById("accept-from").style.display = "block";
    },
    closeFormAC () {
      document.getElementById("accept-from").style.display = "none";
    },
    //register
    closeFormRE() {
      document.getElementById("regis-from").style.display = "none";
    },
    openFormRE() {
      document.getElementById("regis-from").style.display = "block";
    },
    //anth
    addBoard() {
      firebase.auth()
        .signInWithEmailAndPassword(this.email,this.password)
        .then(() => { 
            alert('Logged in')
            this.$router.replace('AddBoard')
        })
        .catch(err => {
          alert(err)
        })
    }
  },
}
</script>

<style lang="scss">
@import '@/components/Login/loginstyle.scss';
</style>