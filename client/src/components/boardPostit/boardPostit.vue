<template>
  <div>
    <div class="contain-boardPostit">
      <div class="form-scroll-postit" id="postit-scroll">
        <div class="from-boardPostit">
         
            <div v-for="(postit , index) in postits" :key="postit.postId" ref="postId">
              <div class="form-show-postit" v-bind:style="{left: 10+(index)*350+(index)*30 + 'px',top:50+'px'  }">
                    {{postit.title}}
                    <button @click="editPostit(index)"   >...</button>
                    <button @click="deletePostit(postit.postId)">delete</button><br/>
                    <button @click="openFormCard(index)">add card</button>
              </div>
                
              <div v-if="postits.length>0">
                  <div class="form-input-postit" v-bind:style="{left:(postits.length)*350+(postits.length)*30 + 'px',top:50+'px'  }">
                    <input class="input-postit" type="text" placeholder="add post-it" v-model="postitIn">
                    <div @click="createPostit(postit.postId)" class="btn-create-postit"><b-icon class="center-icon" icon="plus" font-scale="3" ></b-icon></div>
                    <!-- <button @click="createPostit2" >test</button> -->
                  </div>
              </div>
              <div  ref="edit" class="form-edit-postit" id="form-edit-postit"  v-bind:style="{left: 10+(index)*350+(index)*30 + 'px',top:100+'px'  }">
                <input class="input-edit-postit" type="text" placeholder="add post-it" v-model="postitInEdit">
                <button >save</button>
                <button>cancel</button>
              </div>
              <div ref="settingCard" class="setting-card">
                <button @click="createCard(index)">create</button>
                <button @click="closeFormSettingCard(index)">cancel</button>
              </div>
            </div>
            <div class="form-input-postit" id="form-input-postit" >
                <input class="input-postit" type="text" placeholder="add post-it" v-model="postitIn">
                <div @click="createPostit" class="btn-create-postit"><b-icon class="center-icon" icon="plus" font-scale="3" ></b-icon></div>
            </div>
             
            <div v-for="(card , index) in cards" :key="card.cid" ref="cid">
              <div ref="card" class="from-card" id="form-card" v-bind:style="{ top:120+(index)*80+'px'  }">
                  {{card.cardName}} <br/>
                  {{card.date}} <br/>
                 vote : {{card.star}}<br/>
                <button @click="removeCard(card.cid)">remove</button>
                <button >edit</button>
              </div>
              
          </div>
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
import cardBox from "../boardPostit/cardBox";
export default {
  name: "boardPostit",
  components: {
    cardBox
  },
  data() {
    return {
      postitIn:'',
      postitInEdit:'',
      postits:[],
      cards:[],
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
      ],
      temp1:[
        {
          cid:'C1',
          cardName:'card1',
          date: '22/05/2020',
          star: 4
        },
         {
          cid:'C2',
          cardName:'card2',
          date: '25/05/2020',
          star: 3
        },
         {
           cid:'C3',
          cardName:'card3',
          date: '29/05/2020',
          star: 3
        },
      ]
    };
  },
  beforeCreate(){
      let collection = this.$db.collection('project').onSnapshot(snapshot => {
          this.project = []
          snapshot.forEach(doc => {
            if(doc.data().member){
              let proj = doc.data().member.filter(value => {
                return value.uid === this.$store.state.uid
              })
              if(proj.length !== 0){
                let obj = doc.data()
                obj.pid = doc.id
                obj.permission = !proj[0].priority
                this.project.push(obj)
              }
            }
          });
        })
    },
  mounted () {
    // document.getElementById('form-edit-postit').style.display='none'
  },
  methods: {
    removeCard(cid) {
      this.cards = this.cards.filter(card => {
         return card.cid !== cid
         })
    },
    openFormCard(index) {
       if (this.$refs.settingCard[index].style.display==='block'){
        this.$refs.settingCard[index].style.display='none'
      }
      else {
        this.$refs.settingCard[index].style.display='block'
      }
      
    },
    createCard (index) {
      this.cards=[]
      this.temp1.forEach(element => {
        this.cards.push(element)
      });
      this.$refs.settingCard[index].style.display='none'
    },
    closeFormSettingCard (index) {
       this.$refs.settingCard[index].style.display='none'
    },
    deletePostit (postId) {
       this.postits = this.postits.filter(postit => {
         return postit.postId !== postId
         })
    },
    editPostit (index) {
      if (this.$refs.edit[index].style.display==='block'){
        this.$refs.edit[index].style.display='none'
      }
      else {
        this.$refs.edit[index].style.display='block'
      }
      
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