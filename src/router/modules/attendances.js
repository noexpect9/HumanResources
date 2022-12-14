import Layout from '@/layout'
export default {
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  children: [{
    path: '',  // 二级默认路由
    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤',
      icon: 'skill'
    }
  }]
}