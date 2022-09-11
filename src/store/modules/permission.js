// 权限模块
import { constantRoutes, asyncRouter } from '@/router'

// vuex中的permission模块用来存放 当前静态路由与当前用户的权限路由
const state = {
  routes: constantRoutes  // 所有人公有路由
}
const mutations = {
  // newRoutes 用户通过权限所得到的动态路由的部分
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]  // 合并公共路由与权限路由
  }
}
const actions = {
  // 筛选权限路由  asyncRouter是全部动态路由
  filterRoutes(context, menus) {
    const routes = []
    // 筛选出 动态路由中menus能够对上的路由
    menus.forEach(key => {
      routes.push(...asyncRouter.filter(item => item.name === key)) // 筛选全部路由信息与动态权限匹配
    })
    // 得到的routes是所有模块中满足权限的路由数组
    context.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
