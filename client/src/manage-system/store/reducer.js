/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-24 10:19:39 
 * @Last Modified by: 
 * @Last Modified time: 2019-07-24 16:04:12
 */
import { combineReducers } from 'redux-immutable';
import loginReducer from '../pages/login/store/reducer';
// 合并各个组件state
export default combineReducers({
  login: loginReducer
})

