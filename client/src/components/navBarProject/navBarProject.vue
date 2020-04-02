<template>
<div>
    <div class="navbar-project-container">
        <title>{{projectName}}</title>
        <div class="wrapper float-l div-1">
            <b-icon  @click="backToHome" id="iconNBP" icon="house" font-scale="3"  ></b-icon>
        </div>
        <div class="wrapper float-l div-2">
            <div class="form-projectName"><h5>Title</h5>{{projectName}}</div>
        </div>
        <div class="wrapper float-l div-3">
            <div class="form-deadline"><h5>Deadline</h5>{{deadline}}</div>
        </div>
        <div class="wrapper float-r div-5">
            <b-icon font-scale="3" id="iconNBP" icon="inboxes-fill" @click="openFormMa"  ></b-icon>
        </div>
        <div class="wrapper float-r div-4">
            <b-icon  font-scale="3" id="iconNBP" icon="chat-fill" @click="openFormChat"   ></b-icon>
            <div class="float-l"> {{unreadIndex.length + leftUnread}} </div>
        </div>
        <br>
        <hr>
    </div>

    <div id="chat" class="dropdown-content-chat">
        <div class="dropdown-content-chat-margin">
            <div id="chatBox" @wheel="wheelie">
                <div v-for="(message,index) in messages" :key="index" :ref="'msg-ref-'+index"  class="relative-msg-border">
                <div v-if="message.prompt">
                    <div class="msg-prompt">{{ message.msg }}</div>
                </div>
                <div v-if="!checkUser(message.uid)" class="msg-border-min">
                    <button class="user-profile-left"><b-icon icon="person" font-scale="3"  ></b-icon></button>
                    <!-- <div class="msg-border-left"> -->
                    <div class="align-left">
                        <b class="margin-right">{{ message.sender }}</b>
                        <span><font size="1">{{timeFormat(message.timestamp)}}</font></span>
                    </div><br>
                    <div class="msg-box align-left">
                        <p class="msg-msg">{{message.message }}</p>
                    </div><br>
                    <!-- </div> -->
                </div>
                <div v-else class="msg-border-min">
                    <button class="user-profile-right"><b-icon icon="person" font-scale="3"  ></b-icon></button>
                    <!-- <div class="msg-border-right"> -->
                    <div class="align-right">
                        <span><font size="1">{{timeFormat(message.timestamp)}}</font></span>
                        <b class="margin-left">{{ message.sender }}</b>
                    </div><br>
                    <div class="msg-box align-right">
                        <p class="msg-msg">{{message.message }}</p>
                    </div><br>
                    <!-- </div> -->
                </div>
                </div>
            </div>
            
            <div>
                <div class="btn-wrapper">
                    <button class="msg-send-btn" @click="sendMessage">Send</button>
                    <button class="go-unread" id="unread-btn" @click="gotoUnread">New messages</button>
                    <button class="scroll-down" @click="scrollDown"><b-icon icon="chevron-down" font-scale="1"></b-icon></button>
                    <div class="msg-send-msg" @click="sendMessage">Shift-Enter</div>
                </div>
                <div class="input-box-msg-wrapper">
                    <textarea id="input-msg" class="input-box-msg" placeholder="Type a message..." @keyup="inputMsgHandler"></textarea>
                </div>
            </div>
        </div>
    </div>

    <div id="lds">
        <div class="lds-wrapper"></div>
        <div class="lds-dual-ring"></div>
    </div>
</div>
</template>
<script>
import firebase from "firebase";
export default {
    name:'navBarProject',
    components: {
    },
   data (){
    return {
      projectName: '',
      deadline : '',
      description: '',

      messages: [],
      log: [],
      msg: '',
      relativeScrollHeight: 0,
      unreadIndex: [],
      lastIndex: null,
      leftUnread: 0,
    }
   },
   beforeCreate () {
       this.$db.collection('project').doc(this.$store.state.pid).onSnapshot(doc=>{
           if(doc.exists){
                this.projectName = doc.data().title
                const time = doc.data().deadline.toDate()
                this.deadline = time.getDate() + '-' + (time.getMonth()+1) + '-' + time.getFullYear()
                this.description = doc.data().description

                this.unreadIndex = []
                this.$db.collection('user').get().then(snapshot => {
                    const users = []
                    snapshot.forEach(doc=>{
                    const data = doc.data()
                    data.uid = doc.id
                    users.push(data)
                    })
                    let chat = doc.data().chatLog
                    chat = chat.map((value,index) => {
                    const res = value
                    const uid = value.uid
                    const myUid = firebase.auth().currentUser.uid
                    if(uid === myUid){
                        res.sender =  firebase.auth().currentUser.displayName
                    } else {
                        res.sender = (users.filter(value=>value.uid === uid))[0].displayName
                    }
                    if(this.lastIndex && this.lastIndex === index){
                        res.prompt = true
                        res.msg = 'Unread messages below'
                        this.lastIndex = index
                    }
                    if(document.getElementById('chat') && document.getElementById('chat').style.display == 'block'){
                        if(!this.lastIndex){
                            //First in-line
                            if(!res.read.includes(firebase.auth().currentUser.uid) && !this.checkUser(res.uid)){
                                res.prompt = true
                                res.msg = 'Unread messages below'
                                this.lastIndex = index
                                document.getElementById('unread-btn').style.display = 'block'
                            }
                        } else {
                            //Next in-line
                        }
                    }
                    if(document.getElementById('chat') && document.getElementById('chat').style.display == 'none'){
                        if(!res.read.includes(firebase.auth().currentUser.uid) && !this.checkUser(res.uid)){
                            this.unreadIndex.push(index)
                        }
                    }
                    return res
                    })
                    this.log = doc.data().chatLog
                    this.messages = chat
                    new Promise(resolve => setTimeout(resolve, 500)).then(()=>{
                        this.setRelativeScrollHeight()
                    })
                })
           } else {
               this.$router.replace('/addBoard')
           }
       })
   },
   mounted(){
        document.getElementById('chat').style.display = 'none'
        document.getElementById('lds').style.display = 'block'
        new Promise(resolve => setTimeout(resolve, 2000)).then(()=>{
            document.getElementById('lds').style.display = 'none'
        })
   },
   methods: {
    backToHome () {
        this.$router.push('/addBoard')
    },
    openFormChat () {
        if(document.getElementById('chat').style.display === 'none'){
            document.getElementById('chat').style.display = 'block'
            this.setRelativeScrollHeight()
            this.goUnread()
        } else {
            document.getElementById('chat').style.display = 'none'
            if(this.lastIndex){
                for(let i = 0; i< this.messages.length - this.lastIndex; i+=1){
                    this.unreadIndex.push('dummy')
                }
                this.messages[this.lastIndex].prompt = false
            }
        }
    },
    openFormMa () {
        console.log('openFormMa')
    },

    sendMessage() {
      if(!this.msg){
        return
      }
      this.lastIndex = null
      const ref = this.$db.collection('project').doc(this.$store.state.pid)
      ref.get().then(doc => {
        let chat = doc.data().chatLog
        chat = chat.map(value => {
            if(!value.read.includes(firebase.auth().currentUser.uid) && !this.checkUser(value.uid)){
                value.read.push(firebase.auth().currentUser.uid)
            }
            return value
        }) 
        chat.push({
          message: this.msg,
          read: [],
          timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
          uid: firebase.auth().currentUser.uid,
        })
        ref.set({
          chatLog: chat
        },{merge:true}).then(()=>{
          const ms = 50*((this.msg.match(/\n/g) || []).length+1)
          new Promise(resolve => setTimeout(resolve,ms)).then(()=>{
            this.setRelativeScrollHeight()
            this.scrollDown()
          })
          this.msg = ''
          document.getElementById("input-msg").value = ''
        })
      })
    },
    timeFormat(n) {
      const time = n.toDate()
      const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
      const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
      return hours + ':' + minutes
    },
    checkUser(uid){
      return uid === firebase.auth().currentUser.uid
    },
    scrollDown(){
      document.getElementById("chatBox").scrollTop = document.getElementById("chatBox").scrollHeight
    },
    gotoUnread(){
        document.getElementById('unread-btn').style.display = 'none'
        this.goUnread()
    },
    inputMsgHandler(e) {
      if (e.keyCode === 13 && e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      } else {  
        this.msg = document.getElementById("input-msg").value
      }
    },
    setRelativeScrollHeight(){
      // this.messages = this.messages.map(())
        if(document.getElementsByClassName("relative-msg-border")){
            this.relativeScrollHeight = 0
            this.messages = this.messages.map((ele,index)=>{
                if(index !== 0 && index+1 !== this.messages.length){
                // console.log(document.getElementsByClassName("relative-msg-border")[index].scrollHeight)
                this.relativeScrollHeight += (document.getElementsByClassName("relative-msg-border")[index].scrollHeight)+5
                }
                ele.relativeScrollHeight = this.relativeScrollHeight 
                ele.height = document.getElementsByClassName("relative-msg-border")[index].scrollHeight
                return ele
            })
        }
      // console.log(this.messages.map(ele=>ele.relativeScrollHeight))
    },
    goUnread(){
      if(this.unreadIndex.length > 0){
        this.messages[this.unreadIndex[0]].prompt = true
        this.messages[this.unreadIndex[0]].msg = 'Unread messages below'
        document.getElementById("chatBox").scrollTop = this.messages[this.unreadIndex[0]].relativeScrollHeight - this.messages[this.unreadIndex[0]].height*2
        this.lastIndex = this.unreadIndex[0]

        this.log = this.log.map(value=>{
            if(!value.read.includes(firebase.auth().currentUser.uid) && !this.checkUser(value.uid)){
                value.read.push(firebase.auth().currentUser.uid)
            }
            return value
        })
        this.$db.collection('project').doc(this.$store.state.pid).set({
          chatLog: this.log
        },{merge:true})
      } else {
        this.lastIndex = null
        this.scrollDown()
      }
    },
    wheelie(){
        if(this.lastIndex){
            const relativeHeight = this.messages[this.lastIndex].relativeScrollHeight
            const height = this.messages[this.lastIndex].height
            const scrollPos = document.getElementById("chatBox").scrollTop
            if(scrollPos + height*10 > relativeHeight){
                new Promise(resolve => setTimeout(resolve, 1500)).then(()=>{
                    this.messages[this.lastIndex].prompt = false
                    this.lastIndex = null
                })
            }
        }
    },

   }
}
</script>
<style scoped lang="scss">
@import './navBarProjectStyle.scss';
</style>