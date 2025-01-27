/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-09 09:47:08 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-22 11:07:00
 */
import {
  HANDLE_MODEL_VISIBLE,
  GET_VERIFY_CODE,
  HANDLE_CODE_FLAG,
  HANDLE_LOGIN,
  USER_NAME_IS_REPET,
  UPDATE_MY_CART_LEN,
  GET_CART_LIST,
  GET_USER_INFO,
  PUSH_PERSION_PHOTO
} from './actionType';

/**
 * @param {boolean} visible: 控制模态框是否显示
 * @param {number} flag: 标识点击的是登录还是注册,0标识为注册，1标识为登录
 * @param {string} verifyCode: 储存验证码
 * @param {boolean} isConf: 标识验证码是否正确，默认为true
 * @param {boolean} isLogin: 标识是否登录，默认为false
 * @param {boolean} isRepet； 标识用户名是否重复，默认为false
 * @param {num} mycartLen: 加入购物车的数量
 * @param {array} cartList: 加入购物车的课程
 * @param {number} totalPrice: 购物车中的总金额
 * @param {obj} userInfor: 初次加载时获取用户数据
 */
const defaultState = {
  visible: false,
  verifyCode:'',
  flag:null,
  isConf: true,
  isLogin: false,
  isRepet: false,
  mycartLen:0,
  cartList:[],
  totalPrice:0,
  userInfor:{},
  userPhoto:null
}

export default(state = defaultState,action) => {
  switch(action.type) {
    case HANDLE_MODEL_VISIBLE:
      return {
        ...state,
        visible: action.visible,
        flag: action.flag,
        isRepet: action.isRepet
      }
    case GET_VERIFY_CODE:
      return {
        ...state,
        verifyCode: action.verifyCode
      }
    case HANDLE_CODE_FLAG:
      return {
        ...state,
        isConf: action.isConf
      }
    case HANDLE_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin
      }
    case USER_NAME_IS_REPET:
      return {
        ...state,
        isRepet: action.isRepet
      }
    case UPDATE_MY_CART_LEN :
      return {
        ...state,
        mycartLen: action.mycartLen
      }
    case GET_CART_LIST :
      return{
        ...state,
        cartList: action.mycartList,
        totalPrice: action.totalPrice
      }
    case GET_USER_INFO :
      return{
        ...state,
        userInfor: action.userInfor
      }
    case PUSH_PERSION_PHOTO :
      return{
        ...state,
        userPhoto: action.url
      }
    default :
      return state
  }
}
