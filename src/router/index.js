import { createRouter, createWebHistory } from 'vue-router'
import { backstage } from './backstage'

const routes = [
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
    meta: { title: "首页" },
    component: () => import('@/views/frontend/Index.vue'),
    children: [
      {
        path: '/essay',
        meta: { title: "随笔" },
        component: () => import('@/views/frontend/essay/Essay.vue')
      },
      {
        path: '/music',
        meta: { title: "音乐" },
        component: () => import('@/views/frontend/music/index.vue')
      },
      {
        path: '/wallpaper',
        meta: { title: "壁纸" },
        component: () => import('@/views/frontend/wallpaper/index.vue')
      },
      {
        path: '/book',
        meta: { title: "书籍" },
        component: () => import('@/views/frontend/book/Book.vue')
      },
      {
        path: '/anime',
        meta: { title: "动画" },
        component: () => import('@/views/frontend/anime/Anime.vue')
      },
    ]
  },
  backstage
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => { // beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched[0].path == '/backstage' && !sessionStorage.getItem('token')) {
    next({ path: '/login' })
    alert('请先登陆')
  } else {
    next()
  }
})
export default router
