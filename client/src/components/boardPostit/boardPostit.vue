<template> 
<div>
   <!--dropdown home-->
  <div class="parent2p">
    <div class="div1-2"> 
    <div class="form-postit" id="from-postit">
        <div  class="form-container"> 
          </div>
              <navBarProject/>
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
   navBarProject,
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