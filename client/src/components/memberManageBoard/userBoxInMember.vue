<template>
  <div class="userBox-parent">
    <div class="userName">{{userName}}</div>
    <div class="priority">{{priority}}</div>
      <button class="removeBtn">remove</button>
  </div>
</template>

<style scoped lang="scss">
@import "../Login/mixin.scss";
.userBox-parent {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 2fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: $pinkk;
  border-radius: 10px ;
  padding: 10px 10px 10px 10px;
  margin: 5%;
}

.userName {
  grid-area: 1 / 1 / 2 / 2;
  color: rgb(255, 255, 255);
  font-size: 22px;
  padding-top: 10px;
  font-weight: bold;
}
.priority {
  grid-area: 2 / 1 / 3 / 2;
  color: rgb(63, 63, 63);
}
.removeBtn {
  grid-area: 2 / 2 / 3 / 3;
  // position: absolute;
    background: $orange;
    font-size: 15px;
    color: white;
    // width: 40%;
    height:25px;
    border-radius: 15px;
    top: 47%;
    left: 58%;
    outline: 0;
    border: none;
    box-shadow: 0px 2px 2px 0px rgba($dark, .5);
    transition: all .5s ease-in-out;
    &:hover {
      background: darken($white, 5%);
      transform: scale(1.05);
      transition: all .3s ease-in-out;
    }
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