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

/**
 * 保存用户信息
 * @param {*} data 
 * @returns 
 */
export function saveUserDataAPI(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetailAPI(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonalAPI(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}


/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetailAPI(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}


/**
 * 保存岗位信息
 * ****/
export function updateJobAPI(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

/**
 * 用户分配角色
 * @param {*} data 
 * @returns 
 */
export function assginRoleAPI(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}