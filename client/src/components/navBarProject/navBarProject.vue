<template>
  <div>
    <div class="navbar-project-container">
      <title>{{projectName}}</title>
      <div class="wrapper float-l div-1">
        <b-icon @click="backToHome" id="iconNBP" icon="house-fill" font-scale="3"></b-icon>
      </div>

      <div class="wrapper float-l div-2">
        <div class="form-projectName">
          <h5 class="noselect float-l">Title</h5>
           <button @click="editProjectName" id="btnP" > <img src="./pen.png" alt="pen" style="width:20px;hight:20px"></button><br>
           {{projectName}}
        </div>
        <div class="contain-input-edit" style="display:none; top:1px" id="editP">
          <input id="einput"  class="input-edit-postit" type="text" v-model="projectNameIn" placeholder="Edit a title..."  v-on:keyup.enter="saveProjectName" maxlength="15"> 
          <div class="contain-btn-edit">
            <button @click="saveProjectName" class="btn-check " ><b-icon icon="check" id="mov-l" font-scale='1.25'></b-icon></button><br>
            <button @click="closeEditPro" class="btn-x  " ><b-icon icon="x" id="mov-r" font-scale='1.25'></b-icon></button>
          </div>
        </div>
      </div>

      <div class="wrapper float-l div-3">
        <div class="form-deadline">
          <h5 class="noselect float-l">Deadline</h5>
          <button id="btnT" @click="editDeadline"> <img src="./pen.png" alt="pen" style="width:20px;hight:20px"></button><br>
          {{deadline}}
        </div>
        <div class="contain-input-edit" style="display:none; top:1px;" id="editT">
          <input id="einput"  class="input-edit-postit" type="date" v-model="deadlineIn"   v-on:keyup.enter="saveDeadline"> 
         <div class="contain-btn-edit">
            <button @click="saveDeadline" class="btn-check " ><b-icon icon="check" id="mov-l" font-scale='1.25'></b-icon></button><br>
            <button @click="closeEditPro" class="btn-x  " ><b-icon icon="x" id="mov-r" font-scale='1.25'></b-icon></button>
          </div>
        </div>
      </div>

      <div class="wrapper float-l div-4">
        <div class="form-des">
          <h5 class="noselect float-l">Description</h5>
          <button id="btnD" @click="editDescription"> <img src="./pen.png" alt="pen" style="width:20px;hight:20px"></button><br>
          <div class="drop-des">
          <footer class="rect2"></footer>
          <div class="dropbtn"> <b-icon id="iconNBP" icon="book" font-scale="1.5"></b-icon> </div>        
          <div class="dropdown-content-des">
              <a >{{description}}</a>
            </div> 
          </div>
        </div>
        <div class="contain-input-edit" style="display:none;top:1px;" id="editD">
          <input id="einput"  class="input-edit-postit" type="text" v-model="descriptionIn" placeholder="Edit a Description..."  v-on:keyup.enter="saveDescription" maxlength="150"> 
         <div class="contain-btn-edit">
            <button @click="saveDescription" class="btn-check " ><b-icon icon="check" id="mov-l" font-scale='1.25'></b-icon></button><br>
            <button @click="closeEditPro" class="btn-x  " ><b-icon icon="x" id="mov-r" font-scale='1.25'></b-icon></button>
          </div>
        </div>
      </div>
      
      <div class="wrapper float-r div-5">
        <img   src="./threeman.png" alt="pen" style="width:50px;hight:50px;cursor: pointer;" @click="openFormMa">
        
        <!-- <b-icon font-scale="3" id="iconNBP" icon="people-fill" @click="openFormMa"></b-icon> -->
      </div>


      
      
      <div class="contain-input-edit" style="display:none;left:160px;" id="editP">
        <input id="einput"  class="input-edit-postit" type="text" v-model="projectNameIn" placeholder="Edit a title..."  v-on:keyup.enter="saveProjectName"> 
        
        <div class="contain-btn-edit">
          <button @click="saveProjectName" class="btn-check " ><b-icon icon="check" id="mov-l" font-scale='1.25'></b-icon></button><br>
          <button @click="closeEditPro" class="btn-x  " ><b-icon icon="x" id="mov-r" font-scale='1.25'></b-icon></button>
        </div>
      </div>
      <div class="contain-input-edit" style="display:none;left:275px;" id="editT">
          <input id="einput" ref="dinput" class="input-edit-postit" type="date" min="2000-01-01" v-model="deadlineIn" placeholder="Edit a title..."  v-on:keyup.enter="saveDeadline"> 
         
         <div class="contain-btn-edit">
            <button @click="saveDeadline" class="btn-check " ><b-icon icon="check" id="mov-l" font-scale='1.25'></b-icon></button><br>
            <button @click="closeEditPro" class="btn-x  " ><b-icon icon="x" id="mov-r" font-scale='1.25'></b-icon></button>
          </div>
      </div>
      <div class="contain-input-edit" style="display:none;left:430px;" id="editD">
          <input id="einput"  class="input-edit-postit" type="text" v-model="descriptionIn" placeholder="Edit a title..."  v-on:keyup.enter="saveDescription"> 
         
         <div class="contain-btn-edit">
            <button @click="saveDescription" class="btn-check " ><b-icon icon="check" id="mov-l" font-scale='1.25'></b-icon></button><br>
            <button @click="closeEditPro" class="btn-x  " ><b-icon icon="x" id="mov-r" font-scale='1.25'></b-icon></button>
          </div>
      </div>

       


     <!-- <div class="wrapper float-r div-6">
        <div class="drop-des">
          <footer class="rect2"></footer>
          <div class="dropbtn"><b-icon font-scale="3" id="iconNBP" icon="gear-fill" ></b-icon></div>        
          <div class="dropdown-content-des">
              <a ></a>
             
            </div> 
          </div>
        </div> -->


     <div id="manage" style="display:none;">
       <div class="stage-parent">
                    <div class="stage-left">
                      <taskZone />
                    </div>
                    <div class="stage-right">
                      <userZone />
                    </div>
                  </div>
      </div>
      <br />
      <hr />
    </div>
 
    <!-- <div id="lds"> ห้ามลบ
      <div class="lds-wrapper"></div>
      <div class="lds-dual-ring"></div>
    </div> -->
    
  </div>
</template>
<script>
// eslint-disable-next-line 
import firebase from "firebase";
import taskZone from "../memberManageBoard/taskZone";
import userZone from "../memberManageBoard/userZone";
export default {
  name: "navBarProject",
  components: {
    taskZone,
    userZone
  },
  data() {
    return {
      projectNameIn: "",
      deadlineIn: "",
      descriptionIn: "",

      projectName: "",
      deadline: "",
      deadlineDateFormat: "",
      description: "",

      emailIn:'',
      authority:0,

      messages: [],
      log: [],
      msg: "",
      relativeScrollHeight: 0,
      unreadIndex: [],
      lastIndex: null,
      leftUnread: 0
    };
  },
  mounted() {
    document.getElementById("manage").style.display = "none"
    this.vuexUnsubscribe = this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'setProject'){
        const doc = state.project.filter(ele=>ele.pid===this.$store.state.pid)[0]
        if (doc) {
          // console.log(doc)
          this.projectName = doc.title;
          this.deadline = this.analysisTime(doc.deadline)
          this.description = doc.description;
        } else {
          this.$router.replace("/addBoard");
        }
      }
    })
    document.addEventListener('keyup',this.keyupCallback)
  },
  beforeDestroy(){
    this.vuexUnsubscribe()
  },
  methods: {
    saveProjectName () {
      if(this.projectNameIn && this.projectNameIn != this.projectName){
        this.$db.collection('project').doc(this.$store.state.pid).update({
          title: this.projectNameIn
        }).then(()=>{
          this.projectNameIn=''
        })
      }
      document.getElementById('editP').style.display='none'
      document.getElementById('btnP').disabled = false;
      document.getElementById('btnD').disabled = false;
      document.getElementById('btnT').disabled = false;
    },
    saveDeadline () {
      if(this.deadlineIn){
        this.$db.collection('project').doc(this.$store.state.pid).update({
          deadline: firebase.firestore.Timestamp.fromDate(new Date(this.deadlineIn+'T23:59:59+07:00'))
        }).then(()=>{
          this.deadlineIn=''
        })
      }
      document.getElementById('editT').style.display='none'
      document.getElementById('btnP').disabled = false;
      document.getElementById('btnD').disabled = false;
      document.getElementById('btnT').disabled = false;
    },
    saveDescription () {
      if(this.descriptionIn && this.descriptionIn != this.description){
        this.$db.collection('project').doc(this.$store.state.pid).update({
          description: this.descriptionIn
        }).then(()=>{
          this.descriptionIn=''
        })
      }
      document.getElementById('editD').style.display='none'
      document.getElementById('btnP').disabled = false;
      document.getElementById('btnD').disabled = false;
      document.getElementById('btnT').disabled = false;
    },
    editProjectName () {
      document.getElementById('btnP').disabled = false;
      document.getElementById('editP').style.display='block'
      document.getElementById('btnT').disabled = true;
      document.getElementById('btnD').disabled = true;
      this.projectNameIn = this.projectName
    },
    closeEditPro () {
      document.getElementById('editP').style.display='none'
      document.getElementById('editT').style.display='none'
      document.getElementById('editD').style.display='none'
      document.getElementById('btnP').disabled = false;
      document.getElementById('btnD').disabled = false;
      document.getElementById('btnT').disabled = false;
    },
    editDeadline () {
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth()+1
      const yyyy = today.getFullYear()
      if(dd < 10) dd = '0'+dd
      if(mm < 10) mm = '0'+mm
      today = yyyy+'-'+mm+'-'+dd
      this.$refs.dinput.setAttribute('min',today)
      document.getElementById('btnT').disabled = false;
      document.getElementById('editT').style.display='block'
      document.getElementById('btnP').disabled = true;
      document.getElementById('btnD').disabled = true;
      this.deadlineIn = this.deadlineDateFormat
    },
    editDescription () {
      document.getElementById('btnD').disabled = true;
      document.getElementById('editD').style.display='block'
      document.getElementById('btnT').disabled = true;
      document.getElementById('btnP').disabled = true;
      this.descriptionIn = this.description
    },
    backToHome() {
      this.$router.push("/addBoard");
    },
    openFormMa() {
      if (document.getElementById("manage").style.display === "none") {
        document.getElementById("manage").style.display = "block";
      }
      else {
        document.getElementById("manage").style.display = "none"
      }
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
    keyupCallback(e){
      e = e || window.event
      // console.log(e.keyCode)
      if(e.keyCode === 27){ //esc
        this.closeEditPro()
      }
    },
  }
};
</script>
<style scoped lang="scss">
@import "./navBarProjectStyle.scss";
</style>