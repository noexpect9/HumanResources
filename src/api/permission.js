import request from '@/utils/request'

/**
 * 获取用户权限
 * @param {*} params 
 * @returns 
 */
export function getPermissionListAPI(params) {
  return request({
    url: '/sys/permission',
    params
  })
}

/**
 * 新增权限
 * @param {*} data 
 * @returns 
 */
export function addPermissionAPI(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

/**
 * 更新权限
 * @param {*} data 
 * @returns 
 */
export function updatePermissionAPI(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除权限
 * @param {*} id 
 * @returns 
 */
export function delPermissionAPI(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}

/**
 * 获取用户权限详情
 * @param {*} id 
 * @returns 
 */
export function getPermissionDetailAPI(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}