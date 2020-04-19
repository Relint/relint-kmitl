<template>
    <div>
      <div class="navbar-container">
          <div class="navbarBorder ">
            <div class="wrapper float-l div-1">
              <li class="brand noselect" @click="openInNewTab('/')">RELINT</li>
            </div>

              <div class="wrapper float-r div-4" >
                <div class="drop-profile">
                  <footer class="rect2"></footer>
                  <button class="dropbtn default" v-if="!analysisSender('photo',$store.state.uid)">
                    <b-icon icon="person" font-scale="2.5"></b-icon>
                  </button>    
                  <button class="dropbtn trans" v-else>
                    <img class="preview-profile-nav" :src="analysisSender('photo',$store.state.uid)">
                  </button>          
                  <div class="dropdown-content-profile">
                    <h5 class="contain-showName">Hello, </h5>
                    <div class="showName">{{analysisSender('name',$store.state.uid)}}</div>
                    <hr >
                    <a @click="openFormProfile">Profile</a>
                    <a v-on:click="logout">Logout</a>
                  </div> 
                </div>
              </div>

            
              <div class="wrapper float-r div-3">
                <div class="drop-noti">
                  <div v-if="notifications.length > 0" class="notification float-l noselect">
                    {{notifications.length>=99?'99+':notifications.length}}
                  </div>                  
                  <footer class="rect"></footer>
                  <button class="dropbtn-noti float-l"><b-icon icon="bell" font-scale="2"  ></b-icon></button>
                  <footer class="dropdown-content-noti">
                    <div v-if="notifications.length === 0"><a><center>No notification</center></a></div>
                    <div v-else-if="notifications.length === 1"><a><center>1 notification</center></a></div>
                    <div v-else><a><center>{{notifications.length}} notifications</center></a></div>
                    <hr>
                    <div v-for="noti in notifications" :key="noti.pid">
                      <a>
                        <h3>{{noti.title}}</h3> 
                        <p>{{noti.description}}</p>
                        <p class="float-l">{{noti.timestamp}}</p><br>
                        <div class="contain-btnNoti float-r">
                          <button class="btn-T" @click="inviteAccept(noti.pid)"><b-icon class="center-icon" icon="check" font-scale="1"  ></b-icon></button>
                          <button class="btn-F" @click="inviteDecline(noti.pid)"><b-icon class="center-icon" icon="x" font-scale="1"  ></b-icon></button>
                        </div>
                      </a><hr>
                    </div>
                  </footer>
                </div>
              </div>  

              <div class="wrapper float-r div-5">
                <div class="drop-chat">
                  <div v-if="anaylysisNumber(unread).ans1" class="notification float-l noselect">
                    {{anaylysisNumber(unread).ans2}}
                  </div>    
                  <button class="dropbtn-chat float-l" @click="toggleFormChat"><b-icon class="center-icon" icon="chat" font-scale="2" shift-v="1"></b-icon></button>
                  <div class="dropdown-content-chat" id="chat-form">
                    <div class="chat-box float-r">
                      <li class="chat-brand noselect">RELINT</li>
                      <div class="chat-box-wrapper">
                          <div
                            v-for="(project,index) in projects"
                            :key="'box-'+project.pid"
                            :ref="'bprt'"
                            class="chat-container"
                            style="display:none"
                          >
                            <div class="chat-header">
                              <h5 class="noselect">{{project.title}}</h5>
                            </div>
                            <div class="chat-msg-area" ref="chma" v-on:scroll="wheelCallback(project,index)">
                              <div
                                v-for="(message,index2) in projects[index].chatLog"
                                :key="'kmsg'+index+'-'+index2"
                                :ref="'rmsg'+index"
                                class="relative-msg-border"
                              >
                                <div v-if="message.prompt">
                                  <div class="msg-prompt">{{ message.msg }}</div>
                                </div>
                                <div v-if="message.prompt2">
                                  <div class="msg-prompt2">Unread message below</div>
                                </div>
                                <div v-if="!checkUser(message.uid)" class="msg-border-min">
                                  <button class="user-profile-left default" v-if="!analysisSender('photo',message.uid)">
                                    <b-icon icon="person" font-scale="2.5"></b-icon>
                                  </button>
                                  <button class="user-profile-left trans" v-else>
                                    <img class="preview-profile" :src="analysisSender('photo',message.uid)">
                                  </button>
                                  <div class="float-l">
                                    <b  style="margin-right:2px">{{ analysisSender('name',message.uid) + '' }}</b>
                                    <b-icon v-if="analysisSender('status',message.uid)" style="color:green; margin-right:5px" icon="circle-fill" font-scale="0.4"></b-icon>
                                    <b-icon v-else style="color:#cccccc; margin-right:5px" icon="circle-fill" font-scale="0.4"></b-icon>
                                    <span>
                                      <font size="1">{{timeFormat(message.timestamp)}}</font>
                                    </span>
                                  </div>
                                  <br class="noselect">
                                  <div class="msg-box float-l">
                                    <p class="msg-msg">{{message.message }}</p>
                                  </div>
                                  <br class="noselect">
                                </div>
                                <div v-else class="msg-border-min">
                                  <button class="user-profile-right default-r" v-if="!analysisSender('photo',message.uid)">
                                    <b-icon icon="person" font-scale="2.5"></b-icon>
                                  </button>
                                  <button class="user-profile-right trans" v-else>
                                    <img class="preview-profile" :src="analysisSender('photo',message.uid)">
                                  </button>
                                  <div class="float-r">
                                    <span>
                                      <font size="1">{{timeFormat(message.timestamp)}}</font>
                                    </span>
                                    <b class="margin-left">{{ analysisSender('name',message.uid) + '' }}</b>
                                  </div>
                                  <br class="noselect">
                                  <div class="msg-box float-r">
                                    <p class="msg-msg">{{message.message }}</p>
                                  </div>
                                  <br class="noselect">
                                </div>
                              </div>
                            </div>
                            <div class="chat-footer">
                              <div ref="bmb">
                              <div class="b-message-btn" v-if="checkNewMessagePopup(project,index)"></div>
                              <div class="n-message-btn" v-if="checkNewMessagePopup(project,index)">{{project.chatLog[project.chatLog.length-1].message}}</div>
                              <div class="t-message-btn" v-if="checkNewMessagePopup(project,index)" @click="toNewMessage(project,index)"></div>
                              </div>
                              <div class="btn-wrapper">
                                <button class="msg-send-btn noselect" @click="sendMsgWrap(project,index)">Send</button>
                                <button class="scroll-down" ref="scrld" @click="scrollDown(project,index)">
                                  <b-icon icon="chevron-down" font-scale="1"></b-icon>
                                </button>
                              </div>

                              <textarea
                                ref="input-msg"
                                class="input-box-msg"
                                placeholder="Type a message..."
                              ></textarea>

                            </div>
                          </div>
                      </div>
                    </div>
                    <div class="chat-board float-r show" id="chat-board">
                      <div class="chat-board-container noselect">
                        <div 
                          v-for="(project,index) in projects"
                          :key="project.pid"
                          :ref="'prt'"
                          @click="openChat(project,index)"
                          class="chat-board-wrapper"
                          style="background-color:white;"
                        >
                          <a>
                            <h4>{{project.title}}</h4> 
                            <h5 class="float-l">{{'('+project.member.length+')'}}</h5>
                            <p class=" margin-r float-r" v-if="project.chatLog.length > 0">{{analysisTime(project.chatLog[project.chatLog.length-1].timestamp)}}</p>
                            <br>
                            <p v-if="project.chatLog.length > 0" class="chat-board-msg">{{project.chatLog[project.chatLog.length-1].message}}</p>
                            <br v-else>
                            <div v-if="unread[index] && unread[index] > 0" class="chat-board-unread">{{unread[index]>=99?'99+':unread[index]}}</div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <button class="slide-btn float-r" @click="toggleChatBoard">
                      <b-icon id="slide-out" icon="chevron-compact-left" font-scale="2" shift-h="-4.5"></b-icon>
                      <b-icon id="slide-in" icon="chevron-compact-right" font-scale="2" shift-h="-4.5"></b-icon>
                    </button>
                  </div>
                </div>
              </div>
          </div>
      </div>    
      <div id="form-profile">
      <profile/>
      </div>
  </div>
</template>
<script>
/* eslint-disable */
import firebase from "firebase"
import { isOfflineForDatabase, isOnlineForDatabase} from '../../db presets/presets'
import createBoard from '../createBoard/createBoard'
import boardPostit from '../boardPostit/boardPostit'
import profile from './profile'
export default {
  name: 'navBar',
  components: {
    profile
  },
  data (){
    return {
      notifications:[],

      projects:[],
      users:[],
      unread:[],
      lastIndex:[],
      msg:[],

      priorityMap: [
        'Admin',
        'Co-Admin',
        'Member'
      ],
    }
  },
  
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {    
        this.$rtdb.ref('/status/'+this.$store.state.uid).off();
        this.$rtdb.ref('/status/'+this.$store.state.uid).update(isOfflineForDatabase);
        this.$router.replace('/').catch(err=>{
          console.log(err.message)
        })
      }
    });
    this.collection = this.$db.collection('project').onSnapshot(snapshot => {
      // console.log('Snap!')
      this.notifications = []
      this.projects = []
      snapshot.forEach(doc => {
        if(doc.data().member){
          let proj = doc.data().invite.filter(value => {
            return value.uid === this.$store.state.uid
          })
          if(proj.length !== 0){
            let obj = {
              pid: doc.id,
              title: 'Invite from ' + doc.data().title,
              description: 'As ' + this.priorityMap[proj[0].priority],
              timestamp: this.analysisTime(proj[0].timestamp)
              // timestamp: proj[0].timestamp.toDate().getDate() + '-' + (proj[0].timestamp.toDate().getMonth()+1) + '-' + proj[0].timestamp.toDate().getFullYear()
            }
            this.notifications.push(obj)
          }
          
          let projmem = doc.data().member.filter(value => {
                return value.uid === this.$store.state.uid
          })
          if(projmem.length !== 0){
            let obj = doc.data()
            obj.pid = doc.id
            obj.permission = projmem[0].priority
            this.projects.push(obj)
          }
        }
      })
      this.$store.commit('setProject',this.projects)
      // console.log(this.projects)
      new Promise(resolve=>setTimeout(resolve,50)).then(()=>{
        this.projects.map((ele,index)=>{
          if((document && document.getElementById('chat-form').style.display === 'none') || (this.$refs.prt && this.$refs.prt.some((ele,i)=>ele.style.backgroundColor==='white'&&i===index))){
            let count = 0
            ele.chatLog.forEach((ele2,index2)=>{
              if(ele2.uid != this.$store.state.uid && !ele2.read.includes(this.$store.state.uid)){
                count+=1
              }
            })
            this.unread[index] = count
          } 
          ele.chatLog.forEach((ele2,index2)=>{
            if(index2 === 0){
              ele2.prompt = true
              ele2.msg = this.analysisTime(ele2.timestamp,true)
            } else { 
              const time = this.analysisTime(ele2.timestamp,true)
              const lastTime = this.analysisTime(ele.chatLog[index2-1].timestamp,true)
              if(time != lastTime){
                ele2.prompt = true
                ele2.msg = this.analysisTime(ele2.timestamp,true)
              }
            }
            // console.log(index2 + ' ' + this.lastIndex[index])
            if(this.lastIndex[index] && this.lastIndex[index] === index2){
              ele2.prompt2 = true
            } else {
              ele2.prompt2 = false
            }
          })
          return ele
        })
        this.projects.push(null)
        this.projects.pop()
        this.getIndex()
      })
    })
  },
  mounted () {
    document.getElementById('form-profile').style.display='none'
    document.addEventListener('keyup', this.keyupCallback)
    document.getElementById('chat-form').style.display = "none"
    const userStatusDatabaseRef = this.$rtdb.ref('/status/' + this.$store.state.uid)
    this.$rtdb.ref('.info/connected').on('value', snapshot => {
      if (snapshot.val() === false) {
        return
      }
      userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase).then(() => {
        userStatusDatabaseRef.update(isOnlineForDatabase)
      })
    })
    userStatusDatabaseRef.on('value', snapshot => {
      const stat = snapshot.val()
      if(stat){
        if(stat.online === false){
            userStatusDatabaseRef.update(isOnlineForDatabase)
        }
      }
    });
    this.$rtdb.ref('/status').on('value', snapshot => {
      // console.log('rtdb snap!')
      this.users = []
      snapshot.forEach((user,index)=>{
        if(user){
          const uid = user.key
          user = user.val()
          user.uid = uid
          this.users.push(user)
        }
      })
      this.projects.push(null)
      this.projects.pop()
      this.$store.commit('setUser',this.users)
    })
  },
  beforeDestroy(){
    document.removeEventListener('keyup', this.keyupCallback)
    this.collection()
    this.$rtdb.ref('/status/'+this.$store.state.uid).off()
    this.$rtdb.ref('/status').off()
    this.feedbackReadInterval()
    // clearInterval(this.feedInterval)
  },
  methods: {
    openFormProfile (){
        document.getElementById('form-profile').style.display='block'
    },
    logout () {
      firebase.auth().signOut()
    },
    closeFormHome () {
      document.getElementById("from-home").style.display = "none"
    },
    openFormHome () {
      document.getElementById("from-home").style.display = "block"
    },
    openFormPostit () {
      document.getElementById("from-post").style.display = "block"
    },
    closeFormPostit () {
      document.getElementById("from-post").style.display = "none"
    },
    toggleFormChat(){
      if(document.getElementById('chat-form').style.display === 'none'){
        document.getElementById('chat-form').style.display = 'block'
        // this.feedInterval = setInterval(this.feedbackReadInterval,1000)
      } else {
        if(this.$refs.bprt){
          this.$refs.bprt.forEach((ele,i)=>{
              if(ele.style.display === 'block'){
                this.feedbackRead(this.projects[i],i)
              }
          })
        }
        document.getElementById('chat-form').style.display = 'none'
        // clearInterval(this.feedInterval)
      }
    },
    inviteAccept (pid) {
      let projectRef = this.$db.collection('project').doc(pid)
      projectRef.get().then(doc => {
        if(doc.exists){
          let data = doc.data()
          let inviteRecord = data.invite.filter(ele=>ele.uid === this.$store.state.uid)
          inviteRecord = {
            priority: inviteRecord[0].priority,
            uid: inviteRecord[0].uid
          }
          data.member.push(inviteRecord)
          projectRef.update({
            invite: data.invite.filter(ele => ele.uid !== this.$store.state.uid),
            member: data.member,
          }).then(()=>{
            this.notifications = this.notifications.filter(noti => {
              return noti.pid !== pid
            })
          })
        }
      })
    },
    inviteDecline (pid) {
      let projectRef = this.$db.collection('project').doc(pid)
      projectRef.get().then(doc => {
        if(doc.exists) {
          let data = doc.data()
          projectRef.update({
            invite: data.invite.filter(ele => ele.uid !== this.$store.state.uid)
          }).then(()=>{
            this.notifications = this.notifications.filter(noti => {
              return noti.pid !== pid
            })
          })
        }
      })
    },
    openInNewTab(url){
      const win = window.open(url,'_blank')
      win.focus()
    },
    toggleChatBoard(){
      document.getElementById('chat-board').classList.toggle('show')
      document.getElementById('slide-in').classList.toggle('show')
      document.getElementById('slide-out').classList.toggle('show')
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
    openChat(project,index){
      // console.log(project.currentIndex)
      this.lastIndex[index] = project.currentIndex
      this.unread[index] = null
      this.projects[index].currentIndex = null
      if(this.lastIndex[index] && this.projects[index].chatLog.length > 0){
        this.projects[index].chatLog[this.lastIndex[index]].prompt2 = true
        this.projects.push(null)
        this.projects.pop()
      }
      this.$refs.prt.forEach((ele,i)=>{
        if(i != index){
          ele.style.backgroundColor = "white"
        } else {
          ele.style.backgroundColor = "#f1f1f1"
        }
      })
      this.$refs.bprt.forEach((ele,i)=>{
        if(i != index){
          if(ele.style.display === 'block'){
            this.feedbackRead(this.projects[i],i)
          }
          ele.style.display = 'none'
        } else {
          ele.style.display = 'block'
        }
      })
      
      new Promise(resolve => setTimeout(resolve, 50)).then(()=>{
        this.setRelativeScrollHeight(project,index)
        this.goUnread(project,index)
        this.wheelCallback(project,index)
      })
    },
    keyupCallback(e){
      e = e || window.event
      if(e.keyCode === 27){
        if(this.$refs.prt && this.$refs.bprt){
          if(this.$refs.bprt.some((ele,i)=>ele.style.display==='block')){
            this.$refs.prt.forEach((ele,i)=>{
              ele.style.backgroundColor = "white"
            })
            this.$refs.bprt.forEach((ele,i)=>{
              if(ele.style.display === 'block'){
                this.feedbackRead(this.projects[i],i)
              }
              ele.style.display = 'none'
            })
          } else if(document && document.getElementById('chat-form').style.display === 'block'){
            this.toggleFormChat()
          }
        }
      }
      if(this.$refs['input-msg']){
        this.$refs['input-msg'].forEach((ele,i)=>{
          if(ele === document.activeElement){
            if(!e.shiftKey && e.keyCode === 13){
              e.preventDefault()
              this.sendMsg(this.projects[i],i)
              // console.log('clear')
              this.msg[i] = ''
              ele.value = ''
            } else {
              this.msg[i] = ele.value
            }
          }
        })
      }
    },
    anaylysisNumber(arr){
      const ans1 = arr.reduce((a,b)=>a+b,0) > 0
      const ans2 = arr.reduce((a,b)=>a+b,0)>=99?'99+':arr.reduce((a,b)=>a+b,0)
      return {ans1:ans1, ans2:ans2}
    },
    getIndex(ms = 50){
      new Promise(resolve => setTimeout(resolve, ms)).then(()=>{
        this.projects.map((ele,index)=>{
          ele.currentIndex = null
          ele.chatLog.forEach((ele2,index2)=>{
            if(ele2.uid != this.$store.state.uid && !ele2.read.includes(this.$store.state.uid)){
              const closed = this.$refs.prt.some((ele,i)=>ele.style.backgroundColor==='white'&&i===index) || document.getElementById('chat-form').style.display === 'none'
              if(!ele.currentIndex && closed) {
                ele.currentIndex = index2
              }
            }
          })
          if(this.$refs.prt && !this.$refs.prt.some((ele,i)=>ele.style.backgroundColor==='white'&&i===index) && document.getElementById('chat-form').style.display === 'block'){
            if((this.$refs.scrld && this.$refs.scrld.some((ele,i)=>ele.style.display==='none'&&i===index)) || (ele.chatLog.length > 0 && this.checkUser(ele.chatLog[ele.chatLog.length-1].uid))){
              // console.log('scrolling down')
              this.scrollDown(ele,index)
            }
            if(this.$refs.bmb){
              this.$refs.bmb.forEach((ele,i)=>{
                if(index === i){
                  ele.style.display = 'block'
                }
              })
            }
          }
          return ele
        })
      })
    },
    checkUser(uid) {
      return uid === this.$store.state.uid;
    },
    timeFormat(n) {
      const time = n.toDate()
      const hours =
        time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
      const minutes =
        time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
      return hours + ":" + minutes
    },
    wheelCallback(project, index) {
      // console.log('Scroll at '+project.title + ' :'+index)
      new Promise(resolve => setTimeout(resolve,10)).then(()=>{
        const scrollTop = this.$refs.chma[index].scrollTop
        const scrollHeight = this.$refs.chma[index].scrollHeight
        const scrollBottom = scrollTop + this.$refs.chma[index].clientHeight
        // console.log(scrollHeight)
        // console.log('ScrollBottom: ' + scrollBottom)
        if(scrollBottom != scrollHeight){
          this.$refs.scrld[index].style.display = 'block'
          // console.log('Scrolldown button appears')
        } else {
          this.$refs.scrld[index].style.display = 'none'
          if(this.$refs.bmb){
            this.$refs.bmb.forEach((ele,i)=>{
              if(index === i){
                ele.style.display = 'none'
              }
            })
          }
          // console.log('Nothing')
        }
      })
    },
    scrollDown(project,index){
      this.$refs.chma.forEach((ele,i)=>{
        if(i === index){
          ele.scrollTop = ele.scrollHeight
        }
      })
    },
    toNewMessage(project,index){
      this.scrollDown(project,index)
      this.wheelCallback(project,index)
    },
    checkNewMessagePopup(project,index){
      if(project.chatLog.length > 0 && !project.chatLog[project.chatLog.length-1].read.includes(this.$store.state.uid) && !this.checkUser(project.chatLog[project.chatLog.length-1].uid)){
        return true
      }
      return false
    },
    setRelativeScrollHeight(project,index){
      // console.log(this.$refs['rmsg'+index])
      let relativeHeight = 0
      this.projects[index].chatLog.map((ele,i)=>{
        ele.height = this.$refs['rmsg'+index][i].scrollHeight + 5
        ele.relativeHeightTop = relativeHeight
        relativeHeight += ele.height
        ele.relativeHeightBottom = relativeHeight
        return ele
      })
      // console.log(this.projects[index].chatLog)
      // console.log(this.$refs.chma[index].scrollHeight)
    },
    goUnread(project,index){
      // const scrollTop = this.$refs.chma[index].scrollTop
      // const scrollHeight = this.$refs.chma[index].scrollHeight
      // const scrollBottom = scrollTop + this.$refs.chma[index].clientHeight
      //Bottom approch
      if(project.chatLog.length > 0 && this.lastIndex[index]){
        const data = project.chatLog[this.lastIndex[index]]
        let desiredPos = data.relativeHeightTop
        desiredPos -= this.$refs.chma[index].clientHeight / 2
        // console.log(desiredPos)
        this.$refs.chma[index].scrollTop = desiredPos
      } else{
        this.scrollDown(project,index)
      }
    },
    feedbackRead(project,index,n='none'){
      // console.log(project)
      let allRead = true
      project.chatLog.map((value,i)=>{
        delete value['prompt']
        delete value['prompt2']
        delete value['msg']
        delete value['height']
        delete value['relativeHeightTop']
        delete value['relativeHeightBottom']
        if(!value.read.includes(this.$store.state.uid) && !this.checkUser(value.uid)){
          value.read.push(this.$store.state.uid)
          allRead = false
        }
        return value
      })
      if(!allRead || n === 'send'){
        // console.log('Feeding data to Firestore')
        if(n==='none'){
          this.lastIndex[index] = null
        }
        new Promise(resolve=>setTimeout(resolve,50)).then(()=>{
          this.$db.collection("project").doc(project.pid).set({
            chatLog: project.chatLog
          },{ merge: true }).then(()=>{
            // console.log('done!')
          })
        })
      } else {
        // console.log('No need to feeding data to Firestore')
      }
      // console.log(project.chatLog)
    },
    feedbackReadInterval(){
      if(this.$refs.bprt){
        this.$refs.bprt.forEach((ele,i)=>{
          if(ele.style.display === 'block'){
            // console.log('Index '+i+' is opened')
            this.feedbackRead(this.projects[i],i,'interval')
          }
        })
      }
    },
    sendMsg(project,index){
      // console.log('Sending message of index: '+index)
      // console.log('msg: '+this.msg[index])
      if(this.msg[index]){
        // console.log('Condition satisfied')
        project.chatLog.push({
          message: this.msg[index],
          read:[],
          timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
          uid: this.$store.state.uid
        })
        this.feedbackRead(project,index,'send')
      } else {
        // console.log('Condition unsatisfied')
      }
    },
    sendMsgWrap(project,index){
      this.sendMsg(project,index)
      this.msg[index] = ''
      this.$refs.bprt.filter((ele,i)=>i===index).value = ''
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
<style lang="scss" scoped>
@import './navBarStyle.scss';
</style>