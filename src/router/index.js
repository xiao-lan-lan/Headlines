// 引入基本模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

// 引入一级路由模块
import login from '../views/login.vue'
import layout from '../views/layout.vue'

// 引入二级路由模块
import home from '../views/home.vue'
import airticle from '../views/airticle.vue'
import publish from '../views/publish.vue'
import comment from '../views/comment.vue'
import material from '../views/material.vue'
import GraphicData from '../views/Graphic_data.vue'

// 配置插件
Vue.use(VueRouter)

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

const routes = [
  // 单页应用：一级路由就是登录页和主页外壳;
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: layout,
    // 二级路由
    children: [
      {
        path: '',
        component: home
      },
      {
        path: '/airticle',
        component: airticle
      },
      {
        path: '/publish',
        component: publish
      },
      {
        path: '/comment',
        component: comment
      },
      {
        path: '/material',
        component: material
      },
      {
        path: '/graphicdata',
        component: GraphicData
      }
    ]
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
