<template>
  <div>
    <div class="contain-boardPostit">
      <div class="form-scroll-postit" id="postit-scroll">
        <div class="from-boardPostit">
            <div v-for="(postit , index) in postits" :key="'pt-'+index" :ref="'psti'"  class="contain-show-postit noselect" v-bind:style="{left:10+(index)*290+(index)*30 + 'px',top:0+'px'  }">
              <div v-if="postit.createBox">
                  <div class="form-input-postit">
                    <input class="input-postit" type="text" placeholder="add post-it" v-model="postitIn" v-on:keyup.enter="createPostit">
                    <div @click="createPostit" class="btn-create-postit"><b-icon class="center-icon" icon="plus" font-scale="3" ></b-icon></div>
                  </div>
              </div>
              <div v-else>
                
                <div class="form-show-postit">
                  <div ref="epsti" style="display:none">
                    <div class="contain-input-edit">
                      <input id="einput"  class="input-edit-postit" type="text" v-model="postitInEdit" placeholder="Edit a title..."> 
                      <button class="btn-check " @click="saveEditPostit(index)"><b-icon icon="check" id="mov-l" font-scale='1.5'></b-icon></button>
                      <button class="btn-x " @click="closeFormEditPostit(index)"><b-icon icon="x" id="mov-r" font-scale='1.5'></b-icon></button>
                    </div>
                  </div>
                  <div ref="npsti">
                  <div class="show-postit-title" @click="editPostit(index)">{{postit.title}}</div>
                  <button class="btn-x-postit " @click="deletePostit(index)"><b-icon icon="x" font-scale="2"></b-icon></button><br/>
                  <button class=" btn-move float-l  " v-if="index!=0" @click="movLeft(index)"><b-icon icon="chevron-compact-left" id="mov-l" font-scale='1.5'></b-icon></button>
                  <button class="disabled float-l " v-else><b-icon icon="chevron-compact-left" id="mov-l" font-scale='1.5'></b-icon></button>
                  <button class="btn-move float-r" v-if="index<postits.length-2" @click="movRight(index)"><b-icon icon="chevron-compact-right" id="mov-r" font-scale='1.5'></b-icon></button>
                  <button class=" disabled float-r " v-else><b-icon icon="chevron-compact-right" id="mov-r" font-scale='1.5'></b-icon></button>
                 
                  </div>
                </div>
                <button class="btn-add-card" @click="toggleFormCard(index)">add card...</button>
                <div id="postit-scroll" class="contain-show-card">
                <Container 
                    group-name="col"
                    @drop="(e) => onCardDrop(index, e)"
                    :get-child-payload="getCardPayload(index)"
                    drag-class="card-ghost"
                    drop-class="card-ghost-drop"
                  >
                  <Draggable  v-for="(card , index2) in postit.card" :key="'kc'+index+'-'+index2" :ref="'rc'+index" >
                    <div ref="card" class="from-card" id="form-card" >
                      <div class="opa-card" @click="cardSetting(index,index2)"></div>
                      <h3>{{card.title}}</h3>
                      <h5>{{analysisTime(card.duedate,true)+' '+ timeFormat(card.duedate)}}</h5><br/>
                     {{card.description}}<br/>{{card.status}}
                      <br/><br/>
                      difficulty : {{card.difficulty}}<br/>
                      
                      <button class="wrapperC btn-remove-card float-r " ><b-icon @click="removeCard(index,index2)" icon="trash" id="mov-r" font-scale='1.5'></b-icon></button> <br/>
                      <button class="wrapperC btn-edit-card float-r" ><b-icon @click="cardSetting(index,index2)" icon="gear" id="mov-r" font-scale='1.5'></b-icon></button>
                      
                    </div>
                    
                  </Draggable>
                </Container>
                </div>
              </div>
            </div>
        </div>
        <div v-for="(postit,i) in postits" :key="'fc'+i" :ref="'fc'" class="setting-card ">
          <div class="show-index"><p>card : {{i+1}}  |  title : {{postit.title}}  </p></div>
            <input class=" input-title" type="text" placeholder="Title" v-model="cardTiltleIn"  > <br/>
            <input  class="input-date float-r " type="date" id="datefield" min="2000-01-01" v-model="dateIn"><br/>
            <textarea class=" input-des " type="text" placeholder="Description" v-model="dessIn"></textarea><br/>
              <select class="status float-r " id="status" name="status">
                <option >Australia</option>
                <option >Canada</option>
                <option>USA</option>
              </select>
              <div class="contain-assign float-l " id="assign-scroll">
          <!-- <input class=" input-as "   type="text" placeholder="Assign"  > -->
          <button class="btn-as-ok float-r">ok</button>
          <select  class="assignS"  id="assign">
            <option >Austrssssssssssalia</option>
                <option >Canada</option>
                <option>USA</option>
          </select>
          </div>
            <div class="contain-vote float-r ">  
                  <p>vote this card</p>
                  <br/>
                  <ul id="rating" class="rating">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>  
            </div> 
          <div class="contain-btn-setting">
          <button class="btn-setting-accept" @click="createCard(i)" >Create</button>
          <button  class="btn-setting-cancel" @click="closeFormCard(i)">Cancel</button>
          </div>
          </div>

          <div v-for="(postit,i) in postits" :key="'xfc'+i" :ref="'xfc'">
            <div v-for="(card,j) in postit.card" :key="'efc'+i+'-'+j" :ref="'efc'+i" class="setting-card ">
              <p>index:{{j}} name:{{card.title}}  </p>
               <input class=" input-title" type="text" placeholder="Title" v-model="cardTiltleIn"  > <br/>
            <input  class="input-date float-r " type="date" id="datefield" min="2000-01-01" v-model="dateIn"><br/>
            <textarea class=" input-des " type="text" placeholder="Description" v-model="dessIn"></textarea><br/>
              <select class="status float-r " id="status" name="status">
                <option >Australia</option>
                <option >Canada</option>
                <option>USA</option>
              </select>
              <div class="contain-assign float-l " id="assign-scroll">
          <!-- <input class=" input-as "   type="text" placeholder="Assign"  > -->
          <button class="btn-as-ok float-r">ok</button>
          <select  class="assignS"  id="assign">
            <option >Austrssssssssssalia</option>
                <option >Canada</option>
                <option>USA</option>
          </select>
          </div>
            <div class="contain-vote float-r ">  
                  <p>vote this card</p>
                  <br/>
                  <ul id="rating" class="rating">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>  
            </div> 
          <div class="contain-btn-setting">
          <button class="btn-setting-accept" @click="saveCard(i)" >Save</button>
              <button  class="btn-setting-cancel" @click="closeEditFormCard(i)">Cancel</button>
          </div>
              
            </div>
          </div>

      </div>
    </div>
  </div>
</template>
<script  >
/* eslint-disable */
import { Container, Draggable } from "vue-smooth-dnd";
import _ from 'lodash'
import firebase from "firebase";
import {
  isOfflineForDatabase,
  isOnlineForDatabase
} from "../../db presets/presets";
import cardBox from "../boardPostit/cardBox";
export default {
  name: "boardPostit",
  components: {
    cardBox,
    Container,
    Draggable 
  },
  data() {
    return {
      project:[],
      postits:[],
      cards:[],

      cardTiltleIn:'',
      dessIn:'',
      dateIn:'',
      postitIn:'',
      postitInEdit:'',
      temp0:[],
      temp1:[
        {
          title:'test1',
          card:[]
        },
        { 
          title:'test2',
          card:[{description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date('5-20-20')) ,
                  status:"complete",title:'card1'}],
        },
        {
          title:'test3',
          card:[{description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card1'},
                {description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card2'},
                {description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card3'},
               ],
        },
        {
          title:'test4',
          card:[{description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card1'},
                {description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card2'},
                {description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card3'},
                {description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card4'},
                {description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card5'},
                {description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card6'},
                {description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card7'},
                {description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card8'},
                {description:'test',difficulty:3,duedate:firebase.firestore.Timestamp.fromDate(new Date()) ,
                  status:"complete",title:'card9'},
               ],
        }
      ],
      opts: [
              { value: 0, text: 'Menber in this board'},
              { value: 1, text: 'Fai' },
              { value: 2, text: 'Karn' },
              { value: 3, text: 'Ming' },
              { value: 4, text: 'Donaut' },
              { value: 5, text: 'Jade' },
              { value: 6, text: 'Punpun' },
            ],
    };
  },
  // this.postits.push({createBox:true,card:[]})
  mounted () {
    this.vuexUnsubscribe = this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      if(mutation.type === 'setProject'){
        const doc = state.project.filter(ele=>ele.pid===this.$store.state.pid)[0]
        if (doc) {
          // console.log(this.postits)
          this.project = doc
          this.postits = doc.postit.concat([{createBox:true,card:[]}])
          // this.postits = this.temp1
        }
      }
    })
    document.addEventListener('keyup',this.keyupCallback)
  },
  beforeDestroy(){
    this.vuexUnsubscribe()
  },
  methods: {
    feedbackPostit(){

    },
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        if(dropResult.removedIndex !== null){
          let found = this.postits.filter((p,i) => i === columnId)[0];
          found.card.splice(dropResult.removedIndex, 1);
        }
        if (dropResult.addedIndex !== null){
          let found = this.postits.filter((p,i) => i === columnId)[0];
          found.card.splice(dropResult.addedIndex, 0, dropResult.payload)
        }
      }
    },
    getCardPayload(id){
      let that = this;
      return function(index) {
        let found = that.postits.filter((p,i) => i  === id)[0].card[index];
        return found;
      }
    },
    swap(list, iA, iB){
      list[iA] = list.splice(iB, 1, list[iA])[0];
      return list;
    },
    movLeft (index) {
      this.postits= this.swap(this.postits,index,index-1)
      this.postits.pop()
      this.$db.collection('project').doc(this.project.pid).update({
        postit: this.postits
      })
    },
    movRight (index) {
      this.postits= this.swap(this.postits,index,index+1)
      this.postits.pop()
      this.$db.collection('project').doc(this.project.pid).update({
        postit: this.postits
      })
    },
    removeCard(index,index2) {
      this.postits[index].card = this.postits[index].card.filter((ele,i) => {
        return i !== index2
      })
    },
    cardSetting (index,indexC) {
      this.$refs['efc'+index].forEach((ele,i)=>{
        if(i != indexC){
          ele.classList.remove('show')
        } else {
          ele.classList.add('show')
        }
      })
      this.$refs['xfc'].forEach((ele,i)=>{
        if(i!=index){
          ele.style.display='none'
        } else {
          ele.style.display='block'
        }
      })
    },
    saveCard (index) {
      this.cards=[]
      this.temp1.forEach(element => {
        this.cards.push(element)
      });
      this.$refs['efc'+index].style.display='none'
    },
    closeEditFormCard (index) {
      let temp = ''
      this.$refs['efc'+index].forEach((ele,i)=>{
        ele.classList.remove('show')
        temp = ele
      })
      
    },
    toggleFormCard(index) {
      this.$refs.fc[index].classList.toggle('show')
      this.$refs.fc.forEach((ele,i)=>{
        if(i !== index){
          ele.classList.remove('show')
        }
      })
    },
    closeFormCard(index) {
      this.$refs.fc.forEach((ele,i)=>{
        ele.classList.remove('show')
      })
    },
    createCard (index) {
      this.cards=[]
      this.temp1.forEach(element => {
        this.cards.push(element)
      });
      this.$refs.settingCard[index].style.display='none'
    },
    deletePostit (index) {
      this.postits = this.postits.filter((ele,i) => {
        return i !== index 
      })
      this.postits.pop()
      this.$db.collection('project').doc(this.project.pid).update({
        postit: this.postits
      })
    },
    editPostit (index) {
      this.$refs.epsti.forEach((ele,i)=>{
        if(i===index){
          ele.style.display='block'
        } else {
          ele.style.display='none'
        }
      })
      this.$refs.npsti.forEach((ele,i)=>{
        if(i===index){
          ele.style.display='none'
        } else {
          ele.style.display='block'
        }
      })
      
    },
    saveEditPostit (index) {
      this.postits[index].title = this.postitInEdit
      this.postits.pop()
      this.$db.collection('project').doc(this.project.pid).update({
        postit: this.postits
      })
      // this.postits.push(null)
      // this.postits.pop()
      this.closeFormEditPostit(index)
    },
    closeFormEditPostit (index) {
        this.$refs.epsti.forEach((ele,i)=>{
        if(i===index){
          ele.style.display='none'
        } 
      })
      this.$refs.npsti.forEach((ele,i)=>{
        if(i===index){
          ele.style.display='block'
        } 
      })  
      this.postitInEdit=''
    },
    createPostit () {
      if(this.postitIn){
        this.$db.collection('project').doc(this.project.pid).update({
          postit: firebase.firestore.FieldValue.arrayUnion({
            title: this.postitIn,
            card: []
          })
        })
      } else {
        this.$db.collection('project').doc(this.project.pid).update({
          postit: firebase.firestore.FieldValue.arrayUnion({
            title: 'No Title',
            card: []
          })
        })
      }
      this.postitIn = ''
      // document.getElementById('form-input-postit').style.display='none'
    },
    timeFormat(n) {
      const time = n.toDate()
      const hours =
        time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
      const minutes =
        time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
      return hours + ":" + minutes
    },
    analysisTime(timestamp,n=false){
      const time = timestamp.toDate()
      const now = new Date()
      const yy = time.getFullYear()
      const mm = time.getMonth()
      const dd = time.getDate()
      const ny = now.getFullYear()
      const nm = now.getMonth()
      const nd = now.getDate()
      if(yy === ny && mm === nm && dd === nd){
        if(n){
          return 'Today'
        } else {
          return this.timeFormat(timestamp)
        }
      } else if(yy === ny && mm === nm && nd - dd === 1){
        return 'Yesterday'
      } else if(yy === ny) {
        if(n){
          return time.toString().substring(4,8) + ' ' + dd + '(' + time.toString().substring(0,3) + ')'
        } else {
          return time.toString().substring(4,8) + ' ' + dd + ', ' + yy
        }
      } else {
        return time.toString().substring(4,8) + ' ' + dd + ', ' + yy
      }
    },
    keyupCallback(e){
      e = e || window.event
      // console.log(e.keyCode)
      if(this.$refs.epsti){
        this.$refs.epsti.forEach((ele,i)=>{
          if(ele.style.display === 'block'){
            if(e.keyCode === 27){ //esc
              this.closeFormEditPostit(i)
            }
            if(e.keyCode === 13){ //enter
              this.saveEditPostit(i)
            }
          }
        })
      } 
    },
  }
}
</script>
<style scoped lang="scss">
@import "./boardPostitStyle.scss";
</style>