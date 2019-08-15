/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-15 14:18:01 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-15 16:31:02
 */
import { GET_ORDER_LIST } from './actionType';

/**
 * @param {array} orderList: 订单数据暂存
 */
const defaultState = {
  orderList:[]
}
export default(state = defaultState,action) => {
  switch(action.type){
    case GET_ORDER_LIST :
      return {
        ...state,
        orderList: action.data
      }
    default:
      return state;
  }
}
