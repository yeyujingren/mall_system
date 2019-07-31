/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 11:44:16 
 * @Last Modified by: 
 * @Last Modified time: 2019-07-31 16:50:18
 */
import { fromJS } from 'immutable';

// 定义默认state
const defaultState = fromJS({
  userData:[]
})
export default(state = defaultState,action) => {
  switch (action.type){
    case 'GET_USER_LIST':
      return state.merge({
        'userData': state.get('userData').concat(action.data)
      })
    default:
      return state;
  }
}
