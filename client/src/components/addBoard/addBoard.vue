<template>
    <div>
      <title>Home</title>
       <navBar/>
        <!-- <test/>  -->
        
      <createBoard/>
    </div>
</template>
<script>
/* eslint-disable */
import navBar from '../navBar/navBar'
import createBoard from '../createBoard/createBoard'

// import test from '../createBoard/test'

export default {
    name: 'addBoardPostit',
      components: {
        navBar,
        createBoard,
       
    }
}
</script>
