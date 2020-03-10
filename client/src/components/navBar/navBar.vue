<template>
    <div>
  <div class="parent">
    <div class="nav-links">
          <div class="div1"><a><b-icon  icon="house" font-scale="3" v-on:click="openFormHome" ></b-icon></a></div>
    </div>     
    <div class="nav-links">
        <div class="div2"><a><b-icon icon="kanban" font-scale="3" v-on:click="openBoardPostit"></b-icon></a></div>
    </div>

    <div class="nav-links">
        <div class="div3"> 
            <a><div id="container-S">
                <input type="text" id="input" >
                <b-icon id="input_img" icon="search" font-scale="2" ></b-icon>
            </div> </a>
        </div>
    </div>   
      
  <div class="div3">  <a><div class="dropdown">
    <button class="dropbtn"><b-icon icon="person" font-scale="3"  ></b-icon></button>
        <div class="dropdown-content">
          <a >Profile</a>
          <a  v-on:click="logout">Logout</a>
        </div>
    </div> </a>  
  </div>
  </div>

<div class="parent2">
<div class="div1-2"> 
  
   <div class="form-homeBoard" id="from-home">
     
      <div  class="form-container"> 
        
        <div class="div1-2"> <img class="bghome" src="@/assets/bghome.png" alt="bghome" ></div>
          <button class="sele-icon"  @click="closeFormHome">X</button>
        </div>
           <createBoard/>
    </div> 
    </div>
</div> 
</div>
</template>
<script>
/* eslint-disable */
import firebase from "firebase"
import { isOfflineForDatabase, isOnlineForDatabase} from '../../db presets/presets'
import createBoard from '../createBoard/createBoard'
export default {
  name: 'navBar',
  components: {
    createBoard
  },
   data (){
    return {
      username: '',
      uid: '',
    }
  },
  
  
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {    
        this.$rtdb.ref('/status/'+this.uid).off();
        this.$rtdb.ref('/status/'+this.uid).update(isOfflineForDatabase);
        this.$router.replace('/');
      }
    });
  },
  mounted () {
    this.username = this.$store.state.username;
    this.uid = this.$store.state.uid;
    const userStatusDatabaseRef = this.$rtdb.ref('/status/' + this.uid);
    this.$rtdb.ref('.info/connected').on('value', snapshot => {
      if (snapshot.val() === false) {
        return;
      }
      userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase).then(() => {
        userStatusDatabaseRef.update(isOnlineForDatabase);
      });
    });
    userStatusDatabaseRef.on('value', snapshot => {
      let stat = snapshot.val();
      if(stat.online === false){
          userStatusDatabaseRef.update(isOnlineForDatabase);
      }
    });
  },
  methods: {
    logout () {
      this.$rtdb.ref('/status/'+this.uid).off();
      firebase.auth().signOut();
    },
    profile () {
      alert(this.$store.state.uid + '\n' + this.$store.state.username);
    },
    closeFormHome () {
      document.getElementById("from-home").style.display = "none"
    },
    openFormHome () {
      document.getElementById("from-home").style.display = "block"
    },
    
  
  }
}
</script>
<style lang="scss" scoped>
@import './navBarStyle.scss';
</style>