import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import firebase from "firebase";
import './registerServiceWorker'
import router from './router'
import store from './store'
import {firebaseConfig} from './_config_ci/firebaseKey'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
require("firebase/firestore");

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
Vue.prototype.$db = db;
const rtdb = firebase.database();
Vue.prototype.$rtdb = rtdb;
const st = firebase.storage();
Vue.prototype.$st = st
/* eslint-disable */
const client = axios.create({
  baseURL: "https://us-central1-relint-kmitl.cloudfunctions.net/app",
});
Vue.prototype.$http = client;
Vue.prototype.$key = require('random-key')
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
