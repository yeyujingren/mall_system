/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-15 14:17:55 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-15 16:43:48
 */
import axios from 'axios';
import { GET_ORDER_LIST } from './actionType';

// 根据flag来派发不同接口
const seletApi = (user_id,flag) => {
  switch(flag){
    case 0:
      return `/getAllOrder/${user_id}`;
    case 1:
      return `/getWillPayOrder/${user_id}`;
    case 2:
      return `/getWillSendOrder/${user_id}`;
    case 3:
      return `/getHasFinishOrder/${user_id}`;
    default:
      break;
  }
}

/**
 * 获取订单列表
 * @param {number} flag : 0标识全部，1标识未支付，2标识待审核，3标识已完成
 */
export const getOrderList = (flag) => {
  // 获取用户id
  const user_id = localStorage.getItem('user_id');
  let api = seletApi(user_id,flag);
  return (dispatch) => {
    axios.get(api)
      .then( res => {
        if(res.data.code === 200){
          dispatch({
            type: GET_ORDER_LIST,
            data: res.data.result
          })
        }
      })
  }
}
