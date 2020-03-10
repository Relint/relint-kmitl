<template> 
<div>

  <!--dropdown home-->
  <div class="parent2">
    <div class="div1-2"> 
    <div class="form-homeBoard" id="from-home">
        <div  class="form-container"> 
          <div class="div1-2"> <img class="bghome" src="@/assets/bghome.png" alt="bghome" ></div>
           <!-- <div class="seleHome-icon"></div>-->
          </div>



 


              <div class="parent3">
                <div class="div1-new">

                  <label  class="dropdown">
                    <div @click="openFormSetting" class="dd-button">+</div>
                        
                         <ul id="form-setting"  class="dd-menu">


                            <div class="parent-setting">
                              <div class="div1-s"><input type="text" placeholder="Project Name"> </div>
                              <div class="div2-s"><input type="text" placeholder="Deadline"></div>
                              <div class="div3-s"><input type="text" placeholder="Description"> </div>
                              <div class="div4-s">
              
             
         e   

            <input type="text" class="nes-input" placeholder="invite" v-on:keyup.enter="addMember">  
            <ul>
                <li v-for="invite in invites" :key="invite.id" >
                <label>
                    <input type="checkbox" class="nes-checkbox" v-model="invite.done">
                    <span>&nbsp;</span>
                </label>
                <del v-if="invite.done">{{ invite.projectName  }}</del>
                <span v-else>{{ invite.projectName  }}</span>
                <div class="space"></div>
                <button class="nes-btn is-error padding" v-on:click="removeTodo(invite.id)">X</button>
                </li>
            </ul>
                 
            
                              </div>
                              <div class="div5-s">5 </div>
                              <div class="div6-s"> 6</div>
                              <div class="div5-s">5 </div>
                              <div class="div6-s"> 6</div>                  
                                  
                     
                            </div>
          
                            <div class="container-setting"></div>
                            <li class="divider"></li>
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
            invites: [{projectName: 'test', done: false, id: Date.now()}]
        }
    },
  
  methods: {
    createMainBoard () {
     // this.$router.push('/addBoardPostit')
    },
    openFormSetting () {
        document.getElementById('form-setting').style.display="block"
    },
    closeFormSetting () {
      document.getElementById('form-setting').style.display ="none"
    },
  addMember({target}) {
            this.invites.push({projectName: target.value, done: false, id: Date.now()})
            target.value = ''
        },
        removeTodo(id) {
            this.invites = this.invites.filter(invite => invite.id !== id)
        }
    
  }
  
  
  
}
</script>
<style scoped lang="scss">
@import './createBoardStyle.scss';
</style>