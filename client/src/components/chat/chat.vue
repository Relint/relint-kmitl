<template>
  <div id="chat" class="dropdown-content-chat">
    <div class="dropdown-content-chat-margin">
      <ul id="chatBox">
        <li v-for="(message,index) in messages" :key="index">
          <div v-if="!checkUser(message.uid)" class="relative-msg-border">
            <button class="user-profile-left"><b-icon icon="person" font-scale="3"  ></b-icon></button>
            <div class="msg-border-left">
              <b class="align-left">
                {{ message.sender }}
              </b><br> 
              <div>
                <div class="msg-box"> {{message.message }}</div>
                <div class="align-right"><font size="1">{{timeFormat(message.timestamp)}}</font></div>
              </div>
            </div>
          </div>
          <div v-else class="relative-msg-border">
            <button class="user-profile-right"><b-icon icon="person" font-scale="3"  ></b-icon></button>
            <div class="msg-border-right">
              <b class="align-right">
                {{ message.sender }}
              </b><br> 
              <div>
                <div class="msg-box"> {{message.message }}</div>
                <div class="align-left"><font size="1">{{timeFormat(message.timestamp)}}</font></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      
      <div>
          <input type="text" class="input-box-msg" placeholder="Type a message..." v-model.lazy="msg" v-on:keyup.enter="sendMessage" />
          <button class="msg-send-btn" @click="sendMessage"><b-icon icon="chevron-up" font-scale="2"></b-icon></button>
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
    };
  },
  beforeCreate() {
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
          this.msg = ''
          this.$nextTick(() => {
            const messageBox = document.getElementById("chatBox")
            messageBox.scrollTop = messageBox.scrollHeight;
          });
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
    }
  }
};
</script>

<style scoped lang="scss">
@import "./chatStyle.scss";
</style>
