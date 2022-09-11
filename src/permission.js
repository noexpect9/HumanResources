// 权限拦截在路由跳转 导航守卫
import router from '@/router'

import store from '@/store'
// 引入进度条及样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

/**
 * next() 放行
 * next(false) 跳转终止
 * next(地址) 跳转到某个地址
 */

const whiteList = ['/login', '/404']

// 前置守卫
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 如果有token
    if (to.path === '/login') {
      // 如果访问的是登录页
      next('/')  // 跳转到主页
    } else {
      // 只有放行的时候才去获取用户资料
      // 判断如果当前vuex中有用户的资料id 表示已经有资料 无需获取
      if (!store.getters.userId) {
        // 如果没有id 表示当前没有用户资料 异步获取
        // getUserInfo为异步方法 所以获取资料为异步
        const { roles } = await store.dispatch('user/getUserInfo')
        console.log(roles.menus);
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        router.addRoutes(routes)
        console.log(routes,'111111');
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    // 没有token的情况下
    if (whiteList.indexOf(to.path) > -1) {
      next() // 白名单放行
    } else {
      next('/login')
    }
  }
  nprogress.done()
})
// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
