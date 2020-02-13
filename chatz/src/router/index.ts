import Vue from 'vue'
import VueRouter from 'vue-router'
import chatz from '@/components/chatz.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'chatz',
    component: chatz
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
