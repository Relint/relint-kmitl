<template>
    <div id="app">
        <div v-if="state == 0">
            <h3>Welcome! Please choose a username.</h3>
            <form @submit.prevent="setUsername">
                <input type="text" placeholder="Username..." v-model="username" />
                <input type="submit" value="Join" />
            </form>
            <button @click="continueWithoutUsername"> Join as a Guest </button>
        </div>
        <div v-if="state == 1">
            <ul id="chatbox">
                <li v-for="message in messages" :key="message.user">
                    <b>{{ message.user }}:</b> {{ message.message }}
                </li>
            </ul>
            <form @submit.prevent="sendMessage">
                <input type="text" placeholder="Message..." v-model="message" />
                <input type="submit" value="Send" />
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chatz',
    
}

</script>