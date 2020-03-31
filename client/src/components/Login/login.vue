<template>
<!-- login -->
<div>
  <title>Relint</title>
  
  <div class="mainGroup" id="login" >
            <div class="navbarLogin">
              <li class="brand">RELINT</li>
            </div>
           <div id="waiting-login">
           <waiting/>
          </div>
        <div class="parentbg">
          <div class="div1-bg">
          <div class="parentlogo">
              <div class="div1-lo">
                 <div class="box-white"></div>
              </div>
              <div class="div2-lo"><div class="dotLo1"></div></div>
              <div class="div3-lo"><div class="dotLo2"></div></div>
              <div class="div4-lo"><div class="dotLo3"></div></div>
              <div class="div5-lo"> <div class="dotLo4"></div></div>
              <div class="div6-lo"> </div>
              <div class="div7-lo"></div>
             <label class="logoName">RELINT</label>
             
          </div>
          </div> 
        <div class="div1-dot"> 
           <div  class="form-container"   > 
                  <div class="dotBG1"></div>
                  <div class="dotBG2"></div>
                  <div class="dotBG3"></div>
                  <div class="dotBG4"></div>
            </div> 
        </div>
          
        <!-- login -->
        <div class="div2-bg">
          <div class="from-login" id='from-login'>
            <div class="contain-btnUp-btnIn">
              <div class="btnF-singnIn" @click="openFormSignIn"><p>Sign In</p></div>
              <div class="btnF-singnUp" @click="openFormSignUp"><p>Sign Up</p></div>
            </div>
            <div class="parentlogin">
              <div class="div1-login">
                  <div class="logoInput">R E L I N T</div>
              </div>
               <div class="div1-login">
                  <div id="alert-error-login" > {{errorMessageLogin}}</div>
              </div>
              <div class="div2-login">
                <input id="inputEmail" class="inputt-login" v-model="email" type="email"   placeholder="Email"  name="umail"  v-on:keyup.enter="login">
              </div>
              <div class="div3-login">
                <input id="inputPassword" class="inputt-login" v-model="password" type="password"  placeholder="Password" name="psw"  v-on:keyup.enter="login" >
              </div>
              <div class="div4-login">
                <span class="psw"> Forgot <a id="btnForget" class="pswL" href="#" @click="openFormFOR" >password?</a></span>
              </div>
              <div class="div5-login">
                <button id="btnSign in" class="btnSubmit-login" v-on:click="login">Sign in</button>
              </div>
            </div>

            <!-- forget password -->
            
            <div class="form-popup" id="forget-from">
              <div class="div1-login">
                  <div id="alert-error-for" > {{errorMessageFor}}</div>
              </div>
              <div  class="form-container">
                <div class="div1-login">
                <div> Send Email</div>
                </div>
                  <input class="inputt-forget" v-model="emailpWS" type="text"   placeholder="Email"  name="umail" required v-on:keyup.enter="acceptSend">
                  <button class="btnSubmit-send-for" @click="acceptSend" >Send</button>
                  <button class="btnSubmit-cancel-for" type="button" v-on:click="closeFormFOR">Cancel</button>       
              </div>
            </div> 
          </div>
        </div>
        <!-- register -->
        <div class="div2-bg-regis">
          <div class="form-register" id='form-register' >
               <div  class="parentregis">
                 <div class=" div1-regis"> 
                    <div class="name-register" >R E G I S T E R</div>
                </div> 
                <div class=" div1-regis">
                  <div id="alert-error" > {{errorMessage}}</div>
                </div>
                <div class=" div3-regis">
                  <input id="inputUsernameRe" class="inputt-regis" v-model="usernameRE" type="text"  maxlength="15"  placeholder="Username"  name="uname" required  v-on:keyup.enter="register">  
                </div>
                <div class=" div4-regis">
                  <input id="inputEmailRe" class="inputt-regis" v-model="emailRE" type="email"   placeholder="Email"  name="mail" required>
                </div>
                <div class=" div5-regis">
                  <input id="inputPasswordRE" class="inputt-regis" v-model="passwordRE" type="password"   placeholder="Password"  name="pass" required>
                </div>
                <div class=" div6-regis">
                  <input id="inputPasswordREE" class="inputt-regis" v-model="passwordREE" type="password"   placeholder="Confirm Password"  name="re-pass" required v-on:keyup.enter="register" >
                </div>
                <div class="div7-regis">
                  <button id="btnSignUpRe" class="btnSubmit-regis" @click="register" >Sign up</button>
                  <button id="btnCancelRe" class="btnSubmit-regis-cancel" @click="closeFormSignUp">Cancel</button> 
                </div>
              </div>
          </div> 
        </div>

     
      
      </div>
       
</div>   
  
   
  
   </div>
</template>
<script>
import firebase from "firebase"
import waiting from '../wait/waiting'
export default {
  name: 'LoginPage',
  components: {
    waiting
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
    },
    openFormFOR() {
      document.getElementById("forget-from").style.display = "block";
    }, 
    //acceptSEnd
    acceptSend(e) { 
      setTimeout(function(){
            document.getElementById('alert-error-for').style.display = "none"
      }, this.timeout);
      document.getElementById('alert-error-for').style.display = "block"

      firebase.auth()
        .sendPasswordResetEmail(this.emailpWS).then(() => {
          this.errorMessageFor= 'Password reset email sent'
        }).catch(error => {
          this.errorMessageFor= error
        });
      e.preventDefault();
    },
    closeFormSignUp () {
      document.getElementById("form-register").style.display = "none";
      document.getElementById('alert-error').style.display = "none"
      this.emailRE= ''
      this.passwordRE= ''
      this.passwordREE= ''
      this.usernameRE= ''
    },
    openFormSignUp() {
      document.getElementById("form-register").style.display = "block";
    },
    openFormSignIn () {
      document.getElementById("form-register").style.display = "none";
    },
    //anth
    login(e) {
      const alertErrorLogin = document.getElementById('alert-error-login') 
      const alertWaiting = document.getElementById('waiting-login')
      if((!this.email.match(/^([\x20-\x7E])+$/i))||(!this.password.match(/^([\x20-\x7E])+$/i))){
          if (!this.email.match(/^([\x20-\x7E])+$/i)) {
              this.errorMessageLogin='Invalid email'
              this.email=''
           }
          else if (!this.password.match(/^([\x20-\x7E])+$/i)) {
              this.errorMessageLogin='Invalid password'
              this.password=''
           }
          if (alertErrorLogin){
              setTimeout(() => {
              alertErrorLogin.style.display = "none"
            },this.timeout)
            alertErrorLogin.style.display = "block"
            return 
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
          // alert(err);
        });
      e.preventDefault();
      if (alertErrorLogin){
              setTimeout(() => {
              alertErrorLogin.style.display = "none"
            },this.timeout)
            alertErrorLogin.style.display = "block"
           }
      }
      if (alertWaiting){
      alertWaiting.style.display = "block"
      }
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
            setTimeout(function(){
              document.getElementById('alert-error').style.display = "none"
            }, this.timeout);
          
          document.getElementById('alert-error').style.display = "block"
          return
      }
      setTimeout(function(){
                document.getElementById('alert-error').style.display = "none"
      }, this.timeout);
      document.getElementById('alert-error').style.display = "block"
      
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