<template>
<div>
    <h5>Fuck</h5>
    <button class="btnSignout" v-on:click="logout" type="submit" >Signout</button>
</div>
</template>
<script>
export default {
  name: 'AddBoard',
  methods: {
    logout : function () {
        this.$router.replace('/')
    }
  }
}
</script>
