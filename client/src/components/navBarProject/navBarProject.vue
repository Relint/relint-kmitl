<template>
  <div>
    <div class="navbar-project-container">
      <title>{{projectName}}</title>
      <div class="wrapper float-l div-1">
        <b-icon @click="backToHome" id="iconNBP" icon="house" font-scale="3"></b-icon>
      </div>
      <div class="wrapper float-l div-2">
        <div class="form-projectName">
          <h5 class="noselect">Title</h5>
          {{projectName}}
        </div>
      </div>
      <div class="wrapper float-l div-3">
        <div class="form-deadline">
          <h5 class="noselect">Deadline</h5>
          {{deadline}}
        </div>
      </div>
      
      <div class="wrapper float-r div-5">
        <b-icon font-scale="3" id="iconNBP" icon="people-fill" @click="openFormMa"></b-icon>
      
      </div>
     
     <div id="manage">
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
      projectName: "",
      deadline: "",
      description: "",
    };
  },
  mounted() {
    document.getElementById("manage").style.display = "none"
    this.$store.subscribe((mutation, state) => {
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