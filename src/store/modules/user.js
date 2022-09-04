import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { loginAPI, getUserInfoAPI, getUserDetailByIdAPI } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  // 初始化 获取token
  token: getToken(),
  // 定义空对象
  userInfo: {}
}

const mutations = {
  // vuex获取token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  },

  // 获取用户信息 存储到vuex
  setUserInfo(state, res) {
    state.userInfo = res
  },

  // 移除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 异步请求 传参(data) 如果success为true 将res.token存入vuex
  async login(context, data) {
    const res = await loginAPI(data)
    context.commit('setToken', res)
    setTimeStamp() // 设置时间戳
  },

  // 调用api获取用户信息
  async getUserInfo(context) {
    // 获取用户信息
    const res = await getUserInfoAPI()
    // 获取用户详情
    const baseInfo = await getUserDetailByIdAPI(res.userId)
    const baseRes = { ...res, ...baseInfo } // 扩展运算符
    context.commit('setUserInfo', baseRes)
    return res
  },

  // 退出登陆
  loginOut(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
    // 重置路由
    resetRouter()
    //
    // context.commit('')
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
} 