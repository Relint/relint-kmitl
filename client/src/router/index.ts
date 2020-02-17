import Vue from 'vue'
import VueRouter from 'vue-router'
//import login from '@/components/Login/login.vue'
import addBoard from '@/components/createBoard/addBoard.vue'

Vue.use(VueRouter)

const routes = [
  /*{
    path: '/',
    name: 'LogInpage',
    component: login
  },*/
  {
    path: '/',
    name: 'AddBoard',
    component: addBoard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
