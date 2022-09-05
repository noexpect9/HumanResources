import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'

const TimeOut = 72000

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // config 请求的配置信息
  // 注入token
  if (store.getters.token) {
    if (isTimeOut()) {
      // 如果为true 过期了 退出登陆
      store.dispatch('user/loginOut')
      // 跳转到登录页
      router.push('/login')

      return Promise.reject(new Error('token已过期!'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config  // 必须返回
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
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


// 是否超时
// 当前时间 - 缓存中时间 是否大于 TimeOut
function isTimeOut() {
  const currentTime = Date.now()  // 当前时间
  const timeStamp = getTimeStamp()  // 缓存时间
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service
