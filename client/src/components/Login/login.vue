<template>
<!-- login -->
<div>
  <title>Relint</title>
  <div class="background-login" id="login" >
            <div class="navbarLogin">
              <li class="brand noselect" @click="openInNewTab('/')">RELINT</li>
            </div>


       <div class="contain-BGball div-1-BG-ball"> </div>
        <div class="contain-BGball div-2-BG-ball"> </div>
        <div class="contain-BGball div-3-BG-ball"> </div>
        <div class="contain-BGball div-4-BG-ball"> </div>
      <div style="position:absolute;width:100%;height:100%">
        <div class="contain-logoball div-0-cylinder"> </div>
        <div class="contain-logoball div-1-ball"> </div>
        <div class="contain-logoball div-2-ball"> </div>
        <div class="contain-logoball div-3-ball"> </div>
        <div class="contain-logoball div-4-ball"> </div>
        <div class="contain-logoball logoName-ball noselect">RELINT</div>
      </div>
      <!-- login -->
      <div class="contain-form-login">
          <div class="from-login" id='form-login'>
            <div class="contain-btnUp-btnIn">
              <div id="btn-in" class="btnF-singnIn noselect pointer" @click="openFormSignIn"><p>Sign In</p></div>
              <div id="btn-up" class="btnF-singnUp darker-btn noselect pointer" @click="openFormSignUp"><p>Sign Up</p></div>
            </div>
                  <div class="logoInput noselect">R E L I N T</div><br class="noselect">
                  <div id="alert-error-login" > {{errorMessageLogin}}</div><br class="noselect">
                <input id="inputEmail" class="inputt-login outline-n" v-model="email" type="email"   placeholder="Email"  name="umail"  v-on:keyup.enter="login">
                <br class="noselect">
                <input id="inputPassword" class="inputt-login outline-n" v-model="password" type="password"  placeholder="Password" name="psw"  v-on:keyup.enter="login" >
              
                <span class="psw noselect"><a id="btnForget" class="pswL" href="#" @click="openFormFOR" >Forgot password?</a></span>
                <br class="noselect">
                <button id="btnSign in" class="btnSubmit-login noselect pointer" v-on:click="login">Sign in</button>
          </div>
      </div>
    
        <!-- register -->
        <div class="contain-form-regis">
          <div class="form-register" id='form-register' >
                <div class="name-register noselect" >R E G I S T E R</div><br class="noselect">
                <div id="alert-error" > {{errorMessage}}</div>
                  <input id="inputUsernameRe" class="inputt-regis outline-n" v-model="usernameRE" type="text"  maxlength="12"  placeholder="Username"  name="uname" required  v-on:keyup.enter="register">  
                <br class="noselect">
                  <input id="inputEmailRe" class="inputt-regis outline-n" v-model="emailRE" type="email"   placeholder="Email"  name="mail" required>
                <br class="noselect">
                  <input id="inputPasswordRE" class="inputt-regis outline-n" v-model="passwordRE" type="password"   placeholder="Password"  name="pass" required>
                <br class="noselect">
                  <input id="inputPasswordREE" class="inputt-regis outline-n" v-model="passwordREE" type="password"   placeholder="Confirm Password"  name="re-pass" required v-on:keyup.enter="register" >
                <br class="noselect">
                  <button id="btnSignUpRe" class="btnSubmit-regis noselect pointer" @click="register" >Sign up</button>
                  <button id="btnCancelRe" class="btnSubmit-regis-cancel noselect pointer" @click="openFormSignIn">Cancel</button> 
          </div> 
        </div>
    </div>    

        <div id="waiting-login">
            <div class="lds-wrapper"></div>
            <div class="lds-dual-ring"></div>
        </div>

         <!-- forget password -->
        <div class="pwd-wrapper"  id="forget-from-wrapper">
        </div>
        <div class="form-popup" id="forget-from">
            <div class="name-pwd-rst noselect"> R E S E T </div>
            <div id="alert-error-for" class="alert-error-pwd"> {{errorMessageFor}}</div>
            <input class="inputt-forget outline-n" v-model="emailpWS" type="text"   placeholder="Email"  name="umail" required v-on:keyup.enter="acceptSend">
            <button class="btnSubmit-send-for noselect pointer" @click="acceptSend" >Send</button>
            <button class="btnSubmit-cancel-for noselect pointer" type="button" v-on:click="closeFormFOR">Cancel</button> 
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
        this.$store.commit('setRecord', {user: user, uid: user.uid});
        this.$router.replace('addBoard').catch(err=>{
          // eslint-disable-next-line
          console.log(err.message)
        })
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
      firebase.auth().sendPasswordResetEmail(this.emailpWS).then(() => {
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
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(err => {
        this.errorMessageLogin=err.message
        if(alertErrorLogin){
          alertErrorLogin.style.display= "block"
        }
        if (alertWaiting){
          alertWaiting.style.display = "none"
        }
      });
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
        firebase.auth().createUserWithEmailAndPassword(this.emailRE,this.passwordRE).then(userCred => {
          // alert('Registration Completed')
          this.$rtdb.ref('/status/'+userCred.user.uid).update({
            email: userCred.user.email,
            displayName: this.usernameRE.charAt(0).toUpperCase()+this.usernameRE.substring(1).toLowerCase(),
          })
        }).catch(error => {
          this.errorMessage= error.message
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
    },
    openInNewTab(url){
      const win = window.open(url,'_blank')
      win.focus()
    },
  }
}

</script>

<style lang="scss">
@import '@/components/Login/loginstyle.scss';
</style>