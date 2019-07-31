/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-24 10:19:39 
 * @Last Modified by: 
 * @Last Modified time: 2019-07-31 13:21:00
 */
import { combineReducers } from 'redux-immutable';
import loginReducer from '../pages/login/store/reducer';
import mainReducer from '../pages/main/store/reducer'
// 合并各个组件state
export default combineReducers({
  login: loginReducer,
  main: mainReducer
})

