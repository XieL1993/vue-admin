import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {// 是否展开菜单栏
      opened: !+Cookies.get('sidebarStatus')
    },
    menus: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_MENUS(state, data) {
      state.menus = data
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    }
  }
}
export default app
