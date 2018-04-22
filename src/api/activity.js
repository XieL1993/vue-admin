import store from '../store'
import fetch from './httpFetch'

/**
 * @param isAll 我的还是全部：0我的，1全部
 * @param subject 活动主题
 * @param customer  客户ID
 * @param opportunity  商机ID
 * @param contract  合同ID
 * @param type  活动类型
 * @param dateStart  活动时间起
 * @param dateEnd  活动时间止
 * @param pageSize  当前页码
 * @param pageNumber  每页多少
 */
export function getActivityList(isAll, subject, customer, opportunity, contract, type, dateStart, dateEnd, pageSize, pageNumber) {
  return fetch({
    method: 'get',
    url: '/activity',
    params: {
      tuid: store.getters.tuid,
      timestamp: new Date().getTime(),
      sign: '',
      isAll,
      subject,
      customer,
      opportunity,
      contract,
      type,
      dateStart,
      dateEnd,
      pageSize,
      pageNumber
    }
  })
}
