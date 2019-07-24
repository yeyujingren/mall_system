/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-24 15:13:19 
 * @Last Modified by: 
 * @Last Modified time: 2019-07-24 15:53:33
 */
import { fromJS } from 'immutable';
// 定义默认state
const defaultState = fromJS({
  login:false,
  loading: false
})

export default(state = defaultState,action) => {
  switch (action.type) {
    default:
      return state;
  }
}
