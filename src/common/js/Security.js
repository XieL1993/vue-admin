import CryptoJS from 'crypto-js'

/**
 * @description Aes加密
 * @param {String} data
 * @param {String} key
 */
export function getAesString(data, key) { // 加密
  const ukey = CryptoJS.enc.Utf8.parse(key)
  const iv = CryptoJS.enc.Utf8.parse('adfeujjhgdnmkj12')
  const encrypted = CryptoJS.AES.encrypt(data, ukey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString() // 返回的是base64格式的密文
}

