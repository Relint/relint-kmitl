import Vue from "vue";
import App from "./App.vue";

import firebase from "firebase";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyD9-ESRH-j1L4HbZ7LaFc21lc0FnXwT9qg",
  authDomain: "relint-kmitl.firebaseapp.com",
  databaseURL: "https://relint-kmitl.firebaseio.com",
  projectId: "relint-kmitl",
  storageBucket: "relint-kmitl.appspot.com",
  messagingSenderId: "865631405792",
  appId: "1:865631405792:web:6cd1996b57fc2e9abd3285",
  measurementId: "G-5312J6XDD4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  render: h => h(App)
}).$mount("#app");