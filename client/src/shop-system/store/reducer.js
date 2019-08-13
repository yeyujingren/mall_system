/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-08 13:28:57 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-13 19:51:36
 */
import { combineReducers } from 'redux';
import component from '../component/store/reducer';
// 合并state
export default combineReducers({
  component
});
