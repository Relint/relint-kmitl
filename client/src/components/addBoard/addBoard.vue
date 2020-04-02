<template>
    <div>
      <title>Home</title>
      <bg/>
      <createBoard/>
      <navBar/>
    </div>
</template>
<script>
/* eslint-disable */
import navBar from '../navBar/navBar'
import createBoard from '../createBoard/createBoard'
import bg from '../bg/bg'
export default {
  name: 'addBoardPostit',
    components: {
      navBar,
      createBoard,
      bg,
  }
}
</script>
