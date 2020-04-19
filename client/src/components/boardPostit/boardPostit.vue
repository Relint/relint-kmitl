<template>
  <div>
    <div class="contain-boardPostit">
      <div class="form-scroll-postit" id="postit-scroll">
        <!-- <div class="from-boardPostit"> -->
            <div v-for="(postit , index) in postits.concat([{createBox:true,card:[]}])" :key="'pt-'+index" :ref="'psti'">
              <div v-if="postit.createBox" class="contain-show-postit noselect" v-bind:style="{left:10+(index)*290+(index)*30 + 'px',top:0+'px'  }">
                  <div class="form-input-postit">
                    <input class="input-postit" type="text" placeholder="add post-it" v-model="postitIn" v-on:keyup.enter="createPostit">
                    <div @click="createPostit" class="btn-create-postit"><b-icon class="center-icon" icon="plus" font-scale="3" ></b-icon></div>
                  </div>
              </div>
              <div v-else class="contain-show-postit noselect" v-bind:style="{left:10+(index)*290+(index)*30 + 'px',top:0+'px'  }">
                <div class="form-show-postit">
                  <div ref="epsti" style="height:43px;width:100%;display:none">
                    <div class="contain-input-edit">
                      <input id="einput"  class="input-edit-postit" type="text" v-model="postitInEdit" placeholder="Edit a title..."> 
                      <button class="btn-check " @click="saveEditPostit(index)"><b-icon icon="check" id="mov-l" font-scale='1.5'></b-icon></button>
                      <button class="btn-x " @click="closeFormEditPostit(index)"><b-icon icon="x" id="mov-r" font-scale='1.5'></b-icon></button>
                    </div>
                  </div>
                  <div ref="npsti" style="height:100%;width:100%;display:block">
                    <div style="height:43px;width:100%;">
                      <div class="show-postit-title float-l" @click="editPostit(index)">{{postit.title}}</div>
                      <button class="btn-x-postit float-r" @click="deletePostit(index)"><b-icon class="center-icon" icon="x" font-scale="2"></b-icon></button><br/>
                    </div>
                    <div style="height:27px;width:100%;">
                      <button class=" btn-move float-l  " v-if="index!=0" @click="movLeft(index)"><b-icon icon="chevron-compact-left" id="mov-l" font-scale='1.5'></b-icon></button>
                      <button class="disabled float-l " v-else><b-icon icon="chevron-compact-left" id="mov-l" font-scale='1.5'></b-icon></button>
                      <button class="btn-move float-r" v-if="index<postits.length-2" @click="movRight(index)"><b-icon icon="chevron-compact-right" id="mov-r" font-scale='1.5'></b-icon></button>
                      <button class=" disabled float-r " v-else><b-icon icon="chevron-compact-right" id="mov-r" font-scale='1.5'></b-icon></button>
                    </div>
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
                  <Draggable  v-for="(card , index2) in postit.card" :key="'kc'+index+'-'+index2" :ref="'rc'+index" class="form-card">
                    <div class="opa-card">
                      <div class="float-l" style="height: 39px;">
                        <div style="height:24px;">
                          <div class="card-checkbox float-l" @click="completeCard(index,index2)">
                            <img src="./check.png" alt="check" width="20" height="20" v-if="card.status==='Completed'">
                          </div>
                          <h3 class="float-l" @click="cardSetting(index,index2)">{{card.title?card.title:'Untitled'}}</h3>
                        </div>
                        <div @click="cardSetting(index,index2)" v-if="(((analysisTime(card.duedate,true) === 'No duedate') || (card.duedate.toDate() >= new Date())) && analysisTime(card.duedate,true) !== 'Today') || (card.status === 'Completed')" class="c-duedate normal">{{analysisTime(card.duedate,true)}}</div>
                        <div @click="cardSetting(index,index2)" v-else-if="analysisTime(card.duedate,true) === 'Today'" class="c-duedate">{{analysisTime(card.duedate,true)}}</div>
                        <div @click="cardSetting(index,index2)" v-else class="c-duedate late">{{analysisTime(card.duedate,true)}}</div>
                     </div>
                      <div class="float-l" @click="cardSetting(index,index2)" style="padding-left: 9px; height:39px;">
                        <button class="wrapperC btn-remove-card" style="margin-bottom: 5px;"><b-icon @click="removeCard(index,index2)" icon="trash" id="mov-r" font-scale='1.25'></b-icon></button>
                        <br/>
                        <button class="wrapperC btn-edit-card" ><b-icon @click="cardSetting(index,index2)" icon="gear" id="mov-r" font-scale='1.25'></b-icon></button>
                      </div>
                      <div class="float-l" style="padding-top: 10px;width: 246px" @click="cardSetting(index,index2)">
                        <div :ref="'rcdes'+index">
                          <div v-if="card.description && card.status !== 'Completed'">
                            <div class="card-des lock">{{card.description}}</div>
                            <br/>
                          </div>
                          <div v-else-if="card.description" style="font-size:12px;color:grey;">
                            <div class="card-des hidden">{{card.description}}</div>
                            [Hidden]
                          </div>
                        </div>
                        {{card.status}}
                        <br/>
                        <ul id="rating" class="rating small float-l"  style="margin-top: 5px; margin-bottom: 5px;" >
                          <li v-if="card.difficulty.some(ele=>ele.uid===$store.state.uid) && card.difficulty.filter(ele=>ele.uid===$store.state.uid)[0].vote > 4" class="fill-s"></li>
                          <li v-else class="fill-w"></li>
                          <li v-if="card.difficulty.some(ele=>ele.uid===$store.state.uid) && card.difficulty.filter(ele=>ele.uid===$store.state.uid)[0].vote > 3" class="fill-s"></li>
                          <li v-else class="fill-w"></li>
                          <li v-if="card.difficulty.some(ele=>ele.uid===$store.state.uid) && card.difficulty.filter(ele=>ele.uid===$store.state.uid)[0].vote > 2" class="fill-s"></li>
                          <li v-else class="fill-w"></li>
                          <li v-if="card.difficulty.some(ele=>ele.uid===$store.state.uid) && card.difficulty.filter(ele=>ele.uid===$store.state.uid)[0].vote > 1" class="fill-s"></li>
                          <li v-else class="fill-w"></li>
                          <li v-if="card.difficulty.some(ele=>ele.uid===$store.state.uid) && card.difficulty.filter(ele=>ele.uid===$store.state.uid)[0].vote > 0" class="fill-s"></li>
                          <li v-else class="fill-w"></li>
                        </ul>
                        <div class="contain-show-avg-card float-r" style="font-size:14px; margin-right:5px">Avg.&nbsp;{{(card.difficulty.map(val=>val.vote).reduce((sum,val)=>val+sum)/card.difficulty.length).toFixed(2)}}</div>
                        <hr>
                        <div class="show-assignee-container float-l" v-if="card.assignee.length > 0 && card.status !== 'Completed'">
                          <div class="float-l" v-for="(assignee,indexAs) in card.assignee" :key="'case-'+index+'-'+index2+'-'+indexAs">     
                            <div class="show-assi noselect" v-if="!analysisSender('photo',assignee.uid)">
                              <b-icon class="show-assi-p" icon="person" font-scale="1.75" shift-h="1.8" shift-v="-1.5"></b-icon>
                            </div>
                            <div class="show-assi noselect trans" v-else>
                              <img class="show-preview-sel" :src="analysisSender('photo',assignee.uid)">
                            </div>
                            <div class="name-show-assi greytext noselect">{{analysisSender('name',assignee.uid)}}</div>
                          </div>
                        </div>
                        <div v-else-if="card.assignee.length > 0" class="float-l" style="font-size:12px;color:grey;">
                          [Hidden]
                        </div>
                      </div><br>
                      <div class="float-l">
                        <div v-if="card.description && card.status !== 'Completed' && card.foldable" class="collapse-card-btn" @click="toggleLockCard(index,index2)">
                          <b-icon v-if="card.fold" class="center-icon" icon="chevron-compact-down" font-scale="1.5"></b-icon>
                          <b-icon v-else class="center-icon" icon="chevron-compact-up" font-scale="1.5"></b-icon>
                        </div>
                        <div v-else class="blank-card-btn"></div>
                      </div>
                    </div>
                  </Draggable>
                </Container>
                </div>
              </div>
            </div>
        <!-- </div> -->
        <div v-for="(postit,i) in postits" :key="'fc'+i" :ref="'fc'" class="setting-card ">
          <div class="show-index"><p>card : {{postit.card.length+1}}  |  title : {{postit.title}}  </p></div>
          <input class=" input-title" type="text" placeholder="Title" v-model="cardTiltleIn"  > <br/>
          <input  class="input-date float-r " type="date" ref="datefield" min="2000-01-01" v-model="dateIn"><br/>
          <textarea class=" input-des " type="text" placeholder="Description" v-model="dessIn"></textarea><br/>
          <select class="status float-r" ref="status" name="status" @change='onChange'>
            <option  v-for="(opt, indexOs) in optsStatus" :key="indexOs" :value="opt.value">
                  {{ opt.status }}
            </option>
          </select>
          <a class="greytext noselect">Assign</a>
          <div class="contain-assign float-l " id="assign-scroll">
            <div class="drop-des">
              <div @click="assignMember(i)" class="dropbtn-assi noselect float-l"><a>+</a></div>   
              <div class="assignee-container float-l">
                <div class="float-l" v-for="(assignee,indexAs) in temporaryAssignee" :key="'ase-'+i+'-'+indexAs">   
                  <div class="select-assi noselect default" v-if="!analysisSender('photo',assignee.uid)" @click="removeAssignee(assignee,indexAs)">
                    <b-icon class="select-assi-p" icon="person" font-scale="1.75" shift-h="1.8" shift-v="-1.5"></b-icon>
                    <b-icon class="select-assi-x" icon="x" font-scale="2" shift-h="0.65" shift-v="-0.65"></b-icon>
                  </div>
                  <div class="select-assi noselect trans " v-else @click="removeAssignee(assignee,indexAs)">
                    <img class="preview-sel" :src="analysisSender('photo',assignee.uid)">
                    <b-icon class="select-assi-x" icon="x" font-scale="2" shift-h="0.65" shift-v="-0.65"></b-icon>
                  </div>
                  <div class="name-select-assi greytext noselect">{{analysisSender('name',assignee.uid)}}</div>
                </div>
              </div>
              <div id="dd-content-assi" class="dropdown-content-assi" ref="copm" >
                <div v-for="(opt, indexOp) in project.member.filter(ele=>!temporaryAssignee.includes(ele))" :key="'opt-'+indexOp"  >
                  <a @click="selectMember(opt)" >{{ analysisSender('name',opt.uid) }}</a>
                </div>
              </div> 
            </div>
          </div>
          <div class="contain-vote float-r ">  
                <p>Vote this card</p>
                <br/>
                <ul id="rating" class="rating large">
                  <li v-if="voteIn > 4" class="fill-s" @click="setCrate(5)"></li>
                  <li v-else class="fill-w" @click="setCrate(5)"></li>
                  <li v-if="voteIn > 3" class="fill-s" @click="setCrate(4)"></li>
                  <li v-else class="fill-w" @click="setCrate(4)"></li>
                  <li v-if="voteIn > 2" class="fill-s" @click="setCrate(3)"></li>
                  <li v-else class="fill-w" @click="setCrate(3)"></li>
                  <li v-if="voteIn > 1" class="fill-s" @click="setCrate(2)"></li>
                  <li v-else class="fill-w" @click="setCrate(2)"></li>
                  <li v-if="voteIn > 0" class="fill-s" @click="setCrate(1)"></li>
                  <li v-else class="fill-w" @click="setCrate(1)"></li>
                </ul>
          </div> 
          <div class="contain-btn-setting">
            <button class="btn-setting-accept" @click="createCard(i)" >Create</button>
            <button  class="btn-setting-cancel" @click="closeFormCard(i)">Cancel</button>
          </div>
        </div>

          <div v-for="(postit,i) in postits" :key="'xfc'+i" :ref="'xfc'">
            <div v-for="(card,j) in postit.card" :key="'efc'+i+'-'+j" :ref="'efc'+i" class="setting-card ">
              <div class="show-index"><p>card : {{j}}  |  title : {{postit.title}}  </p></div>
              <input class=" input-title" type="text" placeholder="Title" v-model="cardTiltleIn"  > <br/>
              <input  class="input-date float-r " type="date" ref="datefield" min="2000-01-01" v-model="dateIn"><br/>
              <textarea class=" input-des " type="text" placeholder="Description" v-model="dessIn"></textarea><br/>
              <select class="status float-r" :ref="'status'+i" name="status" @change='onChange'>
                <option  v-for="(opt, indexOs) in optsStatus" :key="indexOs" :value="opt.value">
                      {{ opt.status }}
                </option>
              </select>
              <a class="greytext noselect">Assign</a>
              <div class="contain-assign float-l " id="assign-scroll">
                <div class="drop-des">
                  <div @click="assignMember2(i,j)" class="dropbtn-assi noselect float-l"><a>+</a></div>   
                  <div class="assignee-container float-l">
                    <div class="float-l" v-for="(assignee,indexAs) in temporaryAssignee2" :key="'ase-'+i+'-'+indexAs">     
                      <div class="select-assi noselect default" v-if="!analysisSender('photo',assignee.uid)" @click="removeAssignee2(assignee,indexAs)">
                        <b-icon class="select-assi-p" icon="person" font-scale="1.75" shift-h="1.8" shift-v="-1.5"></b-icon>
                        <b-icon class="select-assi-x" icon="x" font-scale="2" shift-h="0.65" shift-v="-0.65"></b-icon>
                      </div>
                      <div class="select-assi noselect trans" v-else @click="removeAssignee2(assignee,indexAs)">
                        <img class="preview-sel" :src="analysisSender('photo',assignee.uid)">
                        <b-icon class="select-assi-x" icon="x" font-scale="2" shift-h="0.65" shift-v="-0.65"></b-icon>
                      </div>
                      <div class="name-select-assi greytext noselect">{{analysisSender('name',assignee.uid)}}</div>
                    </div>
                  </div>
                  <div id="dd-content-assi" class="dropdown-content-assi" :ref="'copm'+i" >
                    <div v-for="(opt, indexOp) in project.member.filter(ele=>!temporaryAssignee2.map(ele2=>ele2.uid).includes(ele.uid))" :key="'opt-'+indexOp"  >
                      <a @click="selectMember2(i,opt)" >{{ analysisSender('name',opt.uid) }}</a>
                    </div>
                  </div> 
                </div>
              </div>
              <div class="contain-vote float-r ">  
                <p>Vote this card</p>
                <div class="contain-show-avg-sett" style="font-size:13px;">Average:&nbsp;{{analysisEstimatedVote(card).toFixed(2)}}</div>
                <br/>
                <ul id="rating" class="rating large">
                  <li v-if="voteIn > 4" class="fill-s" @click="setCrate(5)"></li>
                  <li v-else class="fill-w" @click="setCrate(5)"></li>
                  <li v-if="voteIn > 3" class="fill-s" @click="setCrate(4)"></li>
                  <li v-else class="fill-w" @click="setCrate(4)"></li>
                  <li v-if="voteIn > 2" class="fill-s" @click="setCrate(3)"></li>
                  <li v-else class="fill-w" @click="setCrate(3)"></li>
                  <li v-if="voteIn > 1" class="fill-s" @click="setCrate(2)"></li>
                  <li v-else class="fill-w" @click="setCrate(2)"></li>
                  <li v-if="voteIn > 0" class="fill-s" @click="setCrate(1)"></li>
                  <li v-else class="fill-w" @click="setCrate(1)"></li>
                </ul>  
              </div> 
              <div class="contain-btn-setting">
                <button class="btn-setting-accept" @click="saveCard(i,j)" >Save</button>
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
      users:[],
      postits:[],
      cards:[],

      temporaryPostits:[],

      temporaryAssignee:[],
      temporaryAssignee2:[],

      cardTiltleIn:'',
      dessIn:'',
      dateIn:'',
      statusIn:0,
      voteIn:0,
      voteVal: 0,

      postitIn:'',
      postitInEdit:'',
      
      optsStatus:[
        {value:0,status:'Not started'},
        {value:1,status:'In progress'},
        {value:2,status:'Completed'}
      ],

      notMove:false,
    };
  },
  mounted () {
    this.vuexUnsubscribe = this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      if(mutation.type === 'setProject'){
        const doc = state.project.filter(ele=>ele.pid===this.$store.state.pid)[0]
        if (doc) {
          // console.log(this.postits)
          this.project = doc
          this.postits = doc.postit
          this.analysisContentCard()
        }
      }
    })
    this.vuexUnsubscribe2 = this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      if(mutation.type === 'setUser'){
        this.users = state.user
      }
    })
    document.addEventListener('keyup',this.keyupCallbackBoardPostit)
  },
  beforeDestroy(){
    document.removeEventListener('keyup',this.keyupCallbackBoardPostit)
    this.vuexUnsubscribe()
    this.vuexUnsubscribe2()
  },
  methods: {
    analysisContentCard(){
      new Promise(resolve=>setTimeout(resolve,50)).then(()=>{
        for(let c = 0; c < this.postits.length; c+=1){
          if(this.$refs['rcdes'+c]){
            this.$refs['rcdes'+c].forEach((ele,i)=>{
              if(ele.children[0] && ele.children[0].children[0]){
                if(ele.children[0].children[0].scrollHeight > 80){
                  this.postits[c].card[i].foldable = true
                }else{
                  this.postits[c].card[i].foldable = false
                }
                this.postits[c].card[i].fold = true
              }
            })
          }
        }
        this.postits.push(null)
        this.postits.pop()
      })
    },
    toggleLockCard(index,index2){
      // console.log(index + ' ' + index2)
      if(this.$refs['rcdes'+index]){
        this.$refs['rcdes'+index].forEach((ele,i)=>{
          if(i === index2){
            // console.log(ele.innerHTML)
            if(ele.children[0] && ele.children[0].children[0]){
              ele.children[0].children[0].classList.toggle('lock')
            }
          }
        })
        // console.log(this.postits[index].card[index2].fold)
        this.postits[index].card[index2].fold = !this.postits[index].card[index2].fold
        this.postits.push(null)
        this.postits.pop()
      }
    },
    selectMember(memberPayload) {
      this.temporaryAssignee.push(memberPayload)
      this.$refs.copm.forEach((ele,i)=>{
          ele.classList.remove('showAs')
      })
    },
    selectMember2(index,memberPayload) {
      this.temporaryAssignee2.push(memberPayload)
      this.$refs['copm'+index].forEach((ele,i)=>{
          ele.classList.remove('showAs')
      })
    },
    removeAssignee(memberPayload,removedIndex){
      this.temporaryAssignee.splice(removedIndex,1)
    },
    removeAssignee2(memberPayload,removedIndex){
      this.temporaryAssignee2.splice(removedIndex,1)
    },
    assignMember (index) {
      this.$refs.copm[index].classList.toggle('showAs')
      this.$refs.copm.forEach((ele,i)=>{
        if(i !== index){
          ele.classList.remove('showAs')
        }
      })
    },
    assignMember2 (index,index2) {
      this.$refs['copm'+index][index2].classList.toggle('showAs')
      this.$refs['copm'+index].forEach((ele,i)=>{
        if(i !== index2){
          ele.classList.remove('showAs')
        }
      })
    },
    feedbackPostit(){
      this.postits.forEach((ele,i)=>{
        ele.card.forEach((ele2,j)=>{
          ele2.fold = true
        })
      })
      // console.log(this.postits)
      this.$db.collection('project').doc(this.project.pid).update({
        postit: this.postits
      })
    },
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        // clearTimeout(this.timeO)
        if(dropResult.removedIndex === dropResult.addedIndex){
          this.notMove = true
        }
        if(dropResult.removedIndex !== null){
          let found = this.postits.filter((p,i) => i === columnId)[0];
          found.card.splice(dropResult.removedIndex, 1);
        }
        if (dropResult.addedIndex !== null){
          let found = this.postits.filter((p,i) => i === columnId)[0];
          found.card.splice(dropResult.addedIndex, 0, dropResult.payload)
        }
      }
      if (columnId === this.postits.length-1  && this.notMove) {
        // console.log('notMove = true')
        this.notMove = false
      }
      else if(columnId === this.postits.length-1){
        // new Promise(resolve => this.timeO = setTimeout(resolve,50)).then(()=>{
          this.feedbackPostit()
          // console.log('feed')
        // })
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
      this.feedbackPostit()
    },
    movRight (index) {
      this.postits= this.swap(this.postits,index,index+1)
      this.feedbackPostit()
    },
    removeCard(index,index2) {
      this.postits[index].card = this.postits[index].card.filter((ele,i) => {
        return i !== index2
      })
      this.feedbackPostit()
    },
    cardSetting (index,indexC) {
      this.closeFormCard(index)
      for(let j = 0; j < this.postits.length; j+=1){
        if(this.$refs['status'+j]){
          this.$refs['status'+j].forEach((ele,k)=>{
            ele.selectedIndex = 0
          })
        }
        if(this.$refs['copm'+j]){
          this.$refs['copm'+j].forEach((ele,i)=>{
              ele.classList.remove('showAs')
          })
        }
      }
      this.$refs['efc'+index].forEach((ele,i)=>{
        if(i != indexC){
          ele.classList.remove('show')
        } else {
          ele.classList.add('show')
          const time = isNaN(this.postits[index].card[indexC].duedate.seconds)?null:this.postits[index].card[indexC].duedate.toDate()
          let yy='',mm='',dd=''
          if(time){
            yy = time.getFullYear()
            mm = time.getMonth()
            dd = time.getDate()
          }
          this.temporaryAssignee2 = this.postits[index].card[indexC].assignee.filter(ele=>ele)
          this.cardTiltleIn = this.postits[index].card[indexC].title
          this.dessIn = this.postits[index].card[indexC].description
          this.dateIn = time?(yy + '-' + (mm+1<10?'0'+(mm+1):mm+1) + '-' + (dd<10?'0'+dd:dd)):''
          this.statusIn = this.optsStatus.findIndex(ele=>this.postits[index].card[indexC].status===ele.status)
          if(this.$refs['status'+index]){
            this.$refs['status'+index].forEach((ele,k)=>{
              if(indexC === k){
                ele.selectedIndex = this.statusIn
              }
            })
          }
          this.voteIn = this.postits[index].card[indexC].difficulty.filter(ele=>ele.uid===firebase.auth().currentUser.uid)[0]?this.postits[index].card[indexC].difficulty.filter(ele=>ele.uid===firebase.auth().currentUser.uid)[0].vote:0
          this.postits.push(null)
          this.postits.pop()
        }
      })
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth()+1
      let yyyy = today.getFullYear()
      if(dd < 10) dd = '0'+dd
      if(mm < 10) mm = '0'+mm
      today = yyyy+'-'+mm+'-'+dd
      if(this.$refs.datefield){
        this.$refs.datefield.forEach((ele,i)=>{ele.setAttribute('min',today)})
      }
      this.$refs['xfc'].forEach((ele,i)=>{
        if(i!=index){
          ele.style.display='none'
        } else {
          ele.style.display='block'
        }
      })
    },
    saveCard (index,index2) {
      let diff = this.postits[index].card[index2].difficulty
      if(diff.some(ele=>ele.uid===firebase.auth().currentUser.uid)){
        diff.forEach(ele=>{
          if(ele.uid === firebase.auth().currentUser.uid){
            ele.vote = this.voteIn
          }
        })
      } else {
        diff.push({vote:this.voteIn,uid:firebase.auth().currentUser.uid})
      }
      this.postits[index].card[index2] = {
        description: this.dessIn,
        difficulty: diff,
        duedate: this.dateIn?firebase.firestore.Timestamp.fromDate(new Date(this.dateIn+'T23:59:59+07:00')):'',
        status: this.optsStatus[this.statusIn].status,
        title: this.cardTiltleIn,
        assignee: this.temporaryAssignee2
      }
      // console.log(this.postits[index].card[index2])
      this.feedbackPostit()
      this.closeEditFormCard(index)
    },
    closeEditFormCard (index) {
      if(this.$refs['efc'+index]){
        this.$refs['efc'+index].forEach((ele,i)=>{
          ele.classList.remove('show')
          this.temporaryAssignee = []
          this.cardTiltleIn = ''
          this.dessIn = ''
          this.dateIn = ''
          this.statusIn = 0
          this.voteIn = 0
          for(let j = 0; j < this.postits.length; j+=1){
            if(this.$refs['status'+j]){
              this.$refs['status'+j].forEach((ele,k)=>{
                ele.selectedIndex = 0
              })
            }
            if(this.$refs['copm'+j]){
              this.$refs['copm'+j].forEach((ele,i)=>{
                  ele.classList.remove('showAs')
              })
            }
          }
        })
      }
      
    },
    toggleFormCard(index) {
      this.closeEditFormCard(index)
      this.$refs.fc[index].classList.toggle('show')
      this.$refs.fc.forEach((ele,i)=>{
        if(i !== index){
          ele.classList.remove('show')
          this.temporaryAssignee = []
          this.cardTiltleIn = ''
          this.dessIn = ''
          this.dateIn = ''
          this.statusIn = 0
          this.voteIn = 0
          this.$refs.status.forEach((ele,k)=>{
            ele.selectedIndex = 0
          })
        }
      })

      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth()+1
      let yyyy = today.getFullYear()
      if(dd < 10) dd = '0'+dd
      if(mm < 10) mm = '0'+mm
      today = yyyy+'-'+mm+'-'+dd
      if(this.$refs.datefield){
        this.$refs.datefield.forEach((ele,i)=>{ele.setAttribute('min',today)})
      }
    },
    closeFormCard(index) {
      this.$refs.fc.forEach((ele,i)=>{
        ele.classList.remove('show')
        this.temporaryAssignee = []
        this.cardTiltleIn = ''
        this.dessIn = ''
        this.dateIn = ''
        this.statusIn = 0
        this.voteIn = 0
        this.$refs['status'].forEach((ele,k)=>{
          ele.selectedIndex = 0
        })
      })
    },
    createCard (index) {
      this.postits[index].card.push({
        description: this.dessIn,
        difficulty: [{vote:this.voteIn,uid:firebase.auth().currentUser.uid}],
        duedate: this.dateIn?firebase.firestore.Timestamp.fromDate(new Date(this.dateIn+'T23:59:59+07:00')):'',
        status: this.optsStatus[this.statusIn].status,
        title: this.cardTiltleIn,
        assignee: this.temporaryAssignee,
        foldable: false,
        fold: true,
        key: this.createKey()
      })
      this.feedbackPostit()
      this.closeFormCard(index)
    },
    deletePostit (index) {
      this.postits = this.postits.filter((ele,i) => {
        return i !== index 
      })
      this.feedbackPostit()
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
      this.postitInEdit = this.postits[index].title
    },
    saveEditPostit (index) {
      if(this.postitInEdit && this.postitInEdit != this.postits[index].title){
        this.postits[index].title = this.postitInEdit
        this.feedbackPostit()
      }
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
    createKey(){
      let keys = []
      this.postits.forEach((ele,i)=>{
        keys.push(ele.key)
        ele.card.forEach(ele2=>{
          keys.push(ele2.key)
        })
      })
      let key = ''
      do{
        key = this.$key.generate()
      }while(keys.includes(key))
      return key
    },
    createPostit () {
      const key = this.createKey()
      if(this.postitIn){
        this.$db.collection('project').doc(this.project.pid).update({
            postit: firebase.firestore.FieldValue.arrayUnion({
            key: key,
            title: this.postitIn,
            card: []
          })
        })
      } else {
        // console.log(this.postitIn)
        this.$db.collection('project').doc(this.project.pid).update({
            postit: firebase.firestore.FieldValue.arrayUnion({
            key: key,
            title: 'Edit Title',
            card: []
          })
        })
      }
      this.postitIn = ''
      // document.getElementById('form-input-postit').style.display='none'
    },
    timeFormat(n) {
      if(!n || isNaN(n.seconds)){
        return ''
      }
      const time = n.toDate()
      const hours =
        time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
      const minutes =
        time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
      return hours + ":" + minutes
    },
    analysisTime(timestamp,n=false){
      if(!timestamp || isNaN(timestamp.seconds)){
        return 'No duedate'
      }
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
    keyupCallbackBoardPostit(e){
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
    onChange(e) {
      let index = e.target.selectedIndex;
      this.statusIn = index
    },
    setCrate(vote){
      if(vote != this.voteIn){
        this.voteIn = vote
      } else {
        this.voteIn = 0
      }
    },
    completeCard(index,index2){
      // console.log(index + ' ' + index2)
      if(this.postits[index].card[index2].status != 'Completed'){
        this.postits[index].card[index2].status = 'Completed'
      } else {
        this.postits[index].card[index2].status = 'Not started'
      }
      this.feedbackPostit()
    },
    analysisEstimatedVote(card){
      if(card.difficulty.some(ele=>ele.uid===this.$store.state.uid)){
        return (card.difficulty.map(val=>val.vote).reduce((sum,val)=>val+sum) - card.difficulty.filter(ele=>ele.uid===this.$store.state.uid)[0].vote + this.voteIn)/card.difficulty.length
      } else {
        return (card.difficulty.map(val=>val.vote).reduce((sum,val)=>val+sum) + this.voteIn)/(card.difficulty.length + 1)
      }
    },
    analysisSender(type,uid){
      let sender = this.users.filter(ele=>ele.uid === uid)
      if(sender.length > 0){
        sender = sender[0]
        if(type === 'name'){
          return sender.displayName
        } else if(type === 'status'){
          // console.log(sender.displayName + ' online: ' + sender.online)
          return sender.online
        } else if(type === 'photo'){
          return sender.photoURL
        }
      }
      return null
    }
  }
}
</script>
<style scoped lang="scss">
@import "./boardPostitStyle.scss";
</style>