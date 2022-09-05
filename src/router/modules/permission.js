import Layout from '@/layout'
export default {
  path: '/permission',
  name: 'permission',
  component: Layout,
  children: [{
    path: '',  // 二级默认路由
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}