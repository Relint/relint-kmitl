import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/Login/login.vue'
import addBoard from '@/components/addBoard/addBoard.vue'
import navBar from '@/components/navBar/navBar.vue'
import createBoard from '@/components/createBoard/createBoard.vue'
import boardPostit from '@/components/boardPostit/boardPostit.vue'
import addBoardPostit from '@/components/addBoard/addBoardPostit.vue'
import chat from '@/components/chat/chat.vue'
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
  },
  {
    path: '/boardPostit',
    name: 'boardPostit',
    component: boardPostit
  },
  {
    path: '/addBoardPostit',
    name: 'addBoardPostit',
    component: addBoardPostit
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
