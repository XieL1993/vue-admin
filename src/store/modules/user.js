import { login, logout } from '../../api/login'
import Cookies from 'js-cookie'
import { Message } from 'iview'

const user = {
  state: {
    tuid: Cookies.get('tuid'),
    token: Cookies.get('token')
  },
  mutations: {
    SET_TUID(state, tuid) {
      state.tuid = tuid
    },
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password, userInfo.checkCode).then(data => {
          Cookies.set('token', data.jwt)
          Cookies.set('tuid', data.user.tuid)
          commit('SET_TOKEN', data.jwt)
          commit('SET_TUID', data.user.tuid)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 注销登录，将浏览器保存的token及权限清除
    Logout({ commit, state }) {
      return new Promise(resolve => {
        logout(state.tuid).then(() => {
          commit('SET_TOKEN', '')
          Cookies.remove('token')
          Cookies.remove('tuid')
          window.sessionStorage.removeItem('menus')
          window.sessionStorage.removeItem('menusType')
          resolve()
        }
        ).catch(error => {
          Message.error({ content: error.message, duration: 4, closable: true })
        })
      })
    }
  }
}
export default user
