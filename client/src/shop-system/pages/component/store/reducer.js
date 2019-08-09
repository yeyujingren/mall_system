/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-09 09:47:08 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-09 10:31:16
 */
import { HANDLE_MODEL_VISIBLE } from './actionType';

/**
 * visible: 控制模态框是否显示
 * flag: 标识点击的是登录还是注册,0标识为注册，1标识为登录
 */
const defaultState = {
  visible: false,
  flag:null
}

export default(state = defaultState,action) => {
  switch(action.type) {
    case HANDLE_MODEL_VISIBLE:
      return {
        ...state,
        visible: action.visible,
        flag: action.flag
      }
    default :
      return state
  }
}
