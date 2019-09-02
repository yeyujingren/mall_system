/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-15 14:18:01 
 * @Last Modified by: 
 * @Last Modified time: 2019-09-01 20:24:27
 */
import { GET_ORDER_LIST, GET_HAS_PAY_COURSE, GET_COURSE_LIST, UPDATE_MY_CART_LEN, HANDLE_COMMON_WRITE, GET_FUZZY_SEARCH_LIST, CHANGE_EMAIL, GET_COMMON_LIST, GET_COURSE_DETAL, UPDATE_COMMON_SUM } from './actionType';

/**
 * @param {array} orderList: 订单数据暂存
 * @param {array} courseList: 课程数据暂存
 * @param {array} hasPayList: 已购已审核课程数据暂存
 * @param {array} commonList: 评论数据暂存
 * @param {object} courseDetal: 详情数据暂存
 * @param {string} write: 写评论数据暂存
 * @param {string} email: 邮箱数据暂存
 * @param {number} sum: 评论条数暂存
 */
const defaultState = {
  orderList:[],
  courseList:[],
  hasPayList:[],
  commonList:[],
  courseDetal:{},
  write:'',
  email:null,
  sum:0
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
        hasPayList: action.data
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
    case GET_FUZZY_SEARCH_LIST :
      return {
        ...state,
        courseList: action.courseList
      }
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.email
      }
    case GET_COURSE_DETAL:
      return {
        ...state,
        courseDetal: action.courseDetal,
        sum: action.sum
      }
    case GET_COMMON_LIST:
      return {
        ...state,
        commonList: action.commonList
      }
    case HANDLE_COMMON_WRITE:
      return {
        ...state,
        write: action.write
      }
    case UPDATE_COMMON_SUM:
      return {
        ...state,
        sum: action.sum
      }
    default:
      return state;
  }
}
