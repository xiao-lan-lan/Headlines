import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element-ui及其样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入 nprogress 样式
import 'nprogress/nprogress.css'

import './assets/css/index.less'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
