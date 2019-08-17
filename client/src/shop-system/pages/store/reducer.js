/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-15 14:18:01 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-17 11:35:03
 */
import { GET_ORDER_LIST, GET_HAS_PAY_COURSE, GET_COURSE_LIST, UPDATE_MY_CART_LEN } from './actionType';

/**
 * @param {array} orderList: 订单数据暂存
 * @param {array} courseList: 课程数据暂存
 * @param {num} mycartLen: 加入购物车的数量
 */
const defaultState = {
  orderList:[],
  courseList:[],
  mycartLen:0
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
    case GET_COURSE_LIST :
      return {
        ...state,
        courseList: action.data
      }
    case UPDATE_MY_CART_LEN :
      return {
        ...state,
        mycartLen: action.mycartLen
      }
    default:
      return state;
  }
}
