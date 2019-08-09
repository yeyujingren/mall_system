/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-08 13:28:57 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-09 10:17:01
 */
import { combineReducers } from 'redux';
import component from '../pages/component/store/reducer';
// 合并state
export default combineReducers({
  component
});
