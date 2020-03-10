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
                  <label class="dropdown">
                    <div class="dd-button">+</div>
                    <input type="checkbox" class="dd-input" id="test">

                      <ul class="dd-menu">
                        <div class="container-setting"></div>
                        <li class="divider"></li>
                        <li>
                          <button>accept</button>
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
   data (){
    return {
    }
  },
  methods: {
    createMainBoard () {
    }
  }
  
  
  
}
</script>
<style scoped lang="scss">
@import './createBoardStyle.scss';
</style>