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
                                    {{project.projectName}}    index: {{index}}<br>
                                    {{project.deadline}}<br>
                                    {{project.statusProject}}<br>
                                <button class="btnProject" @click="goBoardPostit"> goBoard  </button>
                               <button class="btnProjectDelete" @click="deleteBoardV2(project.pid)"> delete  </button>
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
            <div class="parent-project">
              <div class="div1-pj">
                <label  class="dropdown">

                  <button @click="addObject(pid)">add</button>
                  <button  @click="showObject(pid) ">show</button>

                   <div @click="openFormSetting" class="dd-button">+</div>
                    <div class="dd-menu" id="form-setting"  >
                      <div class="container-setting" id="style-scroll">
                        <div class="parent-setting">
                            <div class="div1-s"><input type="text" placeholder="Project Name"  v-model="projectNameIn"> </div>
                            <div class="div2-s"><input type="text" placeholder="Deadline"  v-model="deadlineIn"></div>
                            <div class="div3-s"><input type="checkbox" placeholder="Description"  v-model="statusProjectIn"> done</div>
                            <div class="div4-s">iam an admin</div>
                            <div class="div5-s" >
                              <!--show-->
                                
                                  <div v-for="invite in invites" :key="invite.uid" > 
                                  
                                    <div> 
                                      {{ invite.email  }}
                                      {{ invites.priority }}
                                      {{ invites.status  }}
                                      <button class="nes-btn is-error padding" v-on:click="removeMenber(invite.uid)">remove</button>
                                    </div> 
                                 
                                  </div> 
                                
                                  <!--input-->
                                    <div  id="form-invite" >
                                      <div >
                                      <input   type="text" class="nes-input" placeholder="invite" v-model="emailIn" >
                                          <br>
                                          <input type="radio" name="invites" value="coAdmin" v-model="priority">CoAdmin
                                          <input type="radio" name="invites" value="member" v-model="priority">Member <br>
                                          <button  class="nes-btn is-error padding" v-on:click="addMember(uid)">ok</button>
                                      {{countMember}}
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
            statusProjectIn:false,
            
            project :[],
            emailIn:'',
            priority:0,
            statusIn:false,
            invites: [],
            temp0:[],
            temp1: [
              {
                pid:'P1',
                projectName:'projectname1.1 ',
                deadline:'deadline',
                status:false
              },
              {
                pid:'P2',
                projectName:'projectname1.2 ',
                deadline:'deadline',
                status:false
              }
            
            ],
            temp2: [
              {
                pid:'P1',
                projectName:'projectname2.1 ',
                deadline:'deadline',
                status:false
              },
               {
                pid:'P2',
                projectName:'projectname2.2 ',
                deadline:'deadline',
                status:false
               },
                {
                pid:'P3',
                projectName:'projectname2.3 ',
                deadline:'deadline',
                status:false
               },
            ],
            temp3: [
              {
                pid:'P1',
                projectName:'projectname3.1 ',
                deadline:'deadline',
                status:false
              },
              {
                pid:'P2',
                projectName:'projectname3.2 ',
                deadline:'deadline',
                status:false
              },
              {
                pid:'P3',
                projectName:'projectname3.3 ',
                deadline:'deadline',
                status:false
              },
              {
                pid:'P4',
                projectName:'projectname3.4 ',
                deadline:'deadline',
                status:false
              },
               {
                pid:'P5',
                projectName:'projectname3.5 ',
                deadline:'deadline',
                status:false
              },
            
            ],
          
        }
    },
  
  methods: {
    //test
    addObject (pid) {
 
    },
    showObject (pid) {
          
          this.project=[]
          this.temp2.forEach(element => {
            this.project.push(element)
          });
      
    },
    deleteBoardV2 (pid) {
      this.project = this.project.filter(project => {
         return project.pid !== pid
         })
    },


    //project
    createMainBoard () {
       document.getElecreateMainBoardmentById('form-setting').style.display ="none"
       this.project.push({
                          projectName:this.projectNameIn,
                          deadline:this.deadlineIn,
                          statusProject:this.statusProjectIn
                          })
       this.countProject+=1
     
    },
    goBoardPostit () {
       this.$router.push('/addBoardPostit')
    },
    deleteBoard (pid) {
       this.project = this.project.filter(project => {
         return project.pid !== pid
         })
      
       
        this. countProject-=1
    },
    openFormSetting () {
        document.getElementById('form-setting').style.display="block"
    },
    closeFormSetting () {
      document.getElementById('form-setting').style.display ="none"
    }, 


    //invite
    openFormInvite () {
      document.getElementById('form-invite').style.display="block"
    },
    addMember (uid) {
        this.invites.push({ 
                            uid:'d'+this.invites.length,
                            email:this.emailIn,
                            priority:this.priority,
                            status:this.statusIn,
                            
                          })
        
            this.emailIn = ''
    },
    removeMenber (uid) {



         this.invites = this.invites.filter(invite => {
         return invite.uid !== uid
         })
        
    },
   
    
  }
  
  
  
}
</script>
<style scoped lang="scss" >
@import './createBoardStyle.scss'
</style>