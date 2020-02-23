<template> 
<div>
  <b-navbar toggleable="lg" type="light" >
    <b-navbar-brand >Relint</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <!--menu-->
    <b-collapse id="nav-collapse" is-nav>
       <b-navbar-nav>
              <b-nav-item ><b-icon icon="house" font-scale="3"></b-icon></b-nav-item>
              <b-nav-item  ><b-icon icon="kanban" font-scale="3"></b-icon></b-nav-item>
        </b-navbar-nav>
        
          <!--search-->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="l" class="mr-sm-2"  placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0"  ><b-icon icon="search" font-scale="1.8"  ></b-icon></b-button>
            </b-nav-form>

            <!--user-->
            <b-nav-item-dropdown right >
              <template v-slot:button-content  >
                <b-icon icon="person" font-scale="3"  ></b-icon>
              </template>
               
              <b-dropdown-header> 
                Hello, <span v-html=username></span>
                <b-icon icon="star" font-scale="1.3"></b-icon>
                <b-dropdown-divider></b-dropdown-divider>
              </b-dropdown-header>
              
              <b-dropdown-item href="#" v-on:click="profile">Profile</b-dropdown-item>
              <b-dropdown-item  v-on:click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script  >
/* eslint-disable */
import firebase from "firebase"
import { isOfflineForDatabase, isOnlineForDatabase} from '../../db presets/presets'

export default {
  name: 'AddBoard',
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
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/components/createBoard/navbarstyle.scss';

</style>