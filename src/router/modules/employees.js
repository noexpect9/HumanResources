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
  },
  {
    path: 'detail/:id?',
    component: () => import('@/views/employees/detail.vue'),
    hidden: true,
    meta: {
      title: '员工详情'
    }
  },
  {
    path: 'print/:id',
    component: () => import('@/views/employees/print.vue'),
    hidden: true,
    meta: {
      title: '打印',
      icon: 'people'
    }
  }
  ]
}