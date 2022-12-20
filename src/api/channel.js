import request from '@/utils/request'
// 获取推荐频道的文章列表
export const getRecoChan = () => request({
  url: '/v1_0/channels'
})
// 增加个人订阅频道
export const syncPerChan = channels => request({
  method: 'patch',
  url: '/v1_0/user/channels',
  data: {
    // 接口文档 object [] 数组对象
    channels: [channels]
  }
})
// 删除个人频道
export const remPerChan = id => request({
  method: 'DELETE',
  url: `/v1_0/user/channels/${id}`
})
