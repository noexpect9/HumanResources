import request from '@/utils/request'

/**
 * 登陆接口
 * @param {*} data 
 * @returns 
 */
export function loginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户资料
 * @returns 
 */
export function getUserInfoAPI() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 获取用户头像
 * @param {*} id 
 * @returns 
 */
export function getUserDetailByIdAPI(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {

}
