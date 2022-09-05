import request from '@/utils/request'

/**
 * 获取组织架构
 * @returns 
 */
export function getDepartmentsAPI() {
  return request({
    url: '/company/department'
  })
}

/**
 * 删除组织部门
 * @returns 
 */
export function delDepartmentsAPI(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
 * 新增组织部门
 * @param {*} data 
 * @returns 
 */
export function addDepartmentsAPI(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}