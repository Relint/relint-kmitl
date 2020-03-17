<template> 
<div>
   <!--dropdown home-->
  <div class="parent2p">
    <div class="div1-2"> 
    <div class="form-postit" id="from-postit">
        <div  class="form-container"> 
          <div class="div1-2p"> <img class="bghome" src="@/assets/bghome.png" alt="bghome" ></div>
           <!-- <div class="seleHome-icon"></div>-->
          </div>
              <navBarProject/>

              <div>
              <input type="text" placeholder="postit">
              </div>

          </div>
      </div> 
    </div>
</div><!--close-->
</template>
<script  >
/* eslint-disable */
import firebase from "firebase"
import { isOfflineForDatabase, isOnlineForDatabase} from '../../db presets/presets'
import navBarProject from '../navBarProject/navBarProject'
//import navBar from '../navBar/navBar'
export default {
  name: 'boardPostit',
  components: {
  // navBar,
   navBarProject
  },
   data (){
    return {
      username: '',
      uid: '',
    }
  },
  
  
  
}
</script>
<style scoped lang="scss">
@import './boardPostitStyle.scss';
</style>