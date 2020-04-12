<template>
  <div>
    <div class="contain-show-project">
      <div class="form-scroll-createBoard" id="board-scroll"  @click="eventMouseUD" >
        <div class="from-createBoard">
          <div v-for="(project,index) in projects.filter(ele=>ele).sort((a,b)=>sortByStatus(a,b))" :key="project.pid"  > 
            <div id="container-Board" v-bind:style="{left: (index%2)*250+(index%2)*150 + 'px',top:(Math.floor(index/2))*300+70+(Math.floor(index/2))+'px'  }">
            <p class="pid-show">{{project.pid}}</p>
              <div class="dot two"></div>

              <div v-if="project.status===false">
                <div class="inactive"></div>
                <div  class="face">
                  <div class="eye"></div>
                  <div class="eye right"></div>
                  <div class="mouth happy"></div>
                </div>
              </div>
              <div v-else>
                <div class="active"></div>
                <div  class="face chang-color" >
                  <div class="eye"></div>
                  <div class="eye right"></div>
                  <div class="mouth happy"></div>
                </div>
              </div>
              <div class="shadow scale"></div>
              <div class="show-message">
                  <h1>{{project.title}}</h1>
                  <p> {{project.description}}</p><br class="noselect"> 
                  <p> {{analysisTime(project.deadline)}}</p><br class="noselect">
              </div>
              <div  v-if="project.permission">
                <button class="button-box left" @click="goBoardPostit(project.pid)"><p class="green noselect" >join</p></button>
                <button class="button-box1 right" @click="deleteBoard(project.pid)"><p class="green noselect" >delete</p></button>
              </div>
              <div v-else>
                <button class="button-box center" @click="goBoardPostit(project.pid)"><p class="green noselect" >join</p></button>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
    <div @click="openFormSetting" class="dd-button noselect"><a class="center-icon">+</a></div>
    <div class="dd-menu" id="form-setting"  >
      <div class="parent-setting">
        <div class="div1-s" ><input class="input-box-setting-pid" type="text" placeholder="Project Name (15 character)"  v-model="projectNameIn" maxlength="15"> </div>
        <div class="div2-s" ><textarea id="scroll-des" class="input-box-setting-des" type="text" placeholder="Description (150 character)" v-model="descriptionIn" maxlength="150"></textarea></div>
        <div class="div3-s" ><input class="input-box-setting-date" type="date" id="datefield" min="2000-01-01" v-model="deadlineIn"></div>
        <div class="div4-s" > 
        <div class="container-setting" id="style-scroll">
        <div v-for="invite in invites" :key="invite.uid" > 
          <div> 
            <div class="contain-obj-invite">{{ invite.email  }} <br>{{priorityMap[invite.data.priority] }}
            <button class="remove-invite" v-on:click="removeMenber(invite.uid)">remove</button></div>
          </div> 
        </div>  
          <div  id="form-invite" >
            <div >
              <input  class="input-box-setting-inv" type="text" placeholder="invite" v-model="emailIn" v-on:keyup.enter="addMember"  >
              <br class="noselect">
              <select @change='onChange' id='selector'  v-on:keyup.enter="addMember"  >
                <option  v-for="(opt, index) in opts" :key="index" :value="opt.value">
                  {{ opt.text }}
                </option>
              </select><br class="noselect">
              <button  class="btn-invite-ok noselect" v-on:click="addMember">ok</button>
            </div>
          </div> 
        </div>
      </div> 
    </div>
      <li>
        <button class="btn-setting-accept noselect" @click='createMainBoard' >Create</button>
        <button  class="btn-setting-cancel noselect" @click='closeFormSetting'>Cancel</button>
      </li>
    </div>            
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "firebase"
import { isOfflineForDatabase, isOnlineForDatabase} from '../../db presets/presets'
import navBarProject from '../navBarProject/navBarProject'

export default {
  name: 'createBoard',
  components: {
    navBarProject,
  },
  data () {
    return {
      projectNameIn:'',
      descriptionIn:'',
      deadlineIn:'',
      
      projects :[],
      users: [],

      emailIn:'',
      authority:0,
      invites: [],

      opts: [
        { value: 0, text: '-Choose Member Type-'},
        { value: 1, text: 'Co-Admin' },
        { value: 2, text: 'Member' },
      ],
      priorityMap: [
        'Admin',
        'Co-Admin',
        'Member'
      ],

      searchText: ''
    }
  },
  mounted () {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()+1
    let yyyy = today.getFullYear()
    if(dd < 10) dd = '0'+dd
    if(mm < 10) mm = '0'+mm
    today = yyyy+'-'+mm+'-'+dd
    document.getElementById('datefield').setAttribute('min', today)

    this.closeFormSetting()
    this.vuexUnsubscribe = this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'setProject'){
        this.projects = state.project
      }
    })
    this.vuexUnsubscribe2 = this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      if(mutation.type === 'setUser'){
        this.users = state.user
      }
    })
  },
  beforeDestroy(){
    this.vuexUnsubscribe()
    this.vuexUnsubscribe2()
  },
  methods: {
    //eventMouse U -D
    eventMouseUD () {
        const slider = document.querySelector('.form-scroll-createBoard')
        let isClickX = false
        let isClickY = false
        let startX
        let startY
        let scrollLeft
        let scrollTop 
        //click 
        if (slider){
        slider.addEventListener('mousedown', (e) => {
          isClickX = true;
          isClickY = true;
          slider.classList.add('active');

          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;

          startY = e.pageY - slider.offsetTop
          scrollTop = slider.scrollTop;
        });
        }
        // clicking
        if (slider){
        slider.addEventListener('mousemove', (e) => {
          if(!isClickX || !isClickY) return
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const Y = e.pageY - slider.offsetTop;
          const moveX = (x - startX) * 3; //fast
          const MoveY = (Y - startY) * 3; //fast
          slider.scrollLeft = scrollLeft - moveX;
          slider.scrollTop = scrollTop - MoveY;
        });
        }
        // no click
        if (slider){
        slider.addEventListener('mouseleave', () => {
          isClickX = false;
          isClickY = false;
          slider.classList.remove('active');
        });
        }
        
    },
    //project
    createMainBoard () {
      const ref = this.$db.collection('project')
      ref.doc('pindex').get().then(doc => {
        if(!this.deadlineIn){
          alert('Please select deadline')
          return
        }
        this.deadlineIn = firebase.firestore.Timestamp.fromDate(new Date(this.deadlineIn+'T23:59:59+07:00'))
        let pindex = doc.data()
        let pid = 'P' + pindex.count
        let obj = {
          title: this.projectNameIn,
          description: this.descriptionIn,
          deadline: this.deadlineIn,
          status: false,
          member: [
            {
              uid: firebase.auth().currentUser.uid,
              priority: 0
          }],
          invite:this.invites.map(ele => ele.data),
          chatLog: [],
          postit: [],
        }
        ref.doc(pid).set(obj)
        ref.doc('pindex').set({
          count: pindex.count+1,
          total: pindex.total+1
        },{merge: true})
        this.projectNameIn=''
        this.descriptionIn=''
        this.deadlineIn=''
        this.invites=[]
      })

      document.getElementById('form-setting').style.display ="none"
    },
    goBoardPostit (pid) {
      this.$store.commit('setSelectedPID',pid)
      this.$router.push('/addBoardPostit')
    },
    deleteBoard (pid) {
      let ref = this.$db.collection('project')
      if(confirm('Delete this board? The deleted board cannot be restored.')){
        ref.doc(pid).delete().then(()=>{
          ref.doc('pindex').get().then(doc=>{
            let data = doc.data()
            ref.doc('pindex').set({
              total: data.total-1
            },{merge:true})
          })
        }).catch(err=>{
          alert(err)
        })
      }
    },
    openFormSetting () {
      if(document.getElementById('form-setting').style.display === 'none'){
        document.getElementById('form-setting').style.display = 'block'
      } else {
        document.getElementById('form-setting').style.display = 'none'      
        this.projectNameIn=''
        this.descriptionIn=''
        this.deadlineIn=''
        this.invites = []
      }
        
    },
    closeFormSetting () {
      document.getElementById('form-setting').style.display ="none"
      this.projectNameIn=''
      this.descriptionIn=''
      this.deadlineIn=''
      this.invites = []
    }, 


    //invite
    openFormInvite () {
      document.getElementById('form-invite').style.display="block"
    },
    verifyMember(email){
      const matched = this.users.filter((ele,i)=>{
        return ele.email === email
      })
      return matched[0]
    },
    addMember () {
      if(!this.authority){
        alert('Please Choose Member Type')
        return
      } 
      const res = this.verifyMember(this.emailIn)
      if(res){
        if(res.uid === firebase.auth().currentUser.uid){
          alert('You invited yourself.')
          this.emailIn = ''
          document.getElementById('selector').selectedIndex = 0
          this.authority=0
          return
        }
        let check = this.invites.filter(ele => ele.data.uid === res.uid)
        if(check.length !== 0){
          alert('Duplicate user invited')
          this.emailIn = ''
          document.getElementById('selector').selectedIndex = 0
          this.authority=0
          return
        }
        this.invites.push({ 
                          data:{
                                priority:this.authority,
                                uid: res.uid,
                                timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                                },
                          email:this.emailIn
                        })
        this.emailIn = ''
        document.getElementById('selector').selectedIndex = 0
        this.authority=0
      }else{
        alert('User doesn\'t exist')
        document.getElementById('selector').selectedIndex = 0
        this.authority=0
      }
    },
    removeMenber (uid) {
         this.invites = this.invites.filter(invite => {
         return invite.uid !== uid
         })
    },
    onChange(e) {
      let index = e.target.selectedIndex;
      this.authority = index
    },
    sortByStatus(a,b){
      const as = a.status
      const bs = b.status
      if ( as && bs ){
        if(a.pid.substring(1,a.pid.length) > b.pid.substring(1,b.pid.length)) return 1
        if(a.pid.substring(1,a.pid.length) < b.pid.substring(1,b.pid.length)) return -1
      }else if(as || bs){
        if(as) return 1
        if(bs) return -1
      }
      return 0
    },
    /* eslint-disable */
    analysisTime(timestamp,n=false){
      let time = ''
      if(!n){
        time = timestamp.toDate()
      } else {
        time = timestamp
      }
      const now = new Date()
      const yy = time.getFullYear()
      const mm = time.getMonth()
      const dd = time.getDate()
      const ny = now.getFullYear()
      const nm = now.getMonth()
      const nd = now.getDate()
      this.deadlineDateFormat = yy + '-' + (mm+1<10?'0'+(mm+1):mm+1) + '-' + (dd<10?'0'+dd:dd)
      return time.toString().substring(4,8) + ' ' + dd + ', ' + yy
    },
  }
  
  
  
}
</script>
<style scoped lang="scss" >
@import './createBoardStyle.scss'
</style>