<template>
  <div class="task-parent">
    <div class="user1">
      <div v-for="(member,index) in members" :key="index">
        <div class="slide-horizontal" v-bind:style="{left:10+(index)*150+(index)*30 + 'px', }">
          <!-- {{member.userName}} -->
          <div id="aUser">
            <taskList :uName="member.userName" :prior="member.priority" :jobs="member.jobs" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.task-parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: chocolate;
  margin: 5%;
  max-height: 300px;
  position: relative;
}

.user1 {
  grid-area: 1 / 1 / 2 / 2;
  position: relative;
}
.slide-horizontal {
  position: absolute;
}
.aUser {
  width: 1000px;
}
</style>
<script src="~/lib/vue/vue_v2.5.16.js"></script>
<script >
import taskList from "../memberManageBoard/taskList";
export default {
  name: "taskZone",
  components: { taskList },
  data() {
    return {
      members: [
        {
          userName: "Ming",
          priority: "Admin",
          jobs: [
            {
              jobName: "Sleep",
              date: "32/13/2000"
            },
            {
              jobName: "Lazy",
              date: "42/46/2484"
            },
            {
              jobName: "Nothing",
              date: "01/01/2020"
            },
            {
              jobName: "Eat",
              date: "25/03/2020"
            },
            {
              jobName: "Playing Game",
              date: "30/04/2020"
            }
          ]
        },
        {
          userName: "Kan",
          priority: "Co-Admin",
          jobs: [
            {
              jobName: "Backend",
              date: "32/13/2000"
            },
            {
              jobName: "Server",
              date: "42/46/2484"
            },
            {
              jobName: "Watch Anime",
              date: "01/01/2020"
            },
            {
              jobName: "Farming",
              date: "25/03/2020"
            },
            {
              jobName: "Teaching",
              date: "30/04/2020"
            }
          ]
        },
        {
          userName: "Pun",
          priority: "Slave",
          jobs: [
            {
              jobName: "Hunt a girl",
              date: "32/13/2000"
            },
            {
              jobName: "Take she/he home",
              date: "42/46/2484"
            },
            {
              jobName: "Eat her things",
              date: "01/01/2020"
            },
            {
              jobName: "gave",
              date: "25/03/2020"
            }
          ]
        },
        {
          userName: "Fai",
          priority: "Co-Admin",
          jobs: [
            {
              jobName: "Hunt a man",
              date: "32/13/2000"
            },
            {
              jobName: "Eat him",
              date: "42/46/2484"
            },
            {
              jobName: "Angry",
              date: "01/01/2020"
            }
          ]
        },
        {
          userName: "Do",
          priority: "Member",
          jobs: [
            {
              jobName: "Plaing ROV",
              date: "32/13/2000"
            },
            {
              jobName: "In Love",
              date: "42/46/2484"
            },
            {
              jobName: "Take bath",
              date: "01/01/2020"
            },
            {
              jobName: "Plaing CSGO",
              date: "25/03/2020"
            }
          ]
        },
        {
          userName: "Jate",
          priority: "Member",
          jobs: [
            {
              jobName: "Angry",
              date: "32/13/2000"
            },
            {
              jobName: "Shout",
              date: "42/46/2484"
            },
            {
              jobName: "Watching YouTube",
              date: "01/01/2020"
            },
            {
              jobName: "Make a gun",
              date: "25/03/2020"
            },
            {
              jobName: "Kill Pun",
              date: "30/04/2020"
            }
          ]
        }
      ]
    };
  }
};
</script>
