import request from '@/utils/request.js'

/**
 * 新增员工接口
 * @param {*} data 
 * @returns 
 */
export function addStaffAPI(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}