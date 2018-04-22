import fetch from './httpFetch'
import { getAesString } from '../common/js/Security'

// 登录-获取key
function getKeys() {
  return fetch({
    method: 'get',
    url: '/anon/getSecurityKey',
    params: { tokenKey: 'get' }
  })
}

export function login(username, pwd, code) {
  return new Promise((resolve, reject) => {
    getKeys().then(data => {
      const password = getAesString(pwd, data.tokenKey)
      const formdata = new FormData()
      formdata.append('username', username)
      formdata.append('password', password)
      formdata.append('code', code)
      formdata.append('methodName', 'login')
      formdata.append('timestamp', new Date().getTime())
      resolve(fetch({
        method: 'post',
        url: '/anon/login',
        data: formdata
      }))
    }).catch((error) => {
      reject(error)
    })
  })
}

export function getCheckCode() {
  return fetch({
    method: 'get',
    url: '/anon/getCheckCode',
    params: { codeKey: 'get' }
  })
}

export function getMenuList() {
  return fetch.get('/sys/resource/menus')
}

export function logout(tuid) {
  return fetch.post('/sys/user/logout', { password: tuid })
}

export function getDictItem(entryCode) {
  return fetch({
    method: 'get',
    url: '/system/dict/items',
    params: { entryCode }
  })
}
