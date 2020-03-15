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
       <button @click="showNotification">show</button>
      <button  class="dropbtn-noti"><b-icon icon="bell" font-scale="3"  ></b-icon></button>
        <div class="dropdown-content-noti">
          <!--eslint-disable -->
          <a> test</a>
          <div v-for="(noti,index) in notifications" :key="noti.pid">
            <a>
               <div class="contain-relative-btnNoti">
                  <button @click="inviteAccept(noti.pid)">T</button>
                 <button @click="inviteDecline(noti.pid)">F</button>
                </div>
               <h3>{{index}} {{noti.title}}</h3> 
                <p>{{noti.description}}</p>
                <p>{{noti.timestamp}}</p>
               
            </a>
          </div>
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
      notifications:[],
      temp1: [
            {  
               pid:'P1',
               title:'invite',
               description:'dd 20-11-20 20:44 m',
               timestamp:(new Date('2020-11-20T20:44:26+07:00')).getTime()
            },
             {
               pid:'P2',
               title:'invite',
               description:'dd 20-11-20 15:30 m',
               timestamp:new Date('2020-11-20T15:30:26+07:00').getTime()
            },
             {
               pid:'P3',
               title:'invite',
               description:'dd 30-11-20 13:00 m',
               timestamp:new Date('2020-11-30T13:00:26+07:00').getTime()
            },
             { 
               pid:'P4',
               title:'invite',
               description:'dd 29-11-20 18:04 m',
               timestamp:new Date('2020-11-29T18:04:26+07:00').getTime()
             }

      ]

      
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
    
    showNotification () {
      this.notifications=[]
      this.temp1.forEach(element => {
        this.notifications.push(element)
      });
      this.notifications=this.notifications.sort((a,b)=>{
        return a.timestamp-b.timestamp
      })
    },
    inviteAccept (pid) {
        alert('accept ' + pid )
    },
    inviteDecline (pid) {
        this.notifications = this.notifications.filter(noti => {
         return noti.pid !== pid
         })
    }
    
  
  }
}
</script>
<style lang="scss" scoped>
@import './navBarStyle.scss';
</style>