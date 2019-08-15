/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-08 13:28:57 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-15 14:27:15
 */
import { combineReducers } from 'redux';
import component from '../component/store/reducer';
import main from '../pages/store/reducer';
// 合并state
export default combineReducers({
  component,
  main
});
