// mixin全局混入

import store from '@/store'

export default {
  methods: {
    checkPremission(key) {
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}