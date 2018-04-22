import store from '../store'
import fetch from './httpFetch'

/**
 * @param isAll 我的还是全部：0我的，1全部
 * @param oppName 商机名称
 * @param customer  客户ID
 * @param status  商机状态
 * @param type  商机类型
 * @param pageSize  当前页码
 * @param pageNumber  每页多少
 */
export function getOpportunityList(isAll, oppName, customer, status, type, pageSize, pageNumber) {
  return fetch({
    method: 'get',
    url: '/opportunity',
    params: {
      tuid: store.getters.tuid,
      timestamp: new Date().getTime(),
      sign: '',
      isAll,
      oppName,
      customer,
      status,
      type,
      pageSize,
      pageNumber
    }
  })
}
