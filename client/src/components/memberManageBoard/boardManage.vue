
<template>
  <!-- eslint-disable -->
  <div>
    <div class="contain-profile">
      <div class="form-profile">
        <div class="stage-l" id="scroll-task">
          <div v-if="project">
            <div v-for="(task,indexT) in members" :key="'task'+indexT" :ref="'task'">
              <!-- .some -->
              <div
                class="member-task"
                v-bind:style="{left:5+(indexT)*400+(indexT)*30 + 'px',top:20+'px' }"
              >
                <div class="userBoxInTask-parent">
                  <div class="top">
                    <h3 id="userName">{{task.displayName}}</h3>
                  </div>
                  <div id="email">
                    <p>{{task.email}}</p>
                  </div>

                  <br />
                  <div class="bot">
                    <p
                      id="priority"
                    >{{priorityStatus[project.member.filter(ele=>ele.uid===task.uid)[0].priority].status}}</p>
                  </div>
                </div>

                <div class="scroll-jobs" id="scroll-jobs">
                  <div
                    v-for="(job,indexJ) in cards.filter(ele=>ele.assignee.some(val=>val.uid===task.uid))"
                    :key="'job-'+indexT+'-'+indexJ"
                    :ref="'job'+indexT"
                  >
                    <div class="jobBox-parent">
                      <div class="checkBox">
                        <!-- <input type="checkbox" id="isFinished?" name="Jobname" value="finish" /> -->
                        {{job.status}}
                      </div>
                      <div class="jobName">{{job.title}}</div>
                      <div class="date">{{job.date}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="stage-r">
          <div v-if="project">
            
              <div class="member-tab" @click="toggleDropMember">Members({{members.length}})</div>
              <div class="scroll-member">
              <div id="showMem">
                <div v-for="(member,index) in members" :key="'member'+index">
                  <div class="userBox-parent">
                    <div class="userName">{{member.displayName}}</div>
                    <div class="email">{{member.email}}</div>
                    <div
                      class="priority"
                    >{{priorityStatus[project.member.filter(ele=>ele.uid===member.uid)[0].priority].status}}</div>
                    <button class="removeBtn">remove</button>
                  </div>
                </div>
              </div>
              <div class="invite-tab" @click="toggleDropInvite">Invites({{project.invite.length}})</div>
              <div id="showInvite">
                <div v-for="(member,index) in project.invite" :key="'invite'+index">
                  <div class="userBox-parent">
                    <div class="email">{{members.filter(ele=>ele.uid===member.uid)[0].email}}</div>
                    <div
                      class="priority"
                    >{{priorityStatus[project.member.filter(ele=>ele.uid===member.uid)[0].priority].status}}</div>
                    <button class="removeBtn">remove</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="invite-parent">
              <div class="textBox">
                <input class="input-invite" type="text" id="email" placeholder="Invite" />
              </div>
              <div class="bottom">
                <div class="setPriority">
                  <select id="Priority">
                    <option value="co-admin">co-admin</option>
                    <option value="member">member</option>
                  </select>
                </div>
                <div>
                  <button class="okBtn">OK</button>
                </div>
              </div>
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
        this.members = state.user.filter((ele, i) => {
          if (this.project.member) {
            return this.project.member.map(data => data.uid).includes(ele.uid);
          }
        });
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
      members: [],
      project: null,
      postits: [],
      cards: [],
      priorityStatus: [
        { value: 0, status: "Admin" },
        { value: 1, status: "Co-admin" },
        { value: 2, status: "Member" }
      ]
    };
  },
  methods: {
    toggleDropMember() {
      document.getElementById("showMem").classList.toggle("hide");
    },
    toggleDropInvite() {
      document.getElementById("showInvite").classList.toggle("hide");
    }
  }
};
</script>
<style scoped lang="scss">
@import "./boardManage.scss";
</style>