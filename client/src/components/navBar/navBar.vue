<template>
    <div>
  <div class="parent">
    <div class="nav-links">
          
    </div>     
    <div class="nav-links">
        <div class="div2"><h1 class="brand">RELINT</h1></div>
    </div>

    <div class="nav-links">
        <div class="div3"> 
            <a><div id="container-S">
                <input type="text" id="input" placeholder="Search" v-model="searchText" @keyup='searchTextHandler'>
                <b-icon id="input_img" icon="search" font-scale="2" ></b-icon>
            </div> </a>
        </div>
    </div>   
      
      
  <div class="div3"> 
     <div class="contain-noti-relative">
     <a><div class="dropdown-noti">
      <button class="dropbtn-noti"><b-icon icon="bell" font-scale="3"  ></b-icon></button>
        <div class="dropdown-content-noti">
          <a >noti</a>
          <a >noti2</a>
          <a >noti2</a>
          <a >noti2</a>
        </div>
    </div> </a>  
    </div>
        
    
   <div class="contain-prof-relative">
    <a><div class="dropdown">
    <button class="dropbtn"><b-icon icon="person" font-scale="3"  ></b-icon></button>
        <div class="dropdown-content">
          <div class="contain-showName"> 
            <label class="label-showName" >Hello,</label>
             <span class="showName" v-html="username" ></span>
          </div>
          <a >Profile</a>
          <a  v-on:click="logout">Logout</a>
        </div>
    </div></a>  
  </div>
  </div>
  </div>
 <!--dropdown home-->
      
</div>
</template>
<script>
/* eslint-disable */
import firebase from "firebase"
import { isOfflineForDatabase, isOnlineForDatabase} from '../../db presets/presets'
import createBoard from '../createBoard/createBoard'
import boardPostit from '../boardPostit/boardPostit'
export default {
  name: 'navBar',
  components: {
  },
   data (){
    return {
      username: '',
      uid: '',
      searchText: '',
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
    openFormPostit () {
      document.getElementById("from-post").style.display = "block"
    },
    closeFormPostit () {
      document.getElementById("from-post").style.display = "none"
    },
    async searchTextHandler() {
      await this.$store.commit('setSearchText',this.searchText)
    },
    openFormNoti () {
      alert('d')
    }
    
  
  }
}
</script>
<style lang="scss" scoped>
@import './navBarStyle.scss';
</style>