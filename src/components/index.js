// 公共组件的全局注册
import PageTools from './PageTools/index.vue'
export default {
  install(Vue) {
    // 注册组件
    Vue.component('PageTools',PageTools)
  }
}