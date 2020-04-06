<template>
  <div class="userBox-parent">
    <div class="userName">{{userName}}</div>
    <div class="priority">{{priority}}</div>
    <div class="removeBtn">
      <button type="button">remove</button>
    </div>
  </div>
</template>

<style>
.userBox-parent {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 2fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: darkorange;
  margin: 5%;
}

.userName {
  grid-area: 1 / 1 / 2 / 2;
}
.priority {
  grid-area: 2 / 1 / 3 / 2;
}
.removeBtn {
  grid-area: 2 / 2 / 3 / 3;
}
</style>

<script>
export default {
  name: "userBoxInMember",
  props: {
    userName: String,
    priority: String
  }
};
</script>