<template>
<div>
<div class="contain-profile" id="form-profile"></div>
    <div class="form-profile center-icon" id="form-profile">
        <div class="image-profile "></div>
        <div class="username">{{username}}</div>
        <div class="email">{{email}}</div>
        
        <button @click="openFormEdit" class="btn-form-edit ">edit</button>
        <button  @click="closeFormProfile" class="btn-cancel-profile ">cancel</button>
    </div>
    <div class="form-edit-profile  center-icon" id="form-edit">
        <div @click="changeProfile" class="image-profile-edit ">
        </div>
        <div class="edit">
            <input class="input-form" type="text" placeholder="username"><br><br>
            <input class="input-form" type="text" placeholder="email"><br><br>
            <input class="input-form" type="text" placeholder="password"><br><br>
            <input class="input-form" type="text" placeholder="confirm password">
        </div>
        <button @click="saveFormEdit" class="btn-form-save " >save</button>
        <button  @click="closeFormEdit" class="btn-cancel-edit ">cancel</button>
    </div>

</div>
</template>
<script>
export default {
  name: 'profile',
  data (){
    return {
        username:'fai45678955',
        email:'fai@gmail.com',
    }
  },
  methods: { 
    changeProfile () {
        console.log('yes');
        
    },
    saveFormEdit () {
        document.getElementById('form-edit').style.display="none"
    },
    closeFormEdit () {
         document.getElementById('form-edit').style.display="none"
    },
    openFormEdit () {
        document.getElementById('form-edit').style.display="block"
    },
    closeFormProfile () {
        document.getElementById('form-profile').style.display="none"
    }
  }
}
</script>
<style lang="scss" scoped>
@import './profileStyle.scss';
</style>