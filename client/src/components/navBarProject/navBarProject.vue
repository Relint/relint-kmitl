<template>
    <div>
        <div class="parent12">
<div class="div1"> 
    <div class="form-projectName">{{projectName}}</div>
    
</div>
<div class="div2">
    <div class="form-deadline">{{deadline}}</div>
</div>
<div class="div3"> 
     <b-icon  font-scale="3" icon="chat-fill" @click="openFormChat"   ></b-icon>
</div>
 <div class="div4"> 
 <b-icon font-scale="3" icon="inboxes-fill" @click="openFormMa"  ></b-icon>
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
   }
}
</script>
<style scoped>
@import './navBarProjectStyle.scss';
</style>