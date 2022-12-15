import request from '@/utils/request'
export const userLogin = data => request({
  url: '/v1_0/authorizations',
  method: 'post',
  data
})
export const sendVC = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`
})
