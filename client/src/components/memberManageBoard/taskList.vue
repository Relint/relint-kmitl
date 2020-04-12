<template>
  <div class="list-parent">
    <!-- top 1 bot 3 -->
    <div class="userBox">
      <!-- {{uName}} -->
      <userBoxInTask :name="uName" :priori="prior" />
    </div>
    <div class="taskBar">
      <!-- {{job.jobName}}
      {{job.date}}-->
      <jobContainer :jobs="jobs" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../Login/mixin.scss";
.list-parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  border: 1px solid rgb(175, 174, 174);
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  // margin: 5%;
  height: 600px;
  position: absolute;
  width: 400px;
}

.userBox {
  grid-area: 1 / 1 / 2 / 2;
  // background-color:red;
}
.taskBar {
  grid-area: 2 / 1 / 3 / 2;
}
</style>

<script>
import userBoxInTask from "../memberManageBoard/userBoxInTask";
import jobContainer from "../memberManageBoard/jobContainer";
export default {
  name: "taskList",
  components: {
    userBoxInTask,
    jobContainer
  },
  props: {
    uName: String,
    prior: String,
    jobs: Array
  }
};
</script>
