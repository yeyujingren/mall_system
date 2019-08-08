/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-08 10:26:56 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-08 10:27:57
 */
import axios from 'axios';
import { message } from 'antd';
import {
  GET_ORDER_LIST
} from '../actionType';

// 获取订单列表数据
export const getOrderList = () => {
  return (dispatch) => {
    axios.get('/getOrderList')
      .then( res => {
        if(res.data.code ==200){
          dispatch({
            type: GET_ORDER_LIST,
            data: res.data.result
          })
        } else {
          message.error(res.data.message);
        }
      })
      .catch(()=>{
        message.error('网络不可用！');
      })
  }
}
// 更新订单状态
export const comfirmPay = (order_id) => {
  return (dispatch) => {
    axios.put('/upDateOrderStatus',{'order_id':order_id},{
      headers:{
        'contentType':'json',
        'x-csrf-token':window._csrf
      }
    })
      .then( res => {
        if(res.data.code ==200){
          dispatch(getOrderList())
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch(()=>{
        message.error('网络不可用！');
      })
  }
}
