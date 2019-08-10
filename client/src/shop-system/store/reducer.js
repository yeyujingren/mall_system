/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-08 13:28:57 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-10 11:14:37
 */
import { combineReducers } from 'redux';
import component from '../pages/component/store/reducer';
// 合并state
export default combineReducers({
  component
});
