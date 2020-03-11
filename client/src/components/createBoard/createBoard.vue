<template> 
<div>

  <!--dropdown home-->
<div class="parent2">
  <div class="div1-2" > 
    <div class="form-homeBoard" id="from-home">
        <div  class="form-container"   > 
          <div class="div1-2"> <img class="bghome" src="@/assets/bghome.png" alt="bghome" ></div>
           <!-- <div class="seleHome-icon"></div>-->
          <!-- newBoard-->
           
        </div>
        <div class="form-container2" id="list-scroll"  >
            
                <div v-for="project in createProject" :key="project.id" > 
                
                  <div class="projectBoardStyle" v-if=" countProjevt>0&&countProjevt<=2">
                              {{project.projectName}}<br>
                              {{project.deadline}}<br>
                              {{project.statusProject}}<br>
                          <button class="btnProject" @click="goBoardPostit"> goBoard  </button>
                          <button class="btnProjectDelete" @click="deleteBoard(project.id)"> delete  </button>
                  </div>
                  
                              
               
                </div>
                
           </div>
            <div class="parent3">
                <div class="div1-new">
                  <!--setting-->
                  <label  class="dropdown">
                    <div @click="openFormSetting" class="dd-button">+</div>
                        
                         <ul id="form-setting"  class="dd-menu">
                          <div class="container-setting" id="style-scroll">    
                            <div class="parent-setting">
                              <div class="div1-s"><input type="text" placeholder="Project Name"  v-model="projectNameIn"> </div>
                              <div class="div2-s"><input type="text" placeholder="Deadline"  v-model="deadlineIn"></div>
                              <div class="div3-s"><input type="checkbox" placeholder="Description"  v-model="statusProjectIn"> done</div>
                              
                              <div class="div4-s">
                                iam an admin
                              </div>
                               
                              <div class="div5-s" >
                                  <!--show-->
                                  <div v-if=" countMember>0">
                                    <div v-for="invite in invites" :key="invite.id" > 
                                    <div >
                                      <div> 
                                        {{ invite.email  }}
                                        {{ invites.priority }}
                                        {{ invites.status  }}
                                        <button class="nes-btn is-error padding" v-on:click="removeTodo(invite.id)">remove</button>
                                      </div> 
                                    </div>  
                                    </div> 
                                  </div>
                                  <div v-else > </div> 
                              
                                  <!--input-->
                                    <ul  id="form-invite" >
                                      <div >
                                      <input   type="text" class="nes-input" placeholder="invite" v-model="emailIn" >
                                          <br>
                                          <input type="radio" name="invites" value="coAdmin" v-model="priorityVal">CoAdmin
                                          <input type="radio" name="invites" value="member" v-model="priorityVal">Member <br>
                                          <button  class="nes-btn is-error padding" v-on:click="addMember">ok</button>
                                      {{countMember}}
                                      </div>
                                    </ul> 
                                </div>     
                            </div>
                          </div>
                            <li>
                              <button @click='createMainBoard'>accept</button>
                              <button @click='closeFormSetting'>cancel</button>
                            </li>
                         </ul>
                </label>

              </div>
              </div>
          </div>
      </div> 
  </div>





</div> 
</template>
<script  >
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
            countMember:0,
            countProjevt:0,
            createProject :[{ projectName:'',
                          deadline:'',
                          statusProject:false,
                          id: Date.now()
            }],
            emailIn:'',
            priorityVal:0,
            statusIn:false,
            invites: [{email:'',
                       priority:0,
                       status:false,
                       id: Date.now()
            }]
        }
    },
  
  methods: {
    //project
    createMainBoard () {
       document.getElementById('form-setting').style.display ="none"
       this.createProject.push({
                          projectName:this.projectNameIn,
                          deadline:this.deadlineIn,
                          statusProject:this.statusProjectIn
                          })
       this.countProjevt+=1
     
    },
    goBoardPostit () {
       this.$router.push('/addBoardPostit')
    },
    deleteBoard (id) {
       this.createProject = this.createProject.filter(project => project.id !== id)
        this. countProjevt-=1
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
    addMember ({target}) {
        
        this.invites.push({ email:this.emailIn,
                            priority:this.priorityVal,
                            status:this.statusIn,
                            id: Date.now()
                          })
            this. countMember+=1
            this.emailIn = ''
    },
    removeTodo (id) {
        this.invites = this.invites.filter(invite => invite.id !== id)
        this. countMember-=1
    },
   
    
  }
  
  
  
}
</script>
<style scoped lang="scss">
@import './createBoardStyle.scss';
</style>