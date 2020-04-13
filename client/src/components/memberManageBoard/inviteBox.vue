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

<style >
.invite-parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
 /* background-color: peru; */
 width: 100%;
  
}
.input-invite {
  border-radius: 20px;
  margin: 8% 5% 5% 0%;
  width: 93%;
  height: 40px;
  border: 1px solid gray;
  padding-left:10px ;
}
.textBox {
  grid-area: 1 / 1 / 2 / 2;
  height:100px;
}
.bottom {
  grid-area: 2 / 1 / 3 / 2;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  /* background-color: red; */
}
.setPriority {
  grid-area: 1 / 1 / 2 / 2;
}
.okBtn {
  grid-area: 1 / 2 / 2 / 3;
   cursor: pointer;
    /* position: relative; */
    font-size: 20px;
    color: white;
    background:  rgba(244, 91, 105, 1);
    width:50px;
    height:50px;
    border-radius: 100%;
    outline: 0;
      /* bottom: -5px; */
    /* margin-right: 50%;  */
    border: none;
    box-shadow: 2px 2px 10px rgba(black, .5);
    transition: all .5s ease-in-out;
    /* float: right;  */
    margin-left: 10px;
}
.okBtn:hover {
      background: rgb(204, 204, 204);
      transform: scale(1.05);
      transition: all .3s ease-in-out;
    }
 select {
     position: relative;
    outline: none;
    border-style: none; 
    border-radius: 15px;
    outline: 0;
    box-shadow: none;
    background: rgba(244, 91, 105, 1);
    width: 98%;
    height: 50px;
    padding-left: 20px;
    font-size: 20px;
     margin: 0 0  0  5px ;
     color: white;

} 
</style>

<script>
export default {
  name: "inviteBox"
};
</script>