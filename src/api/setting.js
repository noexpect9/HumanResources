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

/**
 * 获取用户基本信息
 * @returns 
 */
export function getRoleDetailAPI(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 编辑用户信息
 * @param {*} id 
 * @returns 
 */
export function updateRoleAPI(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 新增用户接口
 * @param {*} data 
 * @returns 
 */
export function addRoleAPI(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
 * 用户分配权限
 * @param {*} data 
 * @returns 
 */
export function assginPermAPI(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}