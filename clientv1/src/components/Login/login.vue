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
    <img class="logo" src="@/assets/logorelint.png" alt="Mountain" style="width:300px">
    <div class="from-login">
      <form @submit="loginWithEmail">
        <div class="title">
          <input class="input" v-model="email" type="text"   placeholder="Email"  name="umail" required>
        </div>

        <div class="title">
          <input class="input" v-model="password" type="password"  placeholder="Password" name="psw" required>
        </div>
        <button class="btnSubmit" type="submit" value="submit" v-on:click="addBoard">Login</button>
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
              <input class="input" v-model="emailRE" type="text"   placeholder="Email"  name="mail" required>
            </div>
            <div class="title">
              <input class="input" v-model="passwordRE" type="text"   placeholder="Password"  name="pass" required>
            </div>
              <button class="btnSubmit" type="submit" value="submit" v-on:click="addBoard" >Login</button>
              <!-- start-->
              
            <button class="btnSubmit"  type="button" v-on:click="closeFormRE">Cancle</button>       
          </form>
      </div>
    <!-- forget password -->
      <div class="form-popup" id="forget-from">
        <form  class="form-container">
          <h1>Send Email</h1>
          <div class="title">
            <input class="input" v-model="emailpWS" type="text"   placeholder="Email"  name="umail" required>
          </div>
            <button class="btnSubmit" type="submit" value="submit" v-on:click="acceptSend" >Send</button>
            <button class="btnSubmit" type="button" v-on:click="closeFormFOR">Cancle</button>       
        </form>
      </div>
    <!-- accept-->
      <div class="form-popupAC" id="accept-from">
          <form  class="form-container">
              <h1> Success !</h1>
              <p id="count">If you don't get a new password. You can press "AGAIN" </p>
              <button class="btnSubmit" type="button" v-on:click="closeFormAC" >OK</button> 
              <button class="btnSubmit" id="b1" type="button" v-on:click="countDownTimer" required >AGAIN   </button>
              <span id="timer"><span id="time">&nbsp; 10 &nbsp;Seconds </span></span>
              
          </form>
      </div>
  </div>
</template>
<script>

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
      count:10,
      dd:0,
      countDown : 10
    }
  },
  methods: {
    //forget
    closeFormFOR  : function () {
      document.getElementById("forget-from").style.display = "none";
      
    },
    openFormFOR : function () {
      document.getElementById("forget-from").style.display = "block";
    },
   /* countdown :function () {
      this.dd=this.dd+1
       document.getElementById("time").innerHTML = " "+"10"+" "+"Secounds"
       if (this.dd>1)
      setInterval(() => {
        this.count=this.count-1
        document.getElementById("time").innerHTML = " "+this.count+" "+"Seconds"
        document.getElementById("b1").disabled = true;
        document.getElementById("b1").style.background="Gray"
        document.getElementById("b1").style.animationDelay
      },1000);
      this.count=10
      setTimeout(() => {
        document.getElementById("timer").innerHTML = "  'AGAIN' "

        document.getElementById("b1").disabled = false;
        document.getElementById("b1").style.background="#ef4f6c"
      }, 10000);
       
    },*/

    countDownTimer :function  () {
                if(this.countDown > 0) {
                  document.getElementById("time").innerHTML = " "+this.countDown+" "+"Seconds"
                    setTimeout(() => {
                        this.countDown -= 1
                        document.getElementById("time").innerHTML = " "+this.countDown+" "+"Seconds"
                        document.getElementById("b1").disabled = true;
                        document.getElementById("b1").style.background="Gray"
                        this.countDownTimer()
                    }, 1000)
                  
                }
                if (this.countDown==0) {
                  this.countDown=10
                  document.getElementById("time").innerHTML = " "+10+" "+"Seconds"
                  document.getElementById("b1").style.background="#ef4f6c"
                  document.getElementById("b1").disabled = false;
                }
                
            },
            
    //acceptSEnd
    acceptSend : function () { 
      document.getElementById("accept-from").style.display = "block";
    },
    closeFormAC : function () {
      document.getElementById("accept-from").style.display = "none";
    },
    //register
    closeFormRE  : function () {
      document.getElementById("regis-from").style.display = "none";
    },
    openFormRE : function () {
      document.getElementById("regis-from").style.display = "block";
    },
    //anth
    addBoard : function () {
        this.$router.replace('AddBoard')
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