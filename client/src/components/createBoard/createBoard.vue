<template>
  <div>
   
     

     <!--dropdowm-->
    <div class="parent-bg">
       <div class="div1-bg" >
          <div class="form-homeBoard" id="from-home">
            <div  class="form-container"   > 
              <div class="div1-dd"> <img class="bghome" src="@/assets/bghome.png" alt="bghome" ></div>
            </div><!--form-container-->

            <!--project create------------------------------------------------------->
               <div class="form-container2" id="list-scroll"  >
                      <!--1-->
                      <!-- eslint-disable -->
                      <div v-for="(project,index) in project" :key="project.pid"  > 
                        <div class="projectBoardStyle" id="form-layout" v-bind:style="{left: (index%2)*400+100+(index%2)*100 + 'px',top:(Math.floor(index/2))*200+100+(Math.floor(index/2)) +'px'  }" >
                                    {{project.title}}    index: {{index}}<br>
                                    {{project.deadline.toDate().getDate() + "-" + (project.deadline.toDate().getMonth() + 1) + "-" + project.deadline.toDate().getFullYear()}}<br>
                                    {{project.statusProject}}<br>
                                <button class="btnProject" @click="goBoardPostit"> goBoard  </button>
                               <button class="btnProjectDelete" @click="deleteBoard(project.pid)"> delete  </button>
                        </div>
                      </div>
                     
                  </div><!--form-container2-->
          
               <div class="parent-create">
                <div class="div1-c"> </div>
                <div class="div2-c"></div>
                <div class="div3-c"></div>
                <div class="div4-c"></div>
              
            </div><!--parent-create------------------------------------------------------->
            <!--project setting------------------------------------------------------->

            <div>The text in Search box from navbar component shows here: {{searchText}}</div><br>
            <div>Data from other components can't be accessed. Event handler implemented</div>

            <div class="parent-project">
              <div class="div1-pj">
                <label  class="dropdown">
                  <div @click="openFormSetting" class="dd-button">+</div>
                    <div class="dd-menu" id="form-setting"  >
                      <div class="container-setting" id="style-scroll">
                        <div class="parent-setting">
                            <div class="div1-s"><input type="text" placeholder="Project Name"  v-model="projectNameIn"> </div>
                            <div class="div2-s"><input type="date" placeholder="Deadline"  id='deadline' v-model="deadlineIn"></div>
                            <div class="div4-s">iam an admin</div>
                            <div class="div5-s" >
                              <!--show-->
                                
                                  <div v-for="invite in invites" :key="invite.uid" > 
                                  
                                    <div> 
                                      {{ invite.email  }}
                                      {{ invites.authority }}
                                      <button class="nes-btn is-error padding" v-on:click="removeMenber(invite.uid)">remove</button>
                                    </div> 
                                 
                                  </div> 
                                
                                  <!--input-->
                                    <div  id="form-invite" >
                                      <div >
                                      <input   type="text" class="nes-input" placeholder="invite" v-model="emailIn" >
                                          <br>
                                          <select @change='onChange' id='selector'>
                                            <option v-for="(opt, index) in opts" :key="index" :value="opt.value">
                                              {{ opt.text }}
                                            </option>
                                          </select><br>
                                          <button  class="nes-btn is-error padding" v-on:click="addMember">ok</button>
                                      </div>
                                    </div> 
                            </div>
                        </div>
                      </div><!--container-setting"-->
                        <li>
                          <button @click='createMainBoard' >accept</button>
                          <button @click='closeFormSetting'>cancel</button>
                        </li>
                        
                    </div><!--dd-menu-->
                </label><!--dropdown-->
              </div>
            </div><!--parent-project-------------------------------------------------->



          </div><!--form-homeBoard----------------------------------------------------->
       </div> <!--div1-dd-->
    </div><!--parent-dropdown-->

   
  
  
  
  </div> <!--close-->
</template>

<script>
/* eslint-disable */
import firebase from "firebase"
import { isOfflineForDatabase, isOnlineForDatabase} from '../../db presets/presets'
import navBarProject from '../navBarProject/navBarProject'

export default {
  name: 'createBoard',
  components: {
    navBarProject
  },
data () {
        return {
            projectNameIn:'',
            deadlineIn:'',
            
            project :[],

            emailIn:'',
            authority:0,
            invites: [],

            opts: [
              { value: 0, text: '--Choose Member Type--'},
              { value: 1, text: 'Co-Admin' },
              { value: 2, text: 'Member' },
            ],

            searchText: ''
          
        }
    },
    beforeCreate(){
      let collection = this.$db.collection('project').onSnapshot(snapshot => {
          this.project = []
          snapshot.forEach(doc => {
            if(doc.data().member){
              let proj = doc.data().member.filter(value => {
                return value.uid === this.$store.state.uid
              })
              if(proj.length !== 0){
                let obj = doc.data()
                obj.pid = doc.id
                this.project.push(obj)
              }
            }
          });
        })
    },
    mounted () {
      this.closeFormSetting()
      this.$store.subscribe((mutation, state) => {
        if(mutation.type === 'setSearchText'){
          this.searchText = state.searchText
        }
      })
    },
  
  methods: {
    showObject () {
          
          this.project=[]
          this.temp2.forEach(element => {
            this.project.push(element)
          });
      
    },
    //project
    createMainBoard () {
      const ref = this.$db.collection('project')
      ref.doc('pindex').get().then(doc => {
        if(!this.deadlineIn){
          alert('Please select deadline')
          return
        }
        this.deadlineIn = firebase.firestore.Timestamp.fromDate(new Date(this.deadlineIn+'T00:00:00+07:00'))
        let pindex = doc.data()
        let pid = 'P' + pindex.count
        let obj = {
          title: this.projectNameIn,
          deadline: this.deadlineIn,
          status: false,
          member: [
            {
              uid: firebase.auth().currentUser.uid,
              priority: 0
          }],
          invite: this.invites
        }
        ref.doc(pid).set(obj)
        ref.doc('pindex').set({
          count: pindex.count+1,
          total: pindex.total+1
        },{merge: true})
      }).catch(err => {
        console.log(err)
      })

      document.getElementById('form-setting').style.display ="none"
    },
    goBoardPostit () {
       this.$router.push('/addBoardPostit')
    },
    deleteBoard (pid) {
       this.project = this.project.filter(project => {
         return project.pid !== pid
         })
    },
    openFormSetting () {
        document.getElementById('form-setting').style.display="block"
    },
    closeFormSetting () {
      document.getElementById('form-setting').style.display ="none"
      this.invites = []
    }, 


    //invite
    openFormInvite () {
      document.getElementById('form-invite').style.display="block"
    },
    addMember () {
        if(!this.authority){
          alert('Please Choose Member Type')
          return
        } else {
          document.getElementById('selector').selectedIndex = 0;
        }

        this.$http({
          method: "get",
          url: "/invite",
          headers:{
            email: this.emailIn
          }
        }).then(res=> {
          this.invites.push({ 
                            uid: res.data,
                            email:this.emailIn,
                            authority:this.authority,
                          })
          this.emailIn = ''
        }).catch(err=> {
          alert('User doesn\'t exist')
        })

        
    },
    removeMenber (uid) {
         this.invites = this.invites.filter(invite => {
         return invite.uid !== uid
         })
    },
    onChange(e) {
      let index = e.target.selectedIndex;
      this.authority = index
    },
    
  }
  
  
  
}
</script>
<style scoped lang="scss" >
@import './createBoardStyle.scss'
</style>