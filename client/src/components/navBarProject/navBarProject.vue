<template>
  <div>
    <div class="navbar-project-container noselect">
      <title>{{projectName}}</title>
      <div class="wrapper float-l div-1">
        <b-icon @click="backToHome" id="iconNBP" icon="house-fill" font-scale="2.5"></b-icon>
      </div>

      <div class="wrapper float-l div-2 noselect">
        <div class="form-projectName">
          <h5 class="noselect float-l">Title</h5>
          <button @click="editProjectName" id="btnP" v-if="permission === 0"> <img src="./pen.png" alt="pen" style="width:20px;"></button>
          <button id="btnP-h" v-else></button>
          <br>
           {{projectName}}
        </div>
        <div class="contain-input-edit" style="display:none; top:1px" id="editP">
          <input class="input-edit-postit" type="text" v-model="projectNameIn" placeholder="Edit a title..."  v-on:keyup.enter="saveProjectName" maxlength="15"> 
          <div class="contain-btn-edit">
            <button @click="saveProjectName" class="btn-check " ><b-icon class="center-icon" icon="check" id="mov-l" font-scale='1.25'></b-icon></button><br>
            <button @click="closeEditPro" class="btn-x  " ><b-icon class="center-icon" icon="x" id="mov-r" font-scale='1.25'></b-icon></button>
          </div>
        </div>
      </div>

      <div class="wrapper float-l div-3 noselect">
        <div class="form-deadline">
          <h5 class="noselect float-l">Deadline</h5>
          <button id="btnT" @click="editDeadline" v-if="permission === 0"> <img src="./pen.png" alt="pen" style="width:20px;"></button>
          <button id="btnT-h" v-else></button>
          <br>
          <div v-if="(((analysisTime2(rawDeadline,true) === 'No duedate') || (rawDeadline.toDate() >= new Date())) && analysisTime2(rawDeadline,true) !== 'Today') || (status)" class="c-deadline normal">{{deadline}}</div>
          <div v-else-if="analysisTime2(rawDeadline,true) === 'Today'" class="c-deadline">{{deadline}}</div>
          <div v-else class="c-deadline late">{{deadline}}</div>
        </div>
        <div class="contain-input-edit" style="display:none; top:1px;" id="editT">
          <input id="datefield"  class="input-edit-postit" type="date" v-model="deadlineIn" min="2000-01-01" v-on:keyup.enter="saveDeadline"> 
         <div class="contain-btn-edit">
            <button @click="saveDeadline" class="btn-check " ><b-icon class="center-icon" icon="check" id="mov-l" font-scale='1.25'></b-icon></button><br>
            <button @click="closeEditPro" class="btn-x  " ><b-icon class="center-icon" icon="x" id="mov-r" font-scale='1.25'></b-icon></button>
          </div>
        </div>
      </div>

      <div class="wrapper float-l div-4 noselect">
        <div class="form-des">
          <h5 class="noselect float-l">Description</h5>
          <button id="btnD" @click="editDescription" v-if="permission === 0"> <img src="./pen.png" alt="pen" style="width:20px;"></button>
          <button id="btnD-h" v-else></button>
          <br>
          <div class="drop-des">
          <footer class="rect2"></footer>
          <div class="dropbtn"> <b-icon id="iconNBP" icon="book" font-scale="1.5"></b-icon> </div>        
          <div class="dropdown-content-des">
              <a >{{description}}</a>
            </div> 
          </div>
        </div>
        <div class="contain-input-edit" style="display:none;top:1px;" id="editD">
          <input class="input-edit-postit" type="text" v-model="descriptionIn" placeholder="Edit a Description..."  v-on:keyup.enter="saveDescription" maxlength="150"> 
         <div class="contain-btn-edit">
            <button @click="saveDescription" class="btn-check " ><b-icon class="center-icon" icon="check" id="mov-l" font-scale='1.25'></b-icon></button><br>
            <button @click="closeEditPro" class="btn-x  " ><b-icon class="center-icon" icon="x" id="mov-r" font-scale='1.25'></b-icon></button>
          </div>
        </div>
      </div>
      
      <div class="wrapper float-r div-5 noselect">     
        <img   src="./threeman.png" alt="pen" style="width:50px;hight:50px;cursor: pointer;" @click="openFormMa">
        <!-- <b-icon font-scale="3" id="iconNBP" icon="people-fill" @click="openFormMa"></b-icon> -->
      </div>
      <div class="wrapper div-6 float-r" v-if="permission === 0">
        <div class="toggle ">
          <input type="checkbox" name="toggle" class="check-checkbox" id="mytoggle" v-model="dummyStatus">
          <label class="check-label" for="mytoggle" @click="toggleStatus" >
            <div id="background"></div>
            <span class="face">
              <span class="face-container">
                <span class="eye left"></span>
                <span class="eye right"></span>
                <span class="mouth"></span>
              </span>
            </span>
          </label>
        </div>
        <div v-if="dummyStatus">
          <div class="status-ac noselect" style="cursor:pointer;">
              Active
          </div>
        </div>
        <div v-else>
          <div class="status-iac noselect" style="cursor:pointer;">
              Inactive
          </div>
        </div>
      </div>

      <br  />
      

    </div>
 
    <!-- <div id="lds"> ห้ามลบ
      <div class="lds-wrapper"></div>
      <div class="lds-dual-ring"></div>
    </div> -->
<hr />
    <div id="manage" >
       <boardManage/>
    </div>

  </div>
</template>
<script>
// eslint-disable-next-line 
import firebase from "firebase";
import boardManage from "../memberManageBoard/boardManage"
export default {
  name: "navBarProject",
  components: {
    boardManage
  },
  data() {
    return {
      projectNameIn: "",
      deadlineIn: "",
      descriptionIn: "",

      permission: "",
      rawDeadline: "",

      projectName: "",
      deadline: "",
      deadlineDateFormat: "",
      description: "",
      status: "",
      dummyStatus: "",

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
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()+1
    const yyyy = today.getFullYear()
    if(dd < 10) dd = '0'+dd
    if(mm < 10) mm = '0'+mm
    today = yyyy+'-'+mm+'-'+dd
    document.getElementById('datefield').setAttribute('min', today)

    document.getElementById("manage").style.display = "none"
    this.vuexUnsubscribe = this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'setProject'){
        const doc = state.project.filter(ele=>ele.pid===this.$store.state.pid)[0]
        if (doc) {
          // console.log(doc)
          this.projectName = doc.title;
          this.deadline = this.analysisTime(doc.deadline)
          this.rawDeadline = doc.deadline
          this.description = doc.description;
          this.permission = doc.permission
          this.status = doc.status
          this.dummyStatus = !this.status
        } else {
          this.$router.replace("/addBoard").catch(err=>{
            // eslint-disable-next-line
            console.log(err.message)
          })
        }
      }
    })
    document.addEventListener('keyup',this.keyupCallbackNavProj)
  },
  beforeDestroy(){
    document.removeEventListener('keyup',this.keyupCallbackNavProj)
    this.vuexUnsubscribe()
  },
  methods: {
    closeDropdownInManage(){
      document.querySelectorAll(".drop-permission").forEach(ele=>{
        ele.classList.remove('show')
      })
      document.querySelectorAll("#pri").forEach(ele=>{
        ele.classList.remove('hide')
      })
    },
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
      this.$router.push("/addBoard").catch(err=>{
        // eslint-disable-next-line
        console.log(err.message)
      })
    },
    openFormMa() {
      if (document.getElementById("manage").style.display === "none") {
        document.getElementById("manage").style.display = "block";
      }
      else {
        document.getElementById("manage").style.display = "none"
        this.closeDropdownInManage()
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
    keyupCallbackNavProj(e){
      e = e || window.event
      // console.log(e.keyCode)
      if(e.keyCode === 27){ //esc
        this.closeEditPro()
      }
    },
    analysisTime2(timestamp,n=false){
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
    toggleStatus(){
      this.$db.collection('project').doc(this.$store.state.pid).update({
          status: !this.status
        })
    }
  }
};
</script>
<style scoped lang="scss">
@import "./navBarProjectStyle.scss";
</style>