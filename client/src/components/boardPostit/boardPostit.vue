<template> 
<div>

  <!--dropdown home-->
  <div class="parent2">
    <div class="div1-2"> 
    <div class="form-Postit" id="from-post">
        <div  class="form-container"> 
          <div class="div1-2"> <img class="bghome" src="@/assets/bghome.png" alt="bghome" ></div>
            <div class="selePostit-icon"></div>
          </div>
             <h1>5555555555</h1>
      </div> 
    </div>
  </div> 
</div>
</template>
<script  >
/* eslint-disable */
import firebase from "firebase"
import { isOfflineForDatabase, isOnlineForDatabase} from '../../db presets/presets'
import navBarProject from '../navBarProject'
export default {
  name: 'boardPostit',
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