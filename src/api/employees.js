import request from '@/utils/request'

/**
 * 获取员工列表
 * @param {*} params 
 * @returns 
 */
export function getStaffListAPI(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 删除员工
 * @param {*} id 
 * @returns 
 */
export function delStaffAPI(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * 导入excel
 * @param {*} data 
 * @returns 
 */
export function importStaffAPI(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}