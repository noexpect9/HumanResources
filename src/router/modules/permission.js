import Layout from '@/layout'
export default {
  path: '/permission',
  name: 'permissions',
  component: Layout,
  children: [{
    path: '',  // 二级默认路由
    component: () => import('@/views/permission'),
    name: 'permissions',
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}