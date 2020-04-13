<template>
  <div class="userCotainer-parent" id="scroll-member">
    <!-- upper -->
    <div class="box1" >
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
<style >
/* $greenSeaweed: rgba(2, 128, 144, 1);
$blueQueen: rgba(69, 105, 144, 1);
$redFire: rgba(244, 91, 105, 1);
$pinkk :#FFCFD2;
$orange: #f7a79d;
$bluesky : #a6d4d8; 
$colorFront : #707070;
$fontAsap: 'Asap', sans-serif;

$white: #FCFCFC;
$gray: #CBCDD3;
$dark: #777777;
$orange: #FFC39E;
$success: #B0DB7D;
$secondary: #99DBB4; */
.userBox-parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: #FFCFD2;
  margin: 2%;
  overflow: auto;
  box-shadow: 0px 3px 3px 0px rgb(185, 185, 185);
}

.box1 {
  grid-area: 1 / 1 / 2 / 2;
  overflow: auto;
  /* max-height: 450px; */
}
/* .box2 {
  grid-area: 2 / 1 / 3 / 2;
  overflow: auto;
} */
.userCotainer-parent {
  max-height: 450px;
  /* background-color:red; */
   overflow-y: scroll;
    scrollbar-width: thin;
}
  #scroll-member::-webkit-scrollbar
  {
    width: 5px;
    background-color: #F5F5F5;
    border-radius: 30px;
     /* display: none; */
  }
  #scroll-member::-webkit-scrollbar-thumb
  {
    border-radius: 30px;
    
    background-color: rgb(177, 177, 177);
     /* display: none; */
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