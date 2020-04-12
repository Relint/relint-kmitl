<template>
  <div class="userBoxInTask-parent">
    <div class="top">
      <h3 id="userName">{{name}}</h3>
    </div>
    <div class="bot">
      <p id="priority">{{priori}}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../Login/mixin.scss";
.userBoxInTask-parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 2fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: $redFire;
  border-radius: 15px;
  padding: 20px 20px 1px 20px;
  margin: 5% 5% 1% 5%;
  height: 100px;
}

.top {
  grid-area: 1 / 1 / 2 / 2;
}
.bot {
  grid-area: 2 / 1 / 3 / 2;
}
#userName {
  color: white;
  font-size: 30px;
}
#priority {
  font-size: 25px;
  margin-top:-10px
}
</style>

<script>
export default {
  name: "userBoxInTask",
  props: {
    name: String,
    priori: String
  }
};
</script>
