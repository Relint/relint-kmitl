<template>
  <div class="userCotainer-parent">
    <!-- upper -->
    <div class="box1">
      <div v-for="(member,index) in members" :key="index">
        <userBoxInMember :userName="member.userName" :priority="member.priority" />
      </div>
      <!-- <userBoxInMember /> -->
    </div>

    <!-- lower
    <div class="box2">
      <userBoxInMember />
    </div>-->
  </div>
</template>

<style>
.userBox-parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: rgb(255, 0, 200);
  margin-right: 1%;
  margin-left: 1%;
  margin-top: 1%;
  overflow: auto;
  height: 100px;
  
  
}

.box1 {
  grid-area: 1 / 1 / 2 / 2;
  overflow: auto;
  height: 450px;
  /* padding-top:20px */
  
}
/* .box2 {
  grid-area: 2 / 1 / 3 / 2;
  overflow: auto;
} */
.userCotainer-parent {
  height: 450px;
  margin: 3%;
  /* padding-top: 15px; */
  /* margin-bottom: 15px; */
}

</style>

<script>
import userBoxInMember from "./userBoxInMember";
export default {
  name: "userBoxContainer",
  components: {
    userBoxInMember
  },
  props: {
    members: Array
  }
};
</script>
