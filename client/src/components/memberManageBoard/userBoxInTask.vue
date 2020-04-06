<template>
  <div class="userBoxInTask-parent">
    <div class="top">
      <p id="userName">{{name}}</p>
    </div>
    <div class="bot">
      <p id="priority">{{priori}}</p>
    </div>
  </div>
</template>

<style>
.userBoxInTask-parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 2fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: darkgreen;
  margin: 5%;
}

.top {
  grid-area: 1 / 1 / 2 / 2;
}
.bot {
  grid-area: 2 / 1 / 3 / 2;
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
