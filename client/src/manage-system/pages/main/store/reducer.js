/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 11:44:16 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-05 15:50:20
 */
// 定义默认state
const defaultState = {
  userData:[],
  willChangeInfor:{},
  userId:-1,
  visible: false,
  commData:[],
  url:null
}
export default(state = defaultState,action) => {
  switch (action.type){
    case 'GET_USER_LIST':
      return {
        ...state,
        userData: action.data
      }
    case 'WILL_CHANGE_INFOR':
      return {
        ...state,
        willChangeInfor: action.infor,
        userId: action.user_id,
        visible: action.visible,
        url: action.url
      }
    case 'CHANGE_VISIBLE_FLAG':
      return {
        ...state,
        visible: action.visible
      }
    case 'GET_COMM_LIST':
      return {
        ...state,
        commData: action.data
      }
    case 'PUSH_URL':
      return {
        ...state,
        url: action.url
      }
    default:
      return state;
  }
}
