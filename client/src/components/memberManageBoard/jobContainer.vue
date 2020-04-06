<template>
  <div class="container-parent">
    <div class="job1">
      <div v-for="(job,index) in jobs" :key="index">
        <!-- {{job.jobName}}
        {{job.date}} -->
        <jobBox :jobName="job.jobName" :date="job.date" />
      </div>
    </div>
  </div>
</template>

<style>
.container-parent {
  display: grid;
  grid-template-columns: 1fr;
  /* grid-template-rows: repeat(3, 1fr); */
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: grey;
  margin: 5%;
  max-height: 150px;
  overflow: auto;
}

.job1 {
  grid-area: 1 / 1 / 2 / 2;
  max-height: 150px;
  overflow: auto;
}
/* .job2 {
  grid-area: 2 / 1 / 3 / 2;
  overflow: auto;
}
.job3 {
  grid-area: 3 / 1 / 4 / 2;
  overflow: auto;
} */
</style>

<script>
import jobBox from "../memberManageBoard/jobBox";
export default {
  name: "jobContainer",
  components: {
    jobBox
  },
  props: {
    jobs: Array
  }
};
</script>
