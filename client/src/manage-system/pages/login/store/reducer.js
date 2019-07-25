/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-24 15:13:19 
 * @Last Modified by: 
 * @Last Modified time: 2019-07-25 11:05:42
 */
import { fromJS } from 'immutable';
// 定义默认state
const defaultState = fromJS({
  login:false,
  loading: false
})

export default(state = defaultState,action) => {
  switch (action.type) {
    case 'change-loading-to-true':
      return state.set('loading',action.loading)
    case 'handle-loading-to-false-and-change-login-status':
      return state.merge({
        'loading':action.loading,
        'login': action.login
      })
    default:
      return state;
  }
}
