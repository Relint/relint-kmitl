import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/Login/login.vue'
import addBoard from '@/components/addBoard/addBoard.vue'
import navBar from '@/components/navBar/navBar.vue'
import createBoard from '@/components/createBoard/createBoard.vue'
Vue.use(VueRouter)

const routes = [
 {
    path: '/',
    name: 'LogInpage',
    component: login
  },
  {
    path: '/addBoard',
    name: 'addBoard',
    component: addBoard
  },
  {
    path: '/navBar',
    name: 'navBar',
    component: navBar
  },
  {
    path: '/createBoard',
    name: 'createBoard',
    component: createBoard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
