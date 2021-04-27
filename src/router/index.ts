import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './backstage'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/backstage/Login.vue'),
  },
  {
    path: '/index',
    meta: { title: '首页' },
    component: () => import('@/views/frontend/Index.vue')
  },
  Home
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
