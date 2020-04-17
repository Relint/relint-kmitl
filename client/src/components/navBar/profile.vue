<template>
<div>
<div class="contain-profile" id="form-profile"></div>
    <div class="form-profile center-icon" id="form-profile">
        <div v-if="this.picture==null" class="image-profile " > 
            <img class="show-defalut-img" src="./defalutImage.png"> 
        </div>
        <div v-else class="image-profile"> <img class="preview-edit" :src="picture"></div>
        <div class="username" >{{username}}</div>
        <div class="email">{{email}}</div>
        
        <button @click="openFormEdit" class="btn-form-edit ">edit</button>
        <button  @click="closeFormProfile" class="btn-cancel-profile ">cancel</button>
    </div>

    <div class="form-edit-profile  center-icon" id="form-edit">
         <div @click="changeProfile" class="image-profile-edit ">
            <img class="preview" :src="picture">
             <img class="camera" src="./camera.png"> 
             <input class="up-file" type="file" @change="previewImage(e)" accept="imageProfile/*" >
            
            <!-- <p class="progress-num">Progress: {{uploadValue.toFixed()+"%"}}<br>
             <progress id="progress" :value="uploadValue" max="100" ></progress>  
             </p> -->
        </div> 
        <button class="btn-upload" @click="onUpload">Upload</button>
        <button class="btn-remove" >remove</button>
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
import firebase from "firebase"
export default {
  name: 'profile',
  data (){
    return {
        username:'FFFFFFFAI',
        email:'fai@gmail.com',
        imageData: null,
        picture: null,
        uploadValue: 0,
        pictureDefalut:null
    }
  },
  methods: { 
      onUpload(){

        // var name="123"+Date.now(); 
        // var storageRef = firebase.storage().ref('/images/'+ name); 
  

      this.picture=null;
      const storageRef = firebase.storage().ref("imageProfile").child(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{
          console.log(error.message)
          },
        ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.picture =url;
        });
      }
      );
    },
    previewImage(e) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
      

    },
    changeProfile () {
        // console.log('yes');
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