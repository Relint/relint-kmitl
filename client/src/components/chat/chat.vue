<template>
  <div id="chat" class="dropdown-content-chat">
    <div class="dropdown-content-chat-margin">
      <ul id="chatBox">
        <div v-for="(message,index) in messages" :key="index" :ref="'msg-ref-'+index"  class="relative-msg-border">
          <div v-if="!checkUser(message.uid)">
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
          <div v-else>
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
      </ul>
      
      <div>
        <div class="btn-wrapper">
          <button class="msg-send-btn" @click="sendMessage">Send</button>
          <button class="scroll-down" @click="scrollDown"><b-icon icon="chevron-down" font-scale="1"></b-icon></button>
          <div class="msg-send-msg" @click="sendMessage">Shift-Enter</div>
        </div>
        <div class="input-box-msg-wrapper">
          <textarea id="input-msg" class="input-box-msg" placeholder="Type a message..." @keyup="inputMsgHandler"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  name: "chat",
  data() {
    return {
      messages: [],
      msg: '',
      relativeScrollHeight: 0,
    };
  },
  mounted() {
    const ref = this.$db.collection('project').doc(this.$store.state.pid)
    ref.onSnapshot(doc=>{
      this.$db.collection('user').get().then(snapshot => {
        const users = []
        snapshot.forEach(doc=>{
          const data = doc.data()
          data.uid = doc.id
          users.push(data)
        })
        let chat = doc.data().chatLog
        chat = chat.map(value => {
          const res = value
          const uid = value.uid
          const myUid = firebase.auth().currentUser.uid
          if(uid === myUid){
            res.sender =  firebase.auth().currentUser.displayName
          } else {
            res.sender = (users.filter(value=>value.uid === uid))[0].displayName
          }
          return res
        })
        this.messages = chat 
      })
    })
    this.$store.subscribe((mutation, state) => {
        if(mutation.type === 'setOpenChat'){
          if(this.$store.state.openChat){
          new Promise(resolve => setTimeout(resolve,100)).then(()=>{
              this.setRelativeScrollHeight()
              this.goUnread()
              this.$store.commit('setOpenChat',false)
            })
          }
        }
      })
  },
  methods: {
    sendMessage() {
      if(!this.msg){
        return
      }
      const ref = this.$db.collection('project').doc(this.$store.state.pid)
      ref.get().then(doc => {
        const chat = doc.data().chatLog
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
          new Promise(resolve => setTimeout(resolve,ms+100)).then(()=>{
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
    inputMsgHandler(e) {
      if (e.keyCode === 13 && e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      } else {  
        this.msg = document.getElementById("input-msg").value
      }
    },
    setRelativeScrollHeight(){
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
      // console.log(this.messages.map(ele=>ele.relativeScrollHeight))
    },
    goUnread(){
      const height = this.messages.filter(value=>{
        return !value.read.includes(firebase.auth().currentUser.uid) && !this.checkUser(value.uid)
      })
      // console.log(height[0].relativeScrollHeight + ' ' + height[0].height )
      document.getElementById("chatBox").scrollTop = height[0].relativeScrollHeight - height[0].height
    },
  }
};
</script>

<style scoped lang="scss">
@import "./chatStyle.scss";
</style>
