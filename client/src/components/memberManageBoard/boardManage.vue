
<template>
  <!-- eslint-disable -->
  <div>
    <div class="contain-manage">
      <div class="bgTrans"></div>
      <div class="form-manage">
        <div  class="stage-l" id="scroll-task">
          <div v-if="project">
            <div v-for="(task,indexT) in project.member" :key="'task'+indexT" :ref="'task'">
              <!-- .some -->
              <div
                class="member-task"
                v-bind:style="{left:5+(indexT)*290+(indexT)*40 + 'px',top:20+'px' }"
              >
                <div class="userBoxInTask-parent">
                  <div class="top">
                    <h3 id="userName">{{analysisSender('name',task.uid)}}</h3>
                  </div>
                  <div id="email">
                    <p>{{analysisSender('email',task.uid)}}</p>
                  </div>

                  <br />
                  <div class="bot">
                    <p id="priority" v-if="project.member.filter(ele=>ele.uid===task.uid)[0]">{{priorityMap[project.member.filter(ele=>ele.uid===task.uid)[0].priority]}}</p>
                  </div>
                </div>
                  
                <div  class="scroll-jobs" id="scroll-jobs"  >
                  <div 
                    v-for="(job,indexJ) in cards.filter(ele=>ele.assignee.some(val=>val.uid===task.uid))"
                    :key="'job-'+indexT+'-'+indexJ"
                    :ref="'job'+indexT"
                  >
                    <div  class="jobBox-parent">
                      <div class="checkBox">
                        <!-- <input type="checkbox" id="isFinished?" name="Jobname" value="finish" /> -->
                        {{job.status}}
                      </div>
                      <div class="jobName">{{job.title}}</div>
                      <div class="date">{{analysisTime(job.duedate,true)}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div  class="stage-r">
          <div v-if="project">
              <div class="member-tab" @click="toggleDropMember">Members ({{project.member.length}}) <b-icon icon="caret-down" shift-v="-4"></b-icon></div>
              <div class="scroll-member">
              <div v-if="project.member.length>0" id="showMem">
                <div v-for="(member,index) in project.member" :key="'member'+index">
                  <div   class="userBox-parent" id="userBox-parent">
                    <div class="userName">{{ analysisSender('name',member.uid)}}</div>
                    <div class="email">{{analysisSender('email',member.uid)}}</div>
                    <div @click="dropEditPermission(member.uid,index)" id="pri" class="priority noselect cursorPointer" v-if="project.member.filter(ele=>ele.uid===member.uid)[0] && analysisSender('permission',member.uid) !==0 && member.uid != $store.state.uid && project.permission===0">{{priorityMap[project.member.filter(ele=>ele.uid===member.uid)[0].priority]}}<b-icon icon="caret-down" shift-v="-4"></b-icon></div>
                    <div id="pri" class="priority noselect" v-else-if="project.member.filter(ele=>ele.uid===member.uid)[0]">{{priorityMap[project.member.filter(ele=>ele.uid===member.uid)[0].priority]}}</div>
                    <div  class="drop-permission noselect">
                      <div v-if="analysisSender('permission',member.uid) == 1">
                        <div class="closeX " @click="dropEditPermission(member.uid,index)">x</div><br> 
                        <a @click="selPri(member.uid,index,1)"><div class="bold ">Co-Admin</div></a>
                        <a @click="selPri(member.uid,index,2)">Member</a>
                      </div>
                      <div v-else-if="analysisSender('permission',member.uid) == 2">
                        <div class="closeX " @click="dropEditPermission(member.uid,index)">x</div><br> 
                        <a @click="selPri(member.uid,index,2)"><div class="bold">Member</div></a>
                        <a @click="selPri(member.uid,index,1)">Co-admin</a>
                      </div>
                    </div>
                    <br class="noselect">
                    <button v-if="analysisSender('permission',member.uid) > project.permission" class="removeBtn topBtn" @click="removeMember(member.uid)">Remove</button>
                    <button v-else-if="member.uid===$store.state.uid && project.permission!=0" class="removeBtn topBtn" @click="leave(member.uid)">Leave</button> 
                  </div>
                </div>
              </div>
              <div v-if="project.invite.length==0" class="invite-tab divDisable" @click="toggleDropInvite" >Invites ({{project.invite.length}}) </div>
              <div v-else class="invite-tab" @click="toggleDropInvite">Invites ({{project.invite.length}}) <b-icon icon="caret-down" shift-v="-4"></b-icon></div>
              <div v-if="project.invite.length>0" id="showInvite">
                <div v-for="(member,index) in project.invite" :key="'invite'+index">
                  <div  class="userBox-parentIn">
                    <div class="userName">{{ analysisSender('name',member.uid)}}</div>
                    <div class="email" v-if="users.filter(ele=>ele.uid===member.uid)[0]">{{users.filter(ele=>ele.uid===member.uid)[0].email}}</div>
                    <div  class="priority" v-if="project.invite.filter(ele=>ele.uid===member.uid)[0]">{{priorityMap[project.invite.filter(ele=>ele.uid===member.uid)[0].priority]}}</div>
                     <br class="noselect">
                    <button v-if="project.permission!=2 ||member.uid===$store.state.uid" class="removeBtn topBtn" @click="removeInvite(member.uid)">Remove</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="contain-input-invite" v-if="project.permission!=2">
              <input  class="input-box-setting-inv" type="email" placeholder="invite" v-model="emailIn" >
             <br class="noselect">
              <select @change='onChange' id='selector'  v-on:keyup.enter="addMember"  >
                <option  v-for="(opt, index) in priorityStatus.filter(ele=>ele.value===0||ele.value>project.permission)" :key="index" :value="opt.value">
                    {{ opt.status }}
                </option>
              </select>
              <!-- <br class="noselect"> -->
               <button  class="btn-invite-ok noselect" @click="addMember">Ok</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import firebase from "firebase";
export default {
  name: "boardManage",
  mounted() {
    this.vuexUnsubscribe3 = this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      if (mutation.type === "setProject") {
        const doc = state.project.filter(
          ele => ele.pid === this.$store.state.pid
        )[0];
        if (doc) {
          // console.log(this.postits)
          this.project = doc;
          this.postits = doc.postit;
          this.cards = [];
          this.postits.forEach(ele => {
            ele.card.forEach(ele2 => {
              this.cards.push(ele2);
            });
          });
          //   console.log(this.cards)
          //   console.log(this.project);
        }
      }
    });
    this.vuexUnsubscribe4 = this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      if (mutation.type === "setUser") {
        this.users = state.user
      }
    });
  },
  beforeDestroy() {
    this.vuexUnsubscribe3();
    this.vuexUnsubscribe4();
  },
  data() {
    return {
      task: [],
      users: [],
      project: null,
      postits: [],
      cards: [],
      emailIn:'',
      authority:0,
      priorityStatus: [
        { value: 0, status: "-Choose Member Type-" },
        { value: 1, status: "Co-admin" },
        { value: 2, status: "Member" }
      ],
      priorityMap: [
        'Admin',
        'Co-Admin',
        'Member'
      ],
    };
  },
  methods: {
    selPri (uid,index,permission) {
      this.project.member.forEach((ele,i)=>{
        if(ele.uid === uid){
          ele.priority = permission
        }
      })
      this.$db.collection('project').doc(this.project.pid).update({
        member: this.project.member,
      }).catch(err=>{
        console.log(err.message)
      })
      this.dropEditPermission(uid,index)
    },
    dropEditPermission (uid,index) {
      document.querySelectorAll("#pri")[index].classList.toggle('hide')
      document.querySelectorAll(".drop-permission")[index].classList.toggle('show')
      document.querySelectorAll(".drop-permission").forEach((ele,i)=>{
        if(i!==index){
          ele.classList.remove('show')
        }
      })
      document.querySelectorAll("#pri").forEach((ele,i)=>{
        if(i!==index){
          ele.classList.remove('hide')
        }
      })
    },
    leave (uid) {
      if(confirm('You are about to leave this board. Proceed?')){
        this.removeMember(uid)
      }
    },
    removeMember (uid) {
      this.postits.forEach((ele,i)=>{
        ele.card.forEach((ele2,j)=>{
          ele2.assignee = ele2.assignee.filter(ele3=>ele3.uid!==uid)
        })
      })
      this.$db.collection('project').doc(this.project.pid).update({
          member: this.project.member.filter(ele=>ele.uid!==uid),
          postit: this.postits
        }) 
        
    },
    removeInvite (uid) {
       this.$db.collection('project').doc(this.project.pid).update({
          invite: this.project.invite.filter(ele=>ele.uid!==uid)
        }) 
    },
    verifyMember(email){
      const matched = this.users.filter((ele,i)=>{
        return ele.email === email
      })
      return matched[0]
    },
    addMember () {
      // console.log("d")
      if(!this.authority){
        alert('Please Choose Member Type')
        return
      } 
      const res = this.verifyMember(this.emailIn)
      if(res){
        if(res.uid === firebase.auth().currentUser.uid){
          alert('You invited yourself.')
          this.emailIn = ''
          document.getElementById('selector').selectedIndex = 0
          this.authority=0
          return
        }
        if (this.project.invite.some(ele=>ele.uid===res.uid)) {
          alert('Duplicate user invited')
          this.emailIn = ''
          document.getElementById('selector').selectedIndex = 0
          this.authority=0
          return
        }

        if (this.project.member.some(ele=>ele.uid===res.uid)) {
          alert('Duplicate member invited')
          this.emailIn = ''
          document.getElementById('selector').selectedIndex = 0
          this.authority=0
          return
        }
        this.project.invite.push({ 
            priority:this.authority,
            uid: res.uid,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        this.$db.collection('project').doc(this.project.pid).update({
          invite: this.project.invite
        })                
        this.emailIn = ''
        document.getElementById('selector').selectedIndex = 0
        this.authority=0
      }
      else {
        alert('User doesn\'t exist')
        document.getElementById('selector').selectedIndex = 0
        this.authority=0
      }

    },
    onChange(e) {
      let index = e.target.value;
      this.authority = index
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
        } else if(type === 'email'){
          return sender.email
        } else if(type === 'permission'){
          // console.log(this.project.member.filter(ele=>ele.uid===uid))
          return this.project.member.filter(ele=>ele.uid===uid)[0]?this.project.member.filter(ele=>ele.uid===uid)[0].priority:''
        }
      }
      return null
    },
    toggleDropMember() {
      document.getElementById("showMem").classList.toggle("hide");
    },
    toggleDropInvite() {
      document.getElementById("showInvite").classList.toggle("hide");
    },
    analysisTime(timestamp,n=false){
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
  }
};
</script>
<style scoped lang="scss">
@import "./boardManage.scss";
</style>