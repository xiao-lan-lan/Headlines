// 引入基本模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import NProgress from 'nprogress'

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

import JSONbig from 'json-bigint'

// 配置插件
Vue.use(VueRouter)

// axios配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.headers = { Authorization: `Bearer ${localStorage.getItem('user')}` }
axios.defaults.transformResponse = [function (data, headers) {
  // Do whatever you want to transform the data
  // console.log(data)
  // console.log(JSONbig.parse(data).data.results[0].id)

  try {
    return JSONbig.parse(data)
  } catch (error) {
    return {}
  }
}]
Vue.prototype.$axios = axios

const routes = [
  // 单页应用：一级路由就是登录页和主页外壳;
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
        path: '/publish/:id',
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

// 路由配置
// 导航守卫,控制只有携带token才能访问页面
router.beforeEach((to, from, next) => {
  // 开始进度条加载
  NProgress.start()
  const token = localStorage.getItem('user')

  // 去登陆页直接跳转，无需携带token
  if (to.path === '/login') {
    next()
    return
  }

  // 判断是否携带token
  // token ? next() : next('/login')
  if (token) {
    next()
  } else {
    next('/login')
    NProgress.done()
  }
})

// 导航后置钩子，结束进度条加载
router.afterEach(route => {
  NProgress.done()
})

// 原因：在路由中添加了相同的路由,当前导航上点击当前导航报错。解决：重写路由的push方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router
