<template>
    <div>
        <navBar/>
        <boardPostit/>
    </div>
</template>
<script>
import navBar from '../navBar/navBar'
import boardPostit from '../boardPostit/boardPostit'
import navBarProject from '../boardPostit/boardPostit'
export default {
    name: 'addBoardPostit',
    components: {
    navBar,
    boardPostit,
  },
}
</script>