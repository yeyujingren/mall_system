/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-15 14:18:01 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-16 13:55:41
 */
import { GET_ORDER_LIST, GET_HAS_PAY_COURSE } from './actionType';

/**
 * @param {array} orderList: 订单数据暂存
 */
const defaultState = {
  orderList:[],
  courseList:[]
}
export default(state = defaultState,action) => {
  switch(action.type){
    case GET_ORDER_LIST :
      return {
        ...state,
        orderList: action.data
      }
    case GET_HAS_PAY_COURSE :
      return {
        ...state,
        courseList: action.data
      }
    default:
      return state;
  }
}
