import Layout from '../../components/Layout'
import MainIndex from '../../views/mainIndex'
import { errorRouter, subRouter } from '../../router'
import $router from './../../router'
import $404 from '../../components/404'

/**
 * 根据后台传回的menus,生成路由
 */
function filterRouterByMenus(router, menus) {
  if (menus && menus.length > 0) {
    for (const menu of menus) {
      if (menu.type === 0 && menu.children && menu.children.length > 0) {
        // 若有子menu，继续遍历，父menu实际上只是用于生成Sidebar，只有最后一层才会生成路由
        filterRouterByMenus(router, menu.children)
      } else {
        // 将子menu添加到router中
        router.push({
          path: menu.sourceUrl,
          name: menu.name,
          component: (resolve) => import(`../../views${menu.sourceUrl}.vue`).then(module => resolve(module)).catch(err => {
            const params = {
              message: err.toString()
            }
            $router.push({ path: '/404', query: params, replace: true })
          })
        })
      }
    }
  }
  return router
}

const permission = {
  state: {
    newRouters: []
  },
  mutations: {
    SET_NEW_ROUTERS(state, routers) {
      state.newRouters = [...routers]
    }
  },
  actions: {
    // 根据服务端菜单生成路由
    createRoutesByMenus({ commit }, menus) {
      return new Promise(resolve => {
        const accessedRouters = filterRouterByMenus([], menus)
        const main = [{
          path: '/mainIndex',
          name: '首页',
          component: MainIndex,
          hidden: true
        }, {
          path: '/404',
          name: '404',
          component: $404,
          hidden: true
        }]
        const childRouters = [...main, ...accessedRouters, ...subRouter]
        const route = [{
          path: '/',
          component: Layout, // 主布局，其他所有的子页面，包括mainIndex都是它的子路由
          redirect: '/mainIndex', // 因为主布局一开始是空的，所以重定向到它的第一个子页面
          children: childRouters
        }, ...errorRouter]
        commit('SET_NEW_ROUTERS', route)
        resolve()
      })
    }
  }
}
export default permission
