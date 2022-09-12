// 公共组件的全局注册
import PageTools from './PageTools/index.vue'
import UploadExcel from './uploadExcal'
import Screenfull from 'screenfull'

export default {
  install(Vue) {
    // 注册组件
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('Screenfull', Screenfull)
  }
}