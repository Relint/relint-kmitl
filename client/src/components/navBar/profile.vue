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
              <img class="preview"  :src="preview" />  
             <img class="camera" src="./camera.png"> 
             <input class="up-file" type="file" @change="previewImage" accept="imageProfile/*" >
        </div> 

        <p class="progress-num">Progress: {{uploadValue.toFixed()+"%"}}<br>
            <progress id="progress" :value="uploadValue" max="100" ></progress>  
        </p>

        <button class="btn-upload" @click="onUpload">Upload in storage</button>
        <button class="btn-remove" @click="deleteimage">remove in storage</button>
        <div class="edit">
            <input class="input-form" type="text" placeholder="username" v-model="usernameIn"><br><br>
            <input class="input-form" type="text" placeholder="email" v-model="emailIn"><br><br>
            <input class="input-form" type="text" placeholder="password" v-model="pwIn"><br><br>
            <input class="input-form" type="text" placeholder="confirm password" v-model="cpwIn">
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
        usernameIn:'',
        emailIn:'',
        pwIn:'',
        cpwIn:'',

        username:'FFFFFFFAI',
        email:'fai@gmail.com',

        imageData: null,
        picture: null,
        uploadValue: 0,
        preview: null,

    }
  },
  methods: { 
       deleteimage () {
        const desertRef = firebase.storage().ref("imageProfile").child(`${this.imageData.name}`)
        desertRef.delete().then(function() {
            // success
        })
      },
      onUpload(){
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
      const file = event.target.files[0];
      this.preview = URL.createObjectURL(file);
      this.imageData = event.target.files[0];
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