<template>
<!-- login -->
<div>
  <title>Relint</title>
  <div class="mainGroup" id="login" >
            <div class="navbarLogin">
              <li class="brand">RELINT</li>
            </div>
            <div  class="contain-color-logo"   > 
                  <div class="box-white"></div>
                  <div class="dotLo1"></div>
                  <div class="dotLo2"></div>
                  <div class="dotLo3"></div>
                  <div class="dotLo4"></div>
                  <label class="logoName">RELINT</label>
            </div>
            <div  class="form-container"   > 
                  <div class="dotBG1"></div>
                  <div class="dotBG2"></div>
                  <div class="dotBG3"></div>
                  <div class="dotBG4"></div>
            </div>
            
      </div>   
    
   
      <!-- <div class="btnsignIn" id="signIn" >sign in</div> -->
      <div class="from-login">
        
      <div class="form-container" >
        <div class="title">
          <input id="inputEmail" class="inputt" v-model="email" type="email"   placeholder="Email"  name="umail"  v-on:keyup.enter="login">
        </div>

        <div class="title">
          <input id="inputPassword" class="inputt" v-model="password" type="password"  placeholder="Password" name="psw"  v-on:keyup.enter="login" >
        </div>
        <button id="btnSign in" class="btnSubmit" v-on:click="login">Sign in</button>
        <button id="btnRegister" class="btnSubmit" @click="openFormRE" >Register</button>
        <span class="psw"> Forgot <a id="btnForget" class="pswL" href="#" @click="openFormFOR" >password?</a></span>
        </div>
      </div>
    <!-- register -->
      
     <div class="form-popupRE" id="regis-from">
          <div  class="form-container">
            <h3 ><b-icon icon="person-fill" font-scale="1.5" class="rounded-circle bg-danger p-1" variant="light"></b-icon> Register </h3>
            <div id="alert-error" > {{errorMessage}}</div>
            <div class="title">
              <input id="inputUsernameRe" class="inputt" v-model="usernameRE" type="text"  maxlength="15"  placeholder="Username"  name="uname" required  v-on:keyup.enter="register">  
            </div>
            <div class="title">
              <input id="inputEmailRe" class="inputt" v-model="emailRE" type="email"   placeholder="Email"  name="mail" required>
            </div>
            <div class="title">
              <input id="inputPasswordRE" class="inputt" v-model="passwordRE" type="password"   placeholder="Password"  name="pass" required>
            </div>
            <div class="title">
              <input id="inputPasswordREE" class="inputt" v-model="passwordREE" type="password"   placeholder="Confirm Password"  name="re-pass" required v-on:keyup.enter="register" >
            </div>
              <button id="btnSignUpRe" class="btnSubmit" @click="register" >Sign up</button>
              <button id="btnCancelRe" class="btnSubmit" @click="closeFormRE">Cancel</button>       
          </div>
      </div> 
    <!-- forget password -->
       <div class="form-popup" id="forget-from">
        <div  class="form-container">
          <h3><b-icon icon="cursor-fill" font-scale="1.5" class="rounded-circle bg-danger p-1" variant="light"></b-icon> Send Email</h3>
          <div class="title">
            <input class="inputt" v-model="emailpWS" type="text"   placeholder="Email"  name="umail" required v-on:keyup.enter="acceptSend">
          </div>
            <button class="btnSubmit canover" @click="acceptSend" >Send</button>
            <button class="btnSubmit" type="button" v-on:click="closeFormFOR">Cancel</button>       
        </div>
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
        this.$store.commit('setRecord', {username: user.displayName, uid: user.uid});
        this.$router.replace('addBoard')
      }
    });
  },
  mounted () {
    document.getElementById('alert-error').style.display = "none"
  },
  data: function () {
    return {
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
          alert(error)
        });
      e.preventDefault();
    },
    
    closeFormRE() {
      document.getElementById("regis-from").style.display = "none";
      document.getElementById('alert-error').style.display = "none"
      this.emailRE= ''
      this.passwordRE= ''
      this.passwordREE= ''
      this.usernameRE= ''
      
    },
    openFormRE() {
      document.getElementById("regis-from").style.display = "block";
    },
    //anth
    login(e) {
      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.regis = false;
          // alert('Authentication Completed');
        })
        .catch(err => {
          alert(err);
        });
      e.preventDefault();
    },
    register(e) {  
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
        });
      } else {
        this.errorMessage='Password does not matched';
        document.getElementById('alert-error').style.display = "block"
        this.passwordRE = '';
        this.passwordREE = '';
      }
      e.preventDefault();
    }
  }
}

</script>

<style lang="scss">
@import '@/components/Login/loginstyle.scss';
</style>