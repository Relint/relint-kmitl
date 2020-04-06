<template>
  <div class="jobBox-parent">
    <div class="checkBox">
      <input type="checkbox" id="isFinished?" name="Jobname" value="finish" />
    </div>
    <div class="jobName">{{jobName}}</div>
    <div class="date">{{date}}</div>
  </div>
</template>

<style>
.jobBox-parent {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: gold;
  margin: 5%;
}

.checkBox {
  grid-area: 1 / 1 / 2 / 2;
}
.jobName {
  grid-area: 1 / 2 / 2 / 3;
  margin-left: -50px;
}
.date {
  grid-area: 2 / 1 / 3 / 2;
}
</style>

<script>
export default {
  name: "jobBox",
  props: {
    jobName: String,
    date: String
  }
};
</script>