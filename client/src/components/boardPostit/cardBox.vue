<template>
  <div class="card_box">
    <div class="checkMark">
      <input type="checkbox" id="isFinished?" name="Jobname" value="finish" />
    </div>
    <div class="cardName">cooking{{cardName}}</div>
    <div class="deleteButton">
      <button type="button">remove</button>
    </div>
    <div class="deadLine">2018/01/01{{date}}</div>
    <div class="difficult">
      <!-- get num of star -->
      <!-- a loop -->
      <!-- if > 0  show filled star -= 1-->
      <!-- if == 0 show not fill -->
      <!-- do it 5 times -->
      <b-icon icon="circle-fill" font-scale="1"></b-icon>
      <b-icon icon="circle-fill" font-scale="1"></b-icon>
      <b-icon icon="circle-fill" font-scale="1"></b-icon>
      <b-icon icon="circle" font-scale="1"></b-icon>
      <b-icon icon="circle" font-scale="1"></b-icon>
    </div>
    <div class="lightBulb">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <button style="font-size:18px">
        <i class="fa fa-lightbulb-o"></i>
      </button>
    </div>
  </div>
</template>

<style>
.card_box {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: white;
}

.checkMark {
  grid-area: 1 / 1 / 2 / 2;
  background-color: teal;
  margin: 1%;
}
.cardName {
  grid-area: 1 / 2 / 2 / 3;
  background-color: tomato;
  margin: 1%;
}
.deleteButton {
  grid-area: 1 / 3 / 2 / 4;
  background-color: violet;
  margin: 1%;
}
.deadLine {
  grid-area: 2 / 1 / 3 / 2;
  background-color: sienna;
  margin: 1%;
}
.difficult {
  grid-area: 2 / 2 / 3 / 3;
  background-color: red;
  margin: 1%;
}
.lightBulb {
  grid-area: 2 / 3 / 3 / 4;
  background-color: orange;
  margin: 1%;
}
</style>

<script>
export default {
  name: "cardBox",
  props: {
    cardName: String,
    date: String,
    star: Float32Array
  }
};
</script>