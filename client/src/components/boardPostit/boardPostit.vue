<template> 
<div>
    <div class="contain-boardPostit">
      <div class="form-scroll-postit" id="postit-scroll"  >
        <div class="from-boardPostit">

            <div class="add-postit-begin " id="begin-postit"  >
              <input id="begin-postit" type="text" placeholder="add postit" v-model="postItIn"> 
              <button @click="createPostit">Ok</button>
            </div>

            <div v-for="(postIt,index) in postIts" :key="postIt.postId">
              <div id="show-postit " class="show-postit " v-bind:style="{left:10+(index)*350+(index)*30 + 'px',top:30+'px' , }">
                <div class="form-postit ">
                  {{index}} {{postIt}}
                </div>
              </div>
              <div  class="next-postit " v-bind:style="{left:400+(index)*350+(index)*30 + 'px',top:30+'px' , }">
                  <div class="form-next-input-postit"   >
                  <input  type="text" placeholder="add postit" v-model="postItIn"> 
                  <button  @click="createPostit">Ok</button>
                </div>
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
//import navBar from '../navBar/navBar'
export default {
  name: 'boardPostit',
  components: {
  }, 
  data () {
    return {
      postIts:[],
      postItIn:''
      
    }
  },
  methods: {
    createPostit () {
        this.postIts.push(this.postItIn)
        this.postItIn=''
        document.getElementById('begin-postit').style.display="none"
        // document.getElementById('input-postit').style.display='none'
        // document.getElementById('form-input-postit').classList.add('show-postit')
    },
   
  }
}
</script>
<style scoped lang="scss">
@import './boardPostitStyle.scss';
</style>