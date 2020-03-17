<template>
 <div>
     <!--dropdowm-->
    <div class="parent-bg">
       <div class="div1-bg" >
          <div class="form-homeBoard" id="from-home">
            <div  class="form-container"   > 
              <div class="div1-dd"> <img class="bghome" src="@/assets/bghome.png" alt="bghome" ></div>
            </div><!--form-container-->
          </div>
       </div>
    </div>

      <div class="parentBG">
          <div class="div1-BG"> 
            <div class="contain-relative-bg">
             
                 <div class="contain-bg">
                    <!-- <img class="bghome" src="@/assets/bghome.png" alt="bghome" > -->

                
                 
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
                            <div class="div3-s"><input type="date" id="datefield" min="2000-01-01" v-model="deadlineIn"></div>
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
                                      <input   type="text" class="nes-input" placeholder="invite" v-model="emailIn" v-on:keyup.enter="addMember"  >
                                          <br>
                                          <select @change='onChange' id='selector'  v-on:keyup.enter="addMember"  >
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

                    <div class="form-scroll-createBoard" id="board-scroll"  >
                  
                     <div class="from-createBoard">
                     
                        <!-- <p>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>
                        5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>
                        5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>5555<br>
       
                        </p> -->

   
                            <div v-for="(project,index) in project" :key="project.pid"  > 


                                <div id="container-Board" v-bind:style="{left: (index%2)*250+100+(index%2)*150 + 'px',top:(Math.floor(index/2))*270+50+(Math.floor(index/2))+'px'  }">
                                   
                                      
                                      <div class="dot two"></div>
                                      <div class="face">
                                        <div class="eye"></div>
                                        <div class="eye right"></div>
                                        <div class="mouth happy"></div>
                                      </div>
                                      <div class="shadow scale"></div>

                                      <div class="show-message">
                                          <h1>{{project.title}}</h1>
                                         <p> {{project.description}}</p><br><br> 
                                          <p> {{project.deadline.toDate().getDate() + "-" + (project.deadline.toDate().getMonth() + 1) + "-" + project.deadline.toDate().getFullYear()}}</p><br>
                                      </div>
                                      <button class="button-box"><p class="green" @click="goBoardPostit">join</p></button>
                                      <button class="button-box1"><p class="green" @click="deleteBoard(project.pid)" v-if="project.permission">delete</p></button>
                                    </div>
                                  



                        <!-- <div class="projectBoardStyle" id="form-layout" v-bind:style="{left: (index%2)*400+100+(index%2)*150 + 'px',top:(Math.floor(index/2))*250+50+(Math.floor(index/2))+'px'  }" >
                                    <h3>{{project.title}}</h3>
                                    {{project.description}}<br><br> 
                                    {{project.deadline.toDate().getDate() + "-" + (project.deadline.toDate().getMonth() + 1) + "-" + project.deadline.toDate().getFullYear()}}<br>
                                <button class="btnProject" @click="goBoardPostit"> goBoard  </button>
                               <button class="btnProjectDelete" @click="deleteBoard(project.pid)" v-if="project.permission"> delete  </button>
                        </div> -->

                       </div>
                     </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
  
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
            countSett:0,
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
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth()+1
      let yyyy = today.getFullYear()
      if(dd < 10) dd = '0'+dd
      if(mm < 10) mm = '0'+mm
      today = yyyy+'-'+mm+'-'+dd
      document.getElementById('datefield').setAttribute('min', today)

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
      this.countSett+=1
      if (this.countSett==1) {
        document.getElementById('form-setting').style.display="block"
      }
      else if ( this.countSett==2) {
        document.getElementById('form-setting').style.display ="none"
       this.invites = []
       this.countSett=0
      }
        
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