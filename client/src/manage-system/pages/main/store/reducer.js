/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 11:44:16 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-02 15:19:19
 */
// 定义默认state
const defaultState = {
  userData:[],
  willChangeuserInfor:{},
  userId:-1,
  visible: false
}
export default(state = defaultState,action) => {
  switch (action.type){
    case 'GET_USER_LIST':
      return {
        ...state,
        userData: action.data
      }
    case 'WILL_CHANGE_USER':
      return {
        ...state,
        willChangeuserInfor: action.infor,
        userId: action.user_id,
        visible: action.visible
      }
    case 'CHANGE_VISIBLE_FLAG':
      return {
        ...state,
        visible: action.visible
      }
    default:
      return state;
  }
}
