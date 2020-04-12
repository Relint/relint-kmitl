<template>
  <div class="invite-parent">
    <div class="textBox">
      <input class="input-invite" type="text" id="email"  placeholder="Invite"/>
    </div>
    <div class="bottom">
      <div class="setPriority">
        <select id="Priority">
          <option value="co-admin">co-admin</option>
          <option value="member">member</option>
        </select>
      </div>
      <div>
        <button  class="okBtn">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../Login/mixin.scss";
.invite-parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  // background-color: peru;
  // margin: 5%;
  
}
.input-invite {
  position: relative;
  width: 75%;
  height: 70px;
  border-radius: 20px;
  border: 1px solid gray;
  padding: 0 0 0 20px ;
  font-size: 15px;
  margin: 3% 5% 5% 10%;
  font-size: 20px;
}
.textBox {
  grid-area: 1 / 1 / 2 / 2;
  height: 110px;
}
.bottom {
  grid-area: 2 / 1 / 3 / 2;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  // background-color: red;
  height: 110px;
  
}
.setPriority {
  grid-area: 1 / 1 / 2 / 2;
}
.okBtn {
  grid-area: 1 / 2 / 2 / 3;
  cursor: pointer;
    position: relative;
    font-size: 20px;
    color: white;
    background: $redFire;
    width:60px;
    height: 60px;
    border-radius: 100%;
    outline: 0;
    // bottom: -5px;
    right: 50%;
    border: none;
    box-shadow: 2px 2px 10px rgba($dark, .5);
    transition: all .5s ease-in-out;
    &:hover {
      background: darken($white, 5%);
      transform: scale(1.05);
      transition: all .3s ease-in-out;
    }
}
select {
    // -webkit-appearance: none;
    // -moz-appearance: none;
    // -ms-appearance: none;
    // appearance: none;
    outline: none;
    border-style: none; 
    border-radius: 15px;
    outline: 0;
    box-shadow: none;
    background: $redFire;
    width: 232px;
    height: 60px;
    // padding-left: 20px;
    font-size: 20px;
     margin: 0 0  0  15% ;
    
  }
  //style select option-------------------------
  // /* Remove IE arrow 
    select::-ms-expand {
      display: none;
    }
  
    select {
      flex: 1;
      padding: 10px 10px 10px 20px;
      color: #fff;
      cursor: pointer;
      top:-20px;
    }
</style>

<script>
export default {
  name: "inviteBox"
};
</script>