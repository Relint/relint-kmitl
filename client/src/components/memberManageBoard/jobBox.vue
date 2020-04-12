<template>
  <div class="jobBox-parent">
    <div class="checkBox">
      <input type="checkbox" id="isFinished?" name="Jobname" value="finish" />
    </div>
    <div class="jobName">{{jobName}}</div>
    <div class="date">{{date}}</div>
  </div>
</template>

<style scoped lang="scss">
@import "../Login/mixin.scss";
.jobBox-parent {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color:white;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
  width: 322px;
  height: 70px;
}

.checkBox {
  grid-area: 1 / 1 / 2 / 2;
  
}
.jobName {
  grid-area: 1 / 2 / 2 / 3;
  margin-left: -50px;font-size: 20px;
}
.date {
  grid-area: 2 / 1 / 3 / 2;
  color: $redFire;
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