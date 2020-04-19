<template>
<div>
    <div class="contain-profile" id="form-profile"></div>
    <div class="form-profile center-icon" id="form-profile" v-if="user">
        <div class="image-profile noselect " >
          <img class="show-defalut-img" src="./defalutImage.png" v-if="!user.photoURL">
          <img class="preview-edit" :src="user.photoURL">
        </div>
        <div class="username">{{user.displayName}}</div>
        <div class="email">{{user.email}}</div>
        
        <button @click="openFormEdit" class="btn-form-edit noselect ">Edit</button>
        <button  @click="closeFormProfile" class="btn-cancel-profile noselect ">Close</button>
    </div>

    <div class="form-edit-profile  center-icon" id="form-edit">
        
        <div class="image-profile-edit noselect">
          <div class="image-profile-edit-wrapper">
            <div class="preview-s-bg"><img v-if="!user.photoURL && !preview" class="tag preview-s" src="./defalutImage.png"></div>
            <img class="tag preview"  :src="user.photoURL" v-if="!preview"/>
            <img class="tag preview higher"  :src="preview" />  
            <img class="tag camera" src="./camera.png"> 
            <progress id="progress-b" :value="uploadValue" max="100" ></progress>  
            <input class="up-file" type="file" @change="previewImage" accept="image/*">
          </div>
        </div>
        <div style="font-size:12px; color:grey; margin-bottom:3px; text-align:center; margin-top:38px;">Profile Picture</div>
        <div class="btn-remove" @click="deleteimage" v-if="preview"><b-icon icon="x" font-scale="2.5"></b-icon></div>
        <div class="edit">
            <div class="alert-error" > {{errorMessage}}</div><br class="noselect">
            <div style="font-size:12px; color:grey; margin-bottom:3px; text-align:center;">Display Name</div>
            <input class="input-form " type="text" :placeholder="user.displayName" v-model="usernameIn" maxlength="15"><br class="noselect"><br class="noselect">
            <div style="font-size:12px; color:grey; margin-bottom:3px; text-align:center;">Confirm Password</div>
            <input class="input-form " type="password" placeholder="Password" v-model="pwIn" v-on:keyup.enter="saveFormEdit"><br class="noselect"><br class="noselect">
        </div>
        <button @click="saveFormEdit" class="btn-form-save noselect " >Save</button>
        <button  @click="closeFormEdit" class="btn-cancel-edit noselect ">Cancel</button>
    </div>

</div>
</template>
<script>
/* eslint-disable */
import firebase from "firebase"
export default {
  name: 'profile',
  data (){
    return {
      user: '',

      usernameIn:'',
      emailIn:'',
      pwIn:'',
      cpwIn:'',

      picture: null,
      uploadValue: 0,
      preview: null,
      errorMessage:''

    }
  },
  mounted(){
    this.vuexUnsubscribeCurrentUser = this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      if(mutation.type === 'setUser'){
        this.user = state.user.filter(ele=>ele.uid === state.uid)[0]
      }
    })
  },
  beforeDestroyed(){
    this.vuexUnsubscribeCurrentUser()
  },
  methods: { 
    deleteimage () {
      this.deleteAllNonProfileImage()
      this.preview = ''
      this.uploadValue = 0
      document.querySelector('.up-file').value = ''
    },
    deleteAllNonProfileImage(){
      firebase.storage().ref('imageProfile').child(this.user.uid).listAll().then(res=>{
        if(res.items.length > 0){
          res.items.forEach((ele,i)=>{
            ele.getDownloadURL().then(url=>{
              if(url !== this.user.photoURL){
                ele.delete().catch(err=>console.log(err.message))
              }
            })
          })
        }
      })
    },
    onUpload(file=null){
      let storageRef = ''
      // console.log(file)
      if(file){
        storageRef = firebase.storage().ref("imageProfile/"+this.user.uid).child(`${file.name}`).put(file);
        storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          },
          error=>{
              console.log(error.message)
              document.getElementById('progress-b').style.display = 'none'
              document.querySelectorAll('.tag').forEach(ele=>ele.classList.remove('hide'))
            },
          ()=>{
              this.uploadValue=100;
              storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                  this.preview = url
                  document.getElementById('progress-b').style.display = 'none'
                  document.querySelectorAll('.tag').forEach(ele=>ele.classList.remove('hide'))
                });
          }
        );
      } else {
        document.getElementById('progress-b').style.display = 'none'
        document.querySelectorAll('.tag').forEach(ele=>ele.classList.remove('hide'))
        return
      }
    },
    previewImage(e) {
      document.getElementById('progress-b').style.display = 'block'
      document.querySelectorAll('.tag').forEach(ele=>ele.classList.add('hide'))
      this.uploadValue=0;
      const file = event.target.files[0];
      this.deleteAllNonProfileImage()
      this.onUpload(file)
      document.querySelector('.up-file').value = ''
    },
    saveFormEdit () {
      if(!this.pwIn){
        this.errorMessage='Invalid password'
        document.querySelector(".alert-error").style.display="block"
        return
      }
      const credential = firebase.auth.EmailAuthProvider.credential(this.user.email,this.pwIn)
      firebase.auth().currentUser.reauthenticateWithCredential(credential).then(()=>{
         if(this.usernameIn && !(this.usernameIn.match(/^([\x20-\x7E])+$/i))){
          this.errorMessage='Invalid username'
          this.usernameIn=''
          document.querySelector(".alert-error").style.display="block"
          return
        }
        this.updateUserProfile()

        this.pwIn = ''
        this.usernameIn = ''
        document.querySelector(".alert-error").style.display="none"
        document.getElementById('form-edit').style.display="none"
      }).catch(err=>{
        this.errorMessage='Incorrect password'
        document.querySelector(".alert-error").style.display="block"
        return
      })
    },
    closeFormEdit () {
      this.deleteimage()
      this.usernameIn=''
      this.pwIn=''
      document.getElementById('form-edit').style.display="none"
      document.querySelector(".alert-error").style.display="none"
    },
    openFormEdit () {
      document.getElementById('form-edit').style.display="block"
    },
    closeFormProfile () {
      document.getElementById('form-profile').style.display="none"
    },
    updateUserProfile(){
      if(this.preview && this.usernameIn){
        this.$rtdb.ref('/status/'+this.user.uid).update({
          displayName: this.usernameIn.charAt(0).toUpperCase()+this.usernameIn.substring(1).toLowerCase(),
          photoURL: this.preview
        }).then(()=>{
          this.deleteimage()
        }).catch(err=>{
          console.log(err.message)
        })
      } else if (this.preview) {
        this.$rtdb.ref('/status/'+this.user.uid).update({
          photoURL: this.preview
        }).then(()=>{
          this.deleteimage()
        }).catch(err=>{
          console.log(err.message)
        })
      } else if(this.usernameIn){
        this.$rtdb.ref('/status/'+this.user.uid).update({
          displayName: this.usernameIn.charAt(0).toUpperCase()+this.usernameIn.substring(1).toLowerCase()
        }).catch(err=>{
          console.log(err.message)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './profileStyle.scss';
</style>