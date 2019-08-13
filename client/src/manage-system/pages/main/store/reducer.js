/*
 * @Author: Yifeng Tao
 * @Date: 2019-07-31 11:44:16
 * @Last Modified by: 
 * @Last Modified time: 2019-08-13 14:27:54
 */
/**
 * userData: 用来存储会员数据
 * willChangeInfor: 点击修改时，存储要修改的数据
 * userId: 点击修改时，存储要修改的id
 * visible: 控制模态框是否展示
 * url: 上传图片返回的链接
 * handlePost:标识请求类型，1代表商品修改请求，2代表商品增加请求
 */
import {
  GET_USER_LIST,
  WILL_CHANGE_INFOR,
  CHANGE_VISIBLE_FLAG,
  GET_COMM_LIST,
  PUSH_URL,
  GET_ORDER_LIST
} from './actionType';
const defaultState = {
  userData:[],
  commData:[],
  orderData:[],
  willChangeInfor:{},
  userId:-1,
  visible: false,
  url:null,
  handlePost:null
}
export default(state = defaultState,action) => {
  switch (action.type){
    case GET_USER_LIST:
      return {
        ...state,
        userData: action.data
      }
    case WILL_CHANGE_INFOR:
      return {
        ...state,
        willChangeInfor: action.infor,
        userId: action.user_id,
        visible: action.visible,
        url: action.url,
        handlePost:action.handlePost
      }
    case CHANGE_VISIBLE_FLAG:
      return {
        ...state,
        visible: action.visible
      }
    case GET_COMM_LIST:
      return {
        ...state,
        commData: action.data
      }
    case PUSH_URL:
      return {
        ...state,
        url: action.url
      }
    case GET_ORDER_LIST:
      return {
        ...state,
        orderData: action.data
      }
    default:
      return state;
  }
}
