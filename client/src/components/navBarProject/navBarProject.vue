<template>
    <div>
        <div class="parent12">
    <div class="div1"> 
        <div class="div1"><a><b-icon  @click="backToHome" id="iconNBP" icon="house" font-scale="3"  ></b-icon></a></div>
    </div>
    
    <div class="div2"> 
        <div class="form-projectName"><h5>Title</h5>{{projectName}}</div>
    </div>
    <div class="div3">
         <div class="form-deadline"><h5>Deadline</h5>{{deadline}}</div>
    </div>
    <div class="div4"> 
        <b-icon  font-scale="3" id="iconNBP" icon="chat-fill" @click="openFormChat"   ></b-icon>
                
    </div>
    <div class="div5"> 
    <b-icon font-scale="3" id="iconNBP" icon="inboxes-fill" @click="openFormMa"  ></b-icon>
    </div>
     
</div>
<hr>
<chat id="chat"/>
    </div>
</template>
<script>
import chat from'../chat/chat.vue'
/* eslint-disable */
export default {
    name:'navBarProject',
    components: {
        chat
    },
   data (){
    return {
      projectName: '',
      deadline : '',
      description: '',
    }
   },
   beforeCreate () {
       this.$db.collection('project').doc(this.$store.state.pid).onSnapshot(doc=>{
           if(doc.exists){
               this.projectName = doc.data().title
               const time = doc.data().deadline.toDate()
               this.deadline = time.getDate() + '-' + (time.getMonth()+1) + '-' + time.getFullYear()
               this.description = doc.data().description
           } else {
               this.$router.replace('/addBoard')
           }
       })
   },
   methods: {
    backToHome () {
      this.$router.push('/addBoard')
    },
    openFormChat () {
        if(document.getElementById('chat').style.display === 'none'){
        document.getElementById('chat').style.display = 'block'
      } else {
        document.getElementById('chat').style.display = 'none'
      }
    },
    openFormMa () {
        console.log('openFormMa')
    }
   }
}
</script>
<style scoped>
@import './navBarProjectStyle.scss';

</style>