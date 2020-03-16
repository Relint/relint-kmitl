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
                                    <h3>{{project.title}}</h3>
                                    {{project.description}}<br><br> 
                                    {{project.deadline.toDate().getDate() + "-" + (project.deadline.toDate().getMonth() + 1) + "-" + project.deadline.toDate().getFullYear()}}<br>
                                <button class="btnProject" @click="goBoardPostit"> goBoard  </button>
                               <button class="btnProjectDelete" @click="deleteBoard(project.pid)" v-if="project.permission"> delete  </button>
                        </div>
                      </div>
                     
                  </div><!--form-container2-->
          
               <div class="parent-create">
                <div class="div1-c"></div>
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
                            <div class="div2-s"><input type="text" placeholder="Description" v-model="descriptionIn"></div>
                            <div class="div3-s"><input type="date" placeholder="Deadline" v-model="deadlineIn"></div>
                            <div class="div4-s" >
                              <!--show-->
                                
                                  <div v-for="invite in invites" :key="invite.uid" > 
                                    <div> 
                                      <a>{{ invite.email  }} {{priorityMap[invite.data.priority] }}</a>
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
            descriptionIn:'',
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
            priorityMap: [
              'Admin',
              'Co-Admin',
              'Member'
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
                obj.permission = !proj[0].priority
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
          description: this.descriptionIn,
          deadline: this.deadlineIn,
          status: false,
          member: [
            {
              uid: firebase.auth().currentUser.uid,
              priority: 0
          }],
          invite:this.invites.map(ele => ele.data)
        }
        ref.doc(pid).set(obj)
        ref.doc('pindex').set({
          count: pindex.count+1,
          total: pindex.total+1
        },{merge: true})
        this.projectNameIn=''
        this.descriptionIn=''
        this.deadlineIn=''
        this.invites=[]
      }).catch(err => {
        console.log(err)
      })

      document.getElementById('form-setting').style.display ="none"
    },
    goBoardPostit () {
       this.$router.push('/addBoardPostit')
    },
    deleteBoard (pid) {
      let ref = this.$db.collection('project')
      if(confirm('Delete this board? The deleted board cannot be restored.')){
        ref.doc(pid).delete().then(()=>{
          ref.doc('pindex').get().then(doc=>{
            let data = doc.data()
            ref.doc('pindex').set({
              total: data.total-1
            },{merge:true})
          })
        }).catch(err=>{
          alert(err)
        })
      }
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
        } 

        this.$http({
          method: "get",
          url: "/invite",
          headers:{
            email: this.emailIn
          }
        }).then(res=> {
          if(res.data === firebase.auth().currentUser.uid){
            alert('You invited yourself.')
            this.emailIn = ''
            document.getElementById('selector').selectedIndex = 0
            this.authority=0
            return
          }
          let check = this.invites.filter(ele => ele.data.uid === res.data)
          if(check.length !== 0){
            alert('Duplicate user invited')
            this.emailIn = ''
            document.getElementById('selector').selectedIndex = 0
            this.authority=0
            return
          }
          this.invites.push({ 
                            data:{
                                  priority:this.authority,
                                  uid: res.data,
                                  timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                                 },
                            email:this.emailIn
                          })
          this.emailIn = ''
          document.getElementById('selector').selectedIndex = 0
          this.authority=0
        }).catch(err=> {
          alert('User doesn\'t exist')
          document.getElementById('selector').selectedIndex = 0
          this.authority=0
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