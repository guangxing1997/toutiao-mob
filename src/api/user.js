import request from '@/utils/request'
export const userLogin = data => request({
  url: '/v1_0/authorizations',
  method: 'post',
  data
})
export const sendVC = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`
})
export const getInfo = () => request({
  url: '/v1_0/user'
  // 发送请求头数据
  // vue组件中用this.$store  js文件中 引入store store.
  // 注意请求头发送数据的格式 Bearer后有空格  headers !!!!!!!!!!!
  // 配置在axios拦截器中
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})
// 获取用户的频道列表
export const getUserChannel = () => request({
  url: '/v1_0/user/channels'
})
// 取消关注用户
export const cancelFocus = target => request({
  method: 'DELETE',
  url: `/v1_0/user/followings/${target}`
})
// 关注用户
export const addFocus = target => request({
  method: 'POST',
  url: '/v1_0/user/followings',
  data: {
    target
  }
})
// 取消收藏文章
export const cancelCol = target => request({
  method: 'DELETE',
  url: `/v1_0/article/collections/${target}`
})
// 收藏文章
export const addCol = target => request({
  method: 'POST',
  url: '/v1_0/article/collections',
  data: {
    target
  }
})
// 取消点赞文章
export const cancelLike = target => request({
  method: 'DELETE',
  url: `/v1_0/article/likings/${target}`
})
// 点赞文章
export const addLike = target => request({
  method: 'POST',
  url: '/v1_0/article/likings',
  data: {
    target
  }
})
// 获取用户个人信息
export const getUserProfile = () => request({
  method: 'GET',
  url: '/v1_0/user/profile'
})
// 更新用户个人信息
export const updateUserProfile = data => request({
  method: 'PATCH',
  url: '/v1_0/user/profile',
  data
})
// 更新用户头像
export const updateUserPhoto = data => request({
  method: 'PATCH',
  url: '/v1_0/user/photo',
  data
})
