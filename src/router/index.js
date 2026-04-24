import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/example',
    name: 'ExampleView',
    component: () => import('@/views/Example.vue'),
  }
]

const createRouter = () => new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

const router = createRouter()
export default router