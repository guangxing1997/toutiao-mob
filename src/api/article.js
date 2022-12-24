import request from '@/utils/request'
// 获取频道的文章列表
export const getArtByChan = params => request({
  url: '/v1_0/articles',
  params
})
// 请求文章详情
export const getArtById = articleId => request({
  // 拼接时将大数字类型隐式转换字符串
  url: `/v1_0/articles/${articleId}`
})
