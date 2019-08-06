/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-24 15:13:19 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-06 19:03:57
 */
import { CHANGE_LOAD_TO_TRUE, HANDLE_LOAD_TO_FALSE_CHANGE_LOGIN_STATUS } from './actionType'
// 定义默认state
const defaultState = {
  login:false,
  loading: false
}

export default(state = defaultState,action) => {
  switch (action.type) {
    case CHANGE_LOAD_TO_TRUE:
      return {
        ...state,
        loading: action.loading
      }
    case HANDLE_LOAD_TO_FALSE_CHANGE_LOGIN_STATUS:
      return {
        ...state,
        loading: action.loading,
        login: action.login
      }
    default:
      return state;
  }
}
