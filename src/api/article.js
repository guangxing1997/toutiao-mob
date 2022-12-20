import request from '@/utils/request'
// 获取频道的文章列表
export const getArtByChan = params => request({
  url: '/v1_0/articles',
  params
})
