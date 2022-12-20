import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from './localStorage'
Vue.use(Vuex)
// 防止存取时书写错误
const TOKEN = 'TT_USER'
export default new Vuex.Store({
  state: {
    //  用户的登录状态信息
    // user: null
    user: getItem(TOKEN),
    // 用户未登录频道
    perChannerls: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      // 为了保证页面刷新不丢失，存储本地存储
      // 依附于 window 对象的所有属性和方法，使用时可以省略 window
      setItem(TOKEN, payload)
      // window.localStorage.setItem(TOKEN, JSON.stringify(payload))
    }
  },
  actions: {
  },
  modules: {
  }
})
