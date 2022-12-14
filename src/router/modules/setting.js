import Layout from '@/layout'
export default {
  path: '/setting',
  name: 'settings',
  component: Layout,
  children: [{
    path: '',  // 二级默认路由
    component: () => import('@/views/setting'),
    name: 'settings',
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}