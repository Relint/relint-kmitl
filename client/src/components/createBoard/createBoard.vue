<template> 
<div>
  <div class="container-C"></div>
  </div>
</template>
<script  >
/* eslint-disable */
import firebase from "firebase"
import { isOfflineForDatabase, isOnlineForDatabase} from '../../db presets/presets'

export default {
  name: 'createBoard',
   data (){
    return {
      username: '',
      uid: '',
    }
  },
  
  
  
}
</script>
<style scoped lang="scss">
@import './createBoardStyle.scss';
</style>