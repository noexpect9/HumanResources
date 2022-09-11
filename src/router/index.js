import Vue from 'vue'
import Router from 'vue-router'

// 引入路由模块
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      component: ()=>import('@/views/import')
    }]
  },
]

// 定义动态路由变量
export const asyncRouter = [
  approvalsRouter, departmentsRouter, employeesRouter, permissionRouter, attendancesRouter, salarysRouter, settingRouter, socialRouter
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes]  // 动态路由与静态路由合并
})

const router = createRouter()  // 实例化一个路由 new VueRouter


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
