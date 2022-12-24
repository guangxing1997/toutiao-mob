import request from '@/utils/request'
// 获取文章评论数量
export const getComments = params => request({
  method: 'GET',
  url: '/v1_0/comments',
  params
})
// 评论点赞
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// restful api
// get获取  post添加  put修改 patch(部分更新) delete删除
// 取消评论点赞
export const deleteCommentLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
// 添加或回复评论
export function addComment (data) {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
