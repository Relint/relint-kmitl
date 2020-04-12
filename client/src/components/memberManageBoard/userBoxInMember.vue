<template>
  <div class="userBox-parent">
    <div class="contain-pic-profile"><b-icon  id="iconNBP" icon="eye" font-scale="2"></b-icon></div>
    <div class="userName"><h3>{{userName}}</h3></div>
    <div class="priority">{{priority}}</div>
      <button class="removeBtn "><b-icon  id="iconNBP" icon="trash" font-scale="2.5"></b-icon></button>
  </div>
</template>

<style scoped lang="scss">
@import "../Login/mixin.scss";
.userBox-parent {
  // display: grid;
  // grid-template-columns: 2fr 1fr;
  // grid-template-rows: 2fr 1fr;
  // grid-column-gap: 0px;
  // grid-row-gap: 0px;
  // background-color: darkorange;
 padding: 20px 20px 20px 20px;
 margin: 5%;
}

.userName {
  // grid-area: 1 / 2 / 2 / 2;
  position: relative;
  color: rgb(88, 88, 88);
  // margin-right: 180px;
  // left: 50px;
  margin-left: 80px;
 
  top:-40px
}
.priority {
  // grid-area: 2 / 1 / 5 / 2;
  position: relative;
  color: rgb(63, 63, 63);
  top:-20px
}
.removeBtn {
  // grid-area: 2 / 2 / 5 / 3;
  cursor: pointer;
  position: relative;
  top:-60px;
  left: 80%;
  font-size: 20px;
  // margin-left: 290px;
  background: $bluesky;
  color: rgb(58, 58, 58);
  // font-size: 15px;
  width: 50px;
  height:50px;
  border-radius: 100%;
  outline: 0;
  border: none;
  box-shadow: 2px 2px 10px rgba($dark, .5);
  transition: all .5s ease-in-out;
  &:hover {
    background: darken($white, 5%);
    transform: scale(1.05);
    transition: all .3s ease-in-out;
  }
}
.center-icon {
  // position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.contain-pic-profile {
  // grid-area: 1 / 1 / 2 / 1;
  position: relative;
  // right: 100px;
  background-color:$redFire;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  float: left;
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