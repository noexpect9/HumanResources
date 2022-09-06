import request from '@/utils/request'

/**
 * 获取用户信息
 * @param {*} params 
 * @returns 
 */
export function getRoleListAPI(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 删除用户信息
 * @param {*} id 
 * @returns 
 */
export function delRoleAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete',
  })
}


export function updateRoleAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'put'
  })
}