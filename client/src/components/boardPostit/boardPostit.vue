<template>
  <div>
    <div class="contain-boardPostit">
      <div class="form-scroll-postit" id="postit-scroll">
        <div class="from-boardPostit">
          
            <div v-for="(postit , index) in postits" :key="postit.postId" ref="postId">
                <div class="form-show-postit" v-bind:style="{left: 10+(index)*350+(index)*30 + 'px',top:0+'px'  }">
                      {{postit.title}}
                      <button @click="editPostit(postit.postId)"   >...</button>
                      <button @click="deletePostit(postit.postId)">delete</button><br/>
                      <button>add card</button>
                </div>
                
                <div v-if="postits.length>0">
                    <div class="form-input-postit" v-bind:style="{left:(postits.length)*350+(postits.length)*30 + 'px',top:0+'px'  }">
                      <input class="input-postit" type="text" placeholder="add post-it" v-model="postitIn">
                      <div @click="createPostit(postit.postId)" class="btn-create-postit"><b-icon class="center-icon" icon="plus" font-scale="3" ></b-icon></div>
                      <!-- <button @click="createPostit2" >test</button> -->
                    </div>
                </div>
                <div class="form-edit-postit" id="form-edit-postit"  v-bind:style="{left: 10+(index)*350+(index)*30 + 'px',top:50+'px'  }">
                  <input class="input-edit-postit" type="text" placeholder="add post-it" v-model="postitIn">
                  <button>save</button>
                  <button>cancel</button>
                </div>
            </div>
            <div class="form-input-postit" id="form-input-postit" >
                <input class="input-postit" type="text" placeholder="add post-it" v-model="postitIn">
                <div @click="createPostit" class="btn-create-postit"><b-icon class="center-icon" icon="plus" font-scale="3" ></b-icon></div>
            </div>
            
             <!-- <div v-for="card in cards" :key="card.cid">
                  <div class="aCard">
                    <cardBox :cardName="cardName" :date="date"/>
                  </div>
              </div> -->

          </div>
        </div>
      </div>
    </div>
</template>
<script  >
/* eslint-disable */
import firebase from "firebase";
import {
  isOfflineForDatabase,
  isOnlineForDatabase
} from "../../db presets/presets";

export default {
  name: "boardPostit",
  components: {
  },
  data() {
    return {
      postitIn:'',
      postits:[],
      temp0:[
        {
          pid:'P1',
          postId:'Po1',
          title:'test1',
        },
        {
          pid:'P1',
          postId:'Po2',
          title:'test2',
        },
        {
          pid:'P1',
          postId:'Po3',
          title:'test3',
        },
        {
          pid:'P1',
          postId:'Po4',
          title:'test4',
        },
        {
          pid:'P1',
          postId:'Po5',
          title:'test5',
        }
      ]
    };
  },
  mounted () {
    document.getElementById('form-edit-postit').style.display='none'
  },
  methods: {
    deletePostit (postId) {
       this.postits = this.postits.filter(postit => {
         return postit.postId !== postId
         })
    },
    editPostit (postId) {
      console.log(this.$refs.postId)
        // if (document.getElementById('form-edit-postit').style.display==='none'){
        //   document.getElementById('form-edit-postit').style.display='block'
        // }
        // else {
        //   document.getElementById('form-edit-postit').style.display='none'
        // }
     
      
      //    if (document.getElementById('form-edit-postit').style.display==='none'){
      //   document.getElementById('form-edit-postit').style.display='block'
      // }
      // else {
      //   document.getElementById('form-edit-postit').style.display='none'
      // }
     

      // if (document.getElementById('form-edit-postit').style.display==='none'){
      //   document.getElementById('form-edit-postit').style.display='block'
      // }
      // else {
      //   document.getElementById('form-edit-postit').style.display='none'
      // }
      
    },
    // createPostit2 () {
    //   this.postits.push(this.postitIn)
    // },
    createPostit () {
      this.postits=[]
      this.temp0.forEach(element => {
        this.postits.push(element)
      });
      document.getElementById('form-input-postit').style.display='none'
    }
  }
}
</script>
<style scoped lang="scss">
@import "./boardPostitStyle.scss";
</style>