// 员工路由规则
import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employess',
  component: Layout,
  children: [{
    path: '',  // 二级默认路由
    component: () => import('@/views/employees/index.vue'),
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }]
}