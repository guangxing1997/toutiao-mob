// 封装请求
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
// 添加请求拦截器
// request 为axios实例对象
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config为请求对象,包含每次发送请求数据
  // console.log(config)
  if (store.state.user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  // 不要忘记 return config
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default request
