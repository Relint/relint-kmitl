<template>
  <div class="invite-parent">
    <div class="textBox">
      Invite
      <br />
      <label for="emailInput">Email :</label>
      <input type="text" id="email" name="email" />
    </div>
    <div class="bottom">
      <div class="setPriority">
        <select id="Priority">
          <option value="co-admin">co-admin</option>
          <option value="member">member</option>
        </select>
      </div>
      <div class="okBtn">
        <button type="button">OK</button>
      </div>
    </div>
  </div>
</template>

<style>
.invite-parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: peru;
}

.textBox {
  grid-area: 1 / 1 / 2 / 2;
}
.bottom {
  grid-area: 2 / 1 / 3 / 2;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: red;
}
.setPriority {
  grid-area: 1 / 1 / 2 / 2;
}
.okBtn {
  grid-area: 1 / 2 / 2 / 3;
}
</style>

<script>
export default {
  name: "inviteBox"
};
</script>