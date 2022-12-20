import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 配置使用处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// 配置使用中文语言包
dayjs.locale('zh-cn')
// 添加全局过滤器
Vue.filter('relativeTime', val => {
  return dayjs().to(dayjs(val))
})
