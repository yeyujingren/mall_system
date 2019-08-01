/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-24 15:13:19 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-01 10:09:18
 */
// 定义默认state
const defaultState = {
  login:false,
  loading: false
}

export default(state = defaultState,action) => {
  switch (action.type) {
    case 'change-loading-to-true':
      return {
        ...state,
        loading: action.loading
      }
    case 'handle-loading-to-false-and-change-login-status':
      return {
        ...state,
        loading: action.loading,
        login: action.login
      }
    default:
      return state;
  }
}
