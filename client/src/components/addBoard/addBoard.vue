<template>
    <div>

       <navBar/>
      <createBoard/>
    </div>
</template>
<script>
/* eslint-disable */
import navBar from '../navBar/navBar'
import createBoard from '../createBoard/createBoard'
export default {
    name: 'addBoardPostit',
      components: {
        navBar,
        createBoard
    }
}
</script>
