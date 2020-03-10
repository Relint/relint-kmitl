<template>
    <div>
        <div class="parent12">
    <div class="div1"> 
        <div class="div1"><a><b-icon  @click="backToHome" id="iconNBP" icon="house" font-scale="3"  ></b-icon></a></div>
    </div>
    
    <div class="div2"> 
        <div class="form-projectName">{{projectName}}</div>
    </div>
    <div class="div3">
         <div class="form-deadline">{{deadline}}</div>
    </div>
    <div class="div4"> 
        <b-icon  font-scale="3" id="iconNBP" icon="chat-fill" @click="openFormChat"   ></b-icon>
    </div>
    <div class="div5"> 
    <b-icon font-scale="3" id="iconNBP" icon="inboxes-fill" @click="openFormMa"  ></b-icon>
    </div>
 
</div>
<hr>
    </div>
</template>
<script>
export default {
    name:'navBarProject',
   data (){
    return {
      projectName: 'ProjectName',
      deadline : '00.00 Sat 2020'
    }
   },
   methods: {
    backToHome () {
      this.$router.push('/addBoard')
    }
   }
}
</script>
<style scoped>
@import './navBarProjectStyle.scss';
</style>