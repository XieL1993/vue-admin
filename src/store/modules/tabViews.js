const tabViews = {
  state: {
    tabViews: [{ name: '首页', path: '/mainIndex' }] // 已打开视图
  },
  mutations: {
    // 添加一个tab
    ADD_TAB(state, tab) {
      if (!tab.name || !tab.path || tab.name === '404') return
      if (state.tabViews.some(item => item.path === tab.path)) return
      state.tabViews.push({
        name: tab.name,
        path: tab.path
      })
    },
    // 删除一个tab
    DEL_TAB(state, tab) {
      for (const [index, item] of state.tabViews.entries()) {
        if (item.path === tab.path) {
          state.tabViews.splice(index, 1)
          break
        }
      }
    },
    // 删除其他tab
    DEL_OTHER_TABS(state, tab) {
      state.tabViews = [{ name: '首页', path: '/mainIndex' }, tab]
    },
    // 删除全部tab
    DEL_ALL_TABS(state) {
      state.tabViews = [{ name: '首页', path: '/mainIndex' }]
    }
  },
  actions: {
    addTab({ commit }, tab) {
      commit('ADD_TAB', tab)
    },
    delTab({ commit }, tab) {
      return new Promise(resolve => {
        commit('DEL_TAB', tab)
        resolve()
      })
    },
    delOtherTabs({ commit }, tab) {
      return new Promise(resolve => {
        commit('DEL_OTHER_TABS', tab)
        resolve()
      })
    },
    delAllTabs({ commit }) {
      return new Promise(resolve => {
        commit('DEL_ALL_TABS')
        resolve()
      })
    }
  }
}
export default tabViews

