import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/mine')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    // /article/... 时影响图片加载
    path: '/arti/:articleId',
    name: 'arti',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  },
  {
    path: '*',
    component: () => import('@/views/notfound')
  }
]

const router = new VueRouter({
  routes
})

export default router
