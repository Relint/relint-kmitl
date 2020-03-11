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
            <div class="parent-create">
              <div class="div1-c">
                  <div class="form-container2" id="list-scroll"  >
                    <div v-if=" countProjevt>0" >
                      <div v-for="project in createProject" :key="project.iv" > 
                      <div class="projectBoardStyle"  >
                                  {{project.projectName}}<br>
                                  {{project.deadline}}<br>
                                  {{project.statusProject}}<br>
                              <button class="btnProject" @click="goBoardPostit"> goBoard  </button>
                              <button class="btnProjectDelete" @click="deleteBoard(project.iv)"> delete  </button>
                      </div>
                    </div>
                    </div>
                    
                  </div>
                </div>
                <div class="div2-c">2</div>
                <div class="div3-c">3</div>
                <div class="div4-c">4</div>
              
            </div><!--parent-create------------------------------------------------------->
            <!--project setting------------------------------------------------------->
            <div class="parent-project">
              <div class="div1-pj">
                <label  class="dropdown">
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
                                <div v-if=" countMember>0">
                                  <div v-for="invite in invites" :key="invite.id" > 
                                  
                                    <div> 
                                      {{ invite.email  }}
                                      {{ invites.priority }}
                                      {{ invites.status  }}
                                      <button class="nes-btn is-error padding" v-on:click="removeTodo(invite.id)">remove</button>
                                    </div> 
                                 
                                  </div> 
                                </div>
                                <div v-else > </div> 
                                  <!--input-->
                                    <div  id="form-invite" >
                                      <div >
                                      <input   type="text" class="nes-input" placeholder="invite" v-model="emailIn" >
                                          <br>
                                          <input type="radio" name="invites" value="coAdmin" v-model="priorityVal">CoAdmin
                                          <input type="radio" name="invites" value="member" v-model="priorityVal">Member <br>
                                          <button  class="nes-btn is-error padding" v-on:click="addMember">ok</button>
                                      {{countMember}}
                                      </div>
                                    </div> 
                            </div>
                        </div>
                      </div><!--container-setting"-->
                        <li>
                          <button @click='createMainBoard'>accept</button>
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
    deleteBoard (iv) {
       this.createProject = this.createProject.filter(project => project.iv !== iv)
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
<style scoped lang="scss" >
@import './createBoardStyle.scss'
</style>