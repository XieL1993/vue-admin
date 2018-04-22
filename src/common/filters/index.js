/**
 * @author xl
 * 格式化日期过滤器
 * @param time 时间戳
 * @returns {string} XXXX-XX-XX格式日期
 */
const formatDateTime = (time) => {
  var d = new Date(time)
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
}

export default {
  formatDateTime
}
