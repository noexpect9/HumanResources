import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use()
service.interceptors.response.use(response => { // 成功回调 解构
  const { success, message, data } = response.data
  if (success) {
    return data // 返回data
  } else {
    Message.error(message) // 处理错误提示
    return Promise.reject(new Error(message))
  }
}, error => { // 失败回调
  Message.error(error.message)
  return Promise.reject(error.message)
})

export default service
