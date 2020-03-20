<template>
  <div id="chat">
    <h1>Chat</h1>
    <link rel="stylesheet" href="/chatStyle.scss" />

    <ul id="chatBox">
      <li v-for="(message,index) in messages" :key="index">
        <b>{{ message.sender }}</b> {{ ": " + message.message }} {{timeFormat(message.timestamp)}}
      </li>
    </ul>

    <div>
        <input type="text" placeholder="Type a message..." v-model.lazy="msg" v-on:keyup.enter="sendMessage" />
        <button  @click="sendMessage">Send</button>
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
  }
};
</script>

<style scoped lang="scss">
@import "./chatStyle.scss";
</style>
