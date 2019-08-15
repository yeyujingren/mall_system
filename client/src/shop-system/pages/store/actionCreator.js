/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-15 14:17:55 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-15 20:01:11
 */
import axios from 'axios';
import { GET_ORDER_LIST } from './actionType';
import { message } from 'antd';

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

// 确认支付
export const reaclPay = (_this,order_id) => {
  return (dispatch) => {
    // 封装body
    const orderInfor = {
      'order_id': order_id,
      'status': 1
    };
    const headers = {
      'contentType':'json',
      'x-csrf-token': window._csrf
    };
    axios.put('/confirmPay',orderInfor,{headers})
      .then( res => {
        if(res.data.code === 200 ){
          _this.props.history.push('/success');
        } else {
          _this.props.history.push('/fail');
        }
      })
  }
}

// 取消订单
export const reaclCancel = (_this,order_id) => {
  return (dispatch) => {
    // 封装body
    const orderInfor = {
      'order_id': order_id,
      'status': 3
    };
    const headers = {
      'contentType':'json',
      'x-csrf-token': window._csrf
    };
    axios.put('/confirmPay',orderInfor,{headers})
      .then( res => {
        if(res.data.code === 200 ){
          message.success('您已经成功取消订单！');
          _this.props.history.push('/');
        } else {
          message.error('取消订单失败，请稍后重试！');
        }
      })
      .catch(()=>message.error('取消失败，请检查您的网络是否连接！'))
  }
}
