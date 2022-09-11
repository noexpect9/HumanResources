import Layout from '@/layout'
export default {
  path: '/demartmenets',
  name: 'departments',
  component: Layout,
  children: [{
    path: '',  // 二级默认路由
    component: () => import('@/views/departments'),
    meta: {
      title: '组织架构',
      icon: 'tree'
    }
  }]
}