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
      <button  class="dropbtn-noti"><b-icon icon="bell" font-scale="3"  ></b-icon></button>
        <div class="dropdown-content-noti">
          <div v-if="this.notifications.length === 0"><a><center>No notification</center></a></div>
          <div v-else-if="this.notifications.length === 1"><a><center>1 notification</center></a></div>
          <div v-else><a><center>{{this.notifications.length}} notifications</center></a></div>
          <div v-for="noti in notifications" :key="noti.pid">
            <a>
               <div class="contain-relative-btnNoti">
                  <button @click="inviteAccept(noti.pid)">T</button>
                 <button @click="inviteDecline(noti.pid)">F</button>
                </div>
               <h3>{{noti.title}}</h3> 
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
            <label class="label-showName" >Hello, </label>
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

      priorityMap: [
        'Admin',
        'Co-Admin',
        'Member'
      ],
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
    let collection = this.$db.collection('project').onSnapshot(snapshot => {
          this.notifications = []
          snapshot.forEach(doc => {
            if(doc.data().member){
              let proj = doc.data().invite.filter(value => {
                return value.uid === this.$store.state.uid
              })
              if(proj.length !== 0){
                let obj = {
                  pid: doc.id,
                  title: 'Invite from ' + doc.data().title,
                  description: 'As ' + this.priorityMap[proj[0].priority],
                  timestamp: proj[0].timestamp.toDate().getDate() + '-' + (proj[0].timestamp.toDate().getMonth()+1) + '-' + proj[0].timestamp.toDate().getFullYear()
                }
                this.notifications.push(obj)
              }
            }
          });
        })
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
    inviteAccept (pid) {
      let projectRef = this.$db.collection('project').doc(pid)
      projectRef.get().then(doc => {
        if(doc.exists){
          let data = doc.data()
          let inviteRecord = data.invite.filter(ele=>ele.uid === this.uid)
          inviteRecord = {
            priority: inviteRecord[0].priority,
            uid: inviteRecord[0].uid
          }
          data.member.push(inviteRecord)
          projectRef.update({
            invite: data.invite.filter(ele => ele.uid !== this.uid),
            member: data.member,
          }).then(()=>{
            this.notifications = this.notifications.filter(noti => {
              return noti.pid !== pid
            })
          })
        }
      })
    },
    inviteDecline (pid) {
      let projectRef = this.$db.collection('project').doc(pid)
      projectRef.get().then(doc => {
        if(doc.exists) {
          let data = doc.data()
          projectRef.update({
            invite: data.invite.filter(ele => ele.uid !== this.uid)
          }).then(()=>{
            this.notifications = this.notifications.filter(noti => {
              return noti.pid !== pid
            })
          })
        }
      })
    }
    
  
  }
}
</script>
<style lang="scss" scoped>
@import './navBarStyle.scss';
</style>