import router from '../../router/index'
import store from '../../store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getMenuList } from '../../api/login'
import { Message } from 'iview'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.token) { // 已登录
    const menus = JSON.parse(window.sessionStorage.getItem('menus'))
    if (menus && menus.length > 0) { // 本地已缓存menus
      if (store.getters.newRouters.length > 0) { // vuex已缓存menus
        next()
      } else {
        store.commit('SET_MENUS', menus)// 存储menus到vuex
        store.dispatch('createRoutesByMenus', menus).then(() => { // 创建和添加路由
          router.addRoutes(store.getters.newRouters)
          next({ ...to, replace: true })
        })
      }
    } else { // 本地存储中没有menus，向服务器请求获取
      getMenuList(store.getters.token).then(data => {
        const menus = data.obj
        window.sessionStorage.setItem('menus', JSON.stringify(menus))// 存储menus到本地
        store.commit('SET_MENUS', menus)// 存储menus到vuex
        // 生成路由并存储到vuex中
        store.dispatch('createRoutesByMenus', menus).then(() => {
          router.addRoutes(store.getters.newRouters)// 将所有路由真正添加到vue router中
          next({ ...to, replace: true })
        })
      }).catch((error) => {
        Message.error({ content: error.message, duration: 4, closable: true })
        store.commit('SET_TOKEN', '')
        next({ path: '/login', replace: true })
        if (from.path === '/login') {
          NProgress.done()
        }
      })
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()// 未登录时，调整页面如果在白名单中则放行，否则跳转登录页
    } else {
      // set the replace: true so the navigation will not leave a history record
      next({ path: '/login', replace: true })
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

