<template>
  <div class="user-parent">
    <div class="member-top">
      <userBoxContainer :members="members" />
    </div>
    <div class="invite-bot">
      <inviteBox />
    </div>
  </div>
</template>

<style>
.user-parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: darkblue;
  margin: 5%;
  max-height: 320px;
}

.member-top {
  grid-area: 1 / 1 / 2 / 2;
}
.invite-bot {
  grid-area: 2 / 1 / 3 / 2;
  max-height: 200px;
}
</style>

<script>
import userBoxContainer from "../memberManageBoard/userBoxContainer";
import inviteBox from "./inviteBox";
export default {
  name: "userZone",
  components: {
    userBoxContainer,
    inviteBox
  },
  data() {
    return {
      members: [
        {
          userName: "Ming",
          priority: "Admin"
        },
        {
          userName: "Kan",
          priority: "Co-Admin"
        },
        {
          userName: "Pun",
          priority: "Slave"
        },
        {
          userName: "Fai",
          priority: "Co-Admin"
        },
        {
          userName: "Do",
          priority: "Member"
        },
        {
          userName: "Jate",
          priority: "Member"
        }
      ]
    };
  }
};
</script>
