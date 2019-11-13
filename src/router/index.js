import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入一级路由模块
import login from '../views/login.vue'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  // 单页应用：一级路由就是登录页和主页;
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home
  }

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
