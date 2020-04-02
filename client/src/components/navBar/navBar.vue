<template>
    <div>
      <div class="navbar-container">
          <div class="navbarBorder ">
            <div class="wrapper float-l div-1">
              <li class="brand">RELINT</li>
            </div>

            <div class="wrapper float-l div-2">
              <input type="text" class="input-search" placeholder="Search" v-model="searchText" @keyup='searchTextHandler'>
              <b-icon class="input_icon float-r" icon="search" font-scale="2" ></b-icon>
            </div>

              <div class="wrapper float-r div-4" >
                <div class="drop-profile">
                  <button class="dropbtn"><b-icon icon="person" font-scale="3"></b-icon></button>        
                  <div class="dropdown-content-profile">
                    <h5 class="contain-showName">Hello, </h5>
                    <div class="showName" v-html="username" ></div>
                    <hr >
                    <a >Profile</a>
                    <a  v-on:click="logout">Logout</a>
                  </div> 
                </div>
              </div>

            
              <div class="wrapper float-r div-3">
                <div class="drop-noti">
                  <div v-if="this.notifications.length >= 1" class="notification float-l">
                    {{this.notifications.length}}
                  </div>
                  <button class="dropbtn-noti float-l"><b-icon icon="bell" font-scale="2.5"  ></b-icon></button>
                  <div class="dropdown-content-noti">
                    <div v-if="this.notifications.length === 0"><a><center>No notification</center></a></div>
                    <div v-else-if="this.notifications.length === 1"><a><center>1 notification</center></a></div>
                    <div v-else><a><center>{{this.notifications.length}} notifications</center></a></div>
                    <hr>
                    <div v-for="noti in notifications" :key="noti.pid">
                      <a>
                        <h3>{{noti.title}}</h3> 
                        <p>{{noti.description}}</p>
                        <p class="float-l">{{noti.timestamp}}</p><br>
                        <div class="contain-btnNoti float-r">
                          <button class="btn-T" @click="inviteAccept(noti.pid)"><b-icon class="center-icon" icon="check" font-scale="1.5"  ></b-icon></button>
                          <button class="btn-F" @click="inviteDecline(noti.pid)"><b-icon class="center-icon" icon="x" font-scale="1.5"  ></b-icon></button>
                        </div>
                      </a><hr>
                    </div>
                  </div>
                  
                </div>
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