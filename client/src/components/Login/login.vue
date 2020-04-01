<template>
<!-- login -->
<div>
  <title>Relint</title>
  <div class="background-login" id="login" >
            <div class="navbarLogin">
              <li class="brand">RELINT</li>
            </div>


       <div class="contain-BGball div-1-BG-ball"> </div>
        <div class="contain-BGball div-2-BG-ball"> </div>
        <div class="contain-BGball div-3-BG-ball"> </div>
        <div class="contain-BGball div-4-BG-ball"> </div>

      <!-- login -->
      <div class="contain-form-login">
          <div class="from-login" id='form-login'>
            <div class="contain-btnUp-btnIn">
              <div id="btn-in" class="btnF-singnIn" @click="openFormSignIn"><p>Sign In</p></div>
              <div id="btn-up" class="btnF-singnUp darker-btn" @click="openFormSignUp"><p>Sign Up</p></div>
            </div>
                  <div class="logoInput">R E L I N T</div><br>
                  <div id="alert-error-login" > {{errorMessageLogin}}</div><br>
                <input id="inputEmail" class="inputt-login" v-model="email" type="email"   placeholder="Email"  name="umail"  v-on:keyup.enter="login">
                <br>
                <input id="inputPassword" class="inputt-login" v-model="password" type="password"  placeholder="Password" name="psw"  v-on:keyup.enter="login" >
              
                <span class="psw"> Forgot <a id="btnForget" class="pswL" href="#" @click="openFormFOR" >password?</a></span>
                <br>
                <button id="btnSign in" class="btnSubmit-login" v-on:click="login">Sign in</button>
          </div>
      </div>
    
        <!-- register -->
        <div class="contain-form-regis">
          <div class="form-register" id='form-register' >
                <div class="name-register" >R E G I S T E R</div><br>
                <div id="alert-error" > {{errorMessage}}</div>
                  <input id="inputUsernameRe" class="inputt-regis" v-model="usernameRE" type="text"  maxlength="15"  placeholder="Username"  name="uname" required  v-on:keyup.enter="register">  
                <br>
                  <input id="inputEmailRe" class="inputt-regis" v-model="emailRE" type="email"   placeholder="Email"  name="mail" required>
                <br>
                  <input id="inputPasswordRE" class="inputt-regis" v-model="passwordRE" type="password"   placeholder="Password"  name="pass" required>
                <br>
                  <input id="inputPasswordREE" class="inputt-regis" v-model="passwordREE" type="password"   placeholder="Confirm Password"  name="re-pass" required v-on:keyup.enter="register" >
                <br>
                  <button id="btnSignUpRe" class="btnSubmit-regis" @click="register" >Sign up</button>
                  <button id="btnCancelRe" class="btnSubmit-regis-cancel" @click="openFormSignIn">Cancel</button> 
          </div> 
        </div>
    </div>    
     

        <div id="waiting-login">
            <div class="lds-wrapper"></div>
            <div class="lds-dual-ring"></div>
        </div>

        <div class="contain-logoball div-0-cylinder"> </div>
        <div class="contain-logoball div-1-ball"> </div>
        <div class="contain-logoball div-2-ball"> </div>
        <div class="contain-logoball div-3-ball"> </div>
        <div class="contain-logoball div-4-ball"> </div>
        <div class="contain-logoball logoName-ball">RELINT</div>

         <!-- forget password -->
        <div class="pwd-wrapper"  id="forget-from-wrapper">
        </div>
        <div class="form-popup" id="forget-from">
            <div class="name-pwd-rst"> R E S E T </div>
            <div id="alert-error-for" class="alert-error-pwd"> {{errorMessageFor}}</div>
            <input class="inputt-forget" v-model="emailpWS" type="text"   placeholder="Email"  name="umail" required v-on:keyup.enter="acceptSend">
            <button class="btnSubmit-send-for" @click="acceptSend" >Send</button>
            <button class="btnSubmit-cancel-for" type="button" v-on:click="closeFormFOR">Cancel</button> 
        </div> 
        
      
</div>
</template>
<script>
import firebase from "firebase"
export default {
  name: 'LoginPage',
  components: {
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('setRecord', {username: user.displayName, uid: user.uid});
        this.$router.replace('addBoard')
      }
    });
  },
  mounted () {
    document.getElementById("alert-error-for").style.display = "none"
    document.getElementById('alert-error-login').style.display = "none"
    document.getElementById('alert-error').style.display = "none"
    document.getElementById('form-register').style.display = "none"
    document.getElementById('waiting-login').style.display = "none"
  },
  data: function () {
    return {
      stateCheck:false,
      timeout:3000,
      errorMessageFor:'',
      errorMessageLogin:'',
      errorMessage:'',
      email: '',
      password: '',
      emailpWS: '',
      emailRE: '',
      passwordRE: '',
      passwordREE: '',
      usernameRE: '',
      regis: '',
    }
  },
  methods: {
    //forget
    closeFormFOR() {
      document.getElementById("forget-from").style.display = "none";
      document.getElementById("forget-from-wrapper").style.display = "none";
      document.getElementById('alert-error-for').classList.remove('not-red')
      document.getElementById('alert-error-for').style.display = "none"
      this.emailpWS = ''
    },
    openFormFOR() {
      document.getElementById("forget-from").style.display = "block";
      document.getElementById("forget-from-wrapper").style.display = "block";
    }, 
    //acceptSEnd
    acceptSend(e) {
      const alertWaiting = document.getElementById('waiting-login')
      firebase.auth()
        .sendPasswordResetEmail(this.emailpWS).then(() => {
          if (alertWaiting){
            alertWaiting.style.display = "block"
          }
          this.errorMessageFor= 'Password reset email sent'
          new Promise(resolve => setTimeout(resolve,1000)).then(()=>{
            if (alertWaiting){
              alertWaiting.style.display = "none"
            }
            document.getElementById('alert-error-for').classList.add('not-red')
            document.getElementById('alert-error-for').style.display = "block"
          })
        }).catch(error => {
          this.errorMessageFor= error
          document.getElementById('alert-error-for').classList.remove('not-red')
          document.getElementById('alert-error-for').style.display = "block"
        });
      e.preventDefault();
    },
    openFormSignUp() {
      document.getElementById("form-register").style.display = "block";
      document.getElementById("btn-in").classList.add('darker-btn')
      document.getElementById("btn-up").classList.remove('darker-btn')
      document.getElementById('alert-error-login').style.display = "none"
      this.emailRE= ''
      this.passwordRE= ''
      this.passwordREE= ''
      this.usernameRE= ''

    },
    openFormSignIn () {
      document.getElementById("form-register").style.display = "none";
      document.getElementById("btn-in").classList.remove('darker-btn')
      document.getElementById("btn-up").classList.add('darker-btn')
      document.getElementById('alert-error').style.display = "none"
      this.email= ''
      this.password= ''
    },
    //anth
    login(e) {
      e.preventDefault();
      const alertErrorLogin = document.getElementById('alert-error-login') 
      const alertWaiting = document.getElementById('waiting-login')
      if (alertWaiting){
        alertWaiting.style.display = "block"
      }
      if((!this.email.match(/^([\x20-\x7E])+$/i))||(!this.password.match(/^([\x20-\x7E])+$/i))){
          if (!this.email.match(/^([\x20-\x7E])+$/i)) {
              this.errorMessageLogin='Invalid email'
              this.email=''
           }
          else if (!this.password.match(/^([\x20-\x7E])+$/i)) {
              this.errorMessageLogin='Invalid password'
              this.password=''
           }
           if(alertErrorLogin){
             alertErrorLogin.style.display= "block"
           }
          if (alertWaiting){
          alertWaiting.style.display = "none"
          }
      }
      else {
        firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
           this.regis = false;
          // this.errorMessageLogin='Authentication Completed'
          // alert('Authentication Completed');
        })
        .catch(err => {
          this.errorMessageLogin=err
          if(alertErrorLogin){
            alertErrorLogin.style.display= "block"
          }
          if (alertWaiting){
          alertWaiting.style.display = "none"
          }
          // alert(err);
        });
      }
    },
    register(e) {  
      const alertWaiting = document.getElementById('waiting-login')
      if((!this.emailRE.match(/^([\x20-\x7E])+$/i))||(!this.passwordRE.match(/^([\x20-\x7E])+$/i))||
        (!this.passwordREE.match(/^([\x20-\x7E])+$/i))||(!this.usernameRE.match(/^([\x20-\x7E])+$/i)))
        { 
            if (!this.usernameRE.match(/^([\x20-\x7E])+$/i)) {
              this.errorMessage='Invalid username'
              this.usernameRE=''
            }
            else if (!this.emailRE.match(/^([\x20-\x7E])+$/i)) {
              this.errorMessage='Invalid email'
              this.emailRE=''
            }
            else if (!this.passwordRE.match(/^([\x20-\x7E])+$/i)||!this.passwordREE.match(/^([\x20-\x7E])+$/i)) {
              this.errorMessage='Invalid password'
              this.passwordRE=''
              this.passwordREE=''
            }
          document.getElementById('alert-error').style.display = "block"
          return
      }
      if (alertWaiting){
        alertWaiting.style.display = "block"
      }
      if(this.passwordRE === this.passwordREE){
        this.$http({
          method: "get",
          url: "/reg",
          headers: {
            email: this.emailRE,
            password: this.passwordRE,
            username: this.usernameRE.charAt(0).toUpperCase()+this.usernameRE.substring(1).toLowerCase(),
          }
        }).then(() => {
          // alert('Registration Completed')
          this.email = this.emailRE;
          this.password = this.passwordRE;
          this.login(e);
        }).catch(error => {
            this.errorMessage=error.response.data.message
            document.getElementById('alert-error').style.display = "block"
            if (alertWaiting){
              alertWaiting.style.display = "none"
            }
        });
      } else {
        this.errorMessage='Password does not matched';
        document.getElementById('alert-error').style.display = "block"
        this.passwordRE = '';
        this.passwordREE = '';
        if (alertWaiting){
          alertWaiting.style.display = "none"
        }
      }
      e.preventDefault();
    }
  }
}

</script>

<style lang="scss">
@import '@/components/Login/loginstyle.scss';
</style>