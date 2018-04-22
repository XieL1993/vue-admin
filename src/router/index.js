import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'

Vue.use(Router)
/* 常量路由 */
export const constantRouterMap = [
  {
    path: '/login',
    component: Login,
    hidden: true
  }
]
export const errorRouter = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
export const subRouter = [
  {
    name: '注册商机',
    path: '/addOpportunity',
    component: resolve => {
      import('../subpages/opportunity/add').then(module => {
        resolve(module)
      })
    },
    hidden: true
  }
]
export default new Router({
  scrollBehavior() {
    return { y: 0 }
  },
  routes: constantRouterMap
})
