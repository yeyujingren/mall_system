/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-09 09:47:08 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-10 17:43:48
 */
import { HANDLE_MODEL_VISIBLE, GET_VERIFY_CODE, HANDLE_CODE_FLAG, HANDLE_LOGIN } from './actionType';

/**
 * visible: 控制模态框是否显示
 * flag: 标识点击的是登录还是注册,0标识为注册，1标识为登录
 * verifyCode: 储存验证码
 * isConf: 标识验证码是否正确，默认为true
 * isLogin: 标识是否登录，默认为false
 */
const defaultState = {
  visible: false,
  verifyCode:'',
  flag:null,
  isConf: true,
  isLogin: false
}

export default(state = defaultState,action) => {
  switch(action.type) {
    case HANDLE_MODEL_VISIBLE:
      return {
        ...state,
        visible: action.visible,
        flag: action.flag
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
    default :
      return state
  }
}
