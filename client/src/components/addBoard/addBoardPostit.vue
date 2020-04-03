<template>
    <div>
        <bg/>
        <boardPostit/>
        <navBar/>
        <navBarProject/>
       
    </div>
</template>
<script>
import navBar from '../navBar/navBar'
import boardPostit from '../boardPostit/boardPostit'
import navBarProject from '../navBarProject/navBarProject'
import bg from '../bg/bg'
export default {
    name: 'addBoardPostit',
    components: {
    navBar,
    boardPostit,
    navBarProject,
    bg,
  },
}
</script>