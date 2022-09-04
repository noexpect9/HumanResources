import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginAPI } from '@/api/user'

const state = {
  // 初始化 获取token
  token: getToken()
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
  }
}

const actions = {
  // 异步请求 传参(data) 如果success为true 将res.token存入vuex
  async login(context, data) {
    const res = await loginAPI(data)
    context.commit('setToken', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
} 