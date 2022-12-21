import request from '@/utils/request'
// 获取搜索建议
export const getSuggestions = q => request({
  url: '/v1_0/suggestion',
  params: {
    q
  }
})
// 根据关键词获取搜索结果
export const getResultBykw = params => request({
  url: '/v1_0/search',
  params
})
