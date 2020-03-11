<template>
    <div>
        
     

      <navBar/>
      <createBoard/>
    </div>
</template>
<script>
import navBar from '../navBar/navBar'
import createBoard from '../createBoard/createBoard'
export default {
    name: 'addBoardPostit',
      components: {
        navBar,
        createBoard
    },
    data () {
        return {
          num:0,
          create: [{numm:0
            }]
        }
    },
    
  
}
</script>
