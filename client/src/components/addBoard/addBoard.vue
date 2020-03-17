<template>
    <div>
       <navBar/>
        <!-- <test/>  -->
        <!-- <temp/> -->
      <createBoard/>
    </div>
</template>
<script>
/* eslint-disable */
import navBar from '../navBar/navBar'
import createBoard from '../createBoard/createBoard'
import temp from '../createBoard/temp'
import test from '../createBoard/test'

export default {
    name: 'addBoardPostit',
      components: {
        navBar,
        createBoard,
        test,
        temp
    }
}
</script>
