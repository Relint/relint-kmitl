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
      </div>
      <div class="wrapper float-l div-3">
        <div class="form-deadline">
          <h5 class="noselect float-l">Deadline</h5>
          <button id="btnT" @click="editDeadline"> <img src="./pen.png" alt="pen" style="width:20px;hight:20px"></button><br>
          {{deadline}}
        </div>
      </div>
      <div class="wrapper float-l div-4">
        <div class="form-des">
          <h5 class="noselect float-l">Description</h5>
          <button id="btnD" @click="editDescription"> <img src="./pen.png" alt="pen" style="width:20px;hight:20px"></button><br>
          {{description}}
        </div>
      </div>
      
      <div class="wrapper float-r div-5">
        <img   src="./threeman.png" alt="pen" style="width:50px;hight:50px;cursor: pointer;" @click="openFormMa">
        
        <!-- <b-icon font-scale="3" id="iconNBP" icon="people-fill" @click="openFormMa"></b-icon> -->
      </div>


      
      
      <div class="contain-input-edit" style="display:none;left:160px;" id="editP">
        <input id="einput"  class="input-edit-postit" type="text" v-model="projectNameIn" placeholder="Edit a title..."> 
        
        <div class="contain-btn-edit">
          <button @click="saveProjectName" class="btn-check " ><b-icon icon="check" id="mov-l" font-scale='1.25'></b-icon></button><br>
          <button @click="closeEditPro" class="btn-x  " ><b-icon icon="x" id="mov-r" font-scale='1.25'></b-icon></button>
        </div>
      </div>
      <div class="contain-input-edit" style="display:none;left:275px;" id="editT">
          <input id="einput"  class="input-edit-postit" type="date" v-model="deadlineIn" placeholder="Edit a title..."> 
         
         <div class="contain-btn-edit">
            <button @click="saveDeadline" class="btn-check " ><b-icon icon="check" id="mov-l" font-scale='1.25'></b-icon></button><br>
            <button @click="closeEditPro" class="btn-x  " ><b-icon icon="x" id="mov-r" font-scale='1.25'></b-icon></button>
          </div>
      </div>
      <div class="contain-input-edit" style="display:none;left:430px;" id="editD">
          <input id="einput"  class="input-edit-postit" type="text" v-model="descriptionIn" placeholder="Edit a title..."> 
         
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
              <a ><textarea type="text" placeholder="Edit Project Name..."></textarea></a>
              <a ><textarea type="text" placeholder="Edit DEscription..."></textarea></a>
              <a ><input type="date" placeholder="Edit Deadline..."></a>
              <a > <button>save</button><button>cancel</button></a>
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
      description: "",
      projects :[],

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
  },
  methods: {
    saveProjectName () {
      this.projectName=this.projectNameIn
      this.projectNameIn=''
      // const ref = this.$db.collection('project')
      // ref.doc('pindex').get().then(doc => {
      //   const pindex = doc.data()
      //   const pid = 'P' + pindex.count
      //   const obj = {
      //     title: this.projectNameIn,
      //     status: false,
      //   }
      //   ref.doc(pid).set(obj)
      //   ref.doc('pindex').set({
      //     count: pindex.count+1,
      //     total: pindex.total+1
      //   },{merge: true})
      //   this.projectNameIn=''
      // })
        
      document.getElementById('editP').style.display='none'
      document.getElementById('btnP').disabled = false;
      document.getElementById('btnD').disabled = false;
      document.getElementById('btnT').disabled = false;
    },
    saveDeadline () {
      this.deadline=this.deadlineIn
      this.deadlineIn=''
      // const ref = this.$db.collection('project')
      // ref.doc('pindex').get().then(doc => {
      //   this.deadlineIn = firebase.firestore.Timestamp.fromDate(new Date(this.deadlineIn+'T00:00:00+07:00'))
      //   const pindex = doc.data()
      //   const pid = 'P' + pindex.count
      //   const obj = {
      //     deadline: this.deadlineIn,
      //     status: false
      //   }
      //   ref.doc(pid).set(obj)
      //   ref.doc('pindex').set({
      //     count: pindex.count+1,
      //     total: pindex.total+1
      //   },{merge: true})
      //   this.deadlineIn=''
      // })
       
      document.getElementById('editT').style.display='none'
      document.getElementById('btnP').disabled = false;
      document.getElementById('btnD').disabled = false;
      document.getElementById('btnT').disabled = false;
    },
    saveDescription () {
      this.description=this.descriptionIn
      this.descriptionIn=''
      // const ref = this.$db.collection('project')
      // ref.doc('pindex').get().then(doc => {
      //   const pindex = doc.data()
      //   const pid = 'P' + pindex.count
      //   const obj = {
      //     description: this.descriptionIn,
      //     status: false,
      //   }
      //   ref.doc(pid).set(obj)
      //   ref.doc('pindex').set({
      //     count: pindex.count+1,
      //     total: pindex.total+1
      //   },{merge: true})
      //   this.descriptionIn=''
      // })
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
        
    },
    editDescription () {
      document.getElementById('btnD').disabled = true;
      document.getElementById('editD').style.display='block'
      document.getElementById('btnT').disabled = true;
      document.getElementById('btnP').disabled = true;
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
      const time = timestamp.toDate()
      const now = new Date()
      const yy = time.getFullYear()
      const mm = time.getMonth()
      const dd = time.getDate()
      const ny = now.getFullYear()
      const nm = now.getMonth()
      const nd = now.getDate()
      return time.toString().substring(4,8) + ' ' + dd + ', ' + yy
    },
  }
};
</script>
<style scoped lang="scss">
@import "./navBarProjectStyle.scss";
</style>