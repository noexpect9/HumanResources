import Layout from '@/layout'
export default {
  path: '/social',
  name: 'social',
  component: Layout,
  children: [{
    path: '',  // 二级默认路由
    component: () => import('@/views/social'),
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}