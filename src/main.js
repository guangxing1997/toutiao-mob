import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
// 引入vant  全局
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载 动态设置 vm 基准值（html 标签的字体大小）
import 'amfe-flexible'
// 引入 dayjs组件,初始化
import '@/utils/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
