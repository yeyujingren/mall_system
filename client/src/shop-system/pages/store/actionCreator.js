/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-15 14:17:55 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-15 14:55:13
 */
import axios from 'axios';
import { GET_ALL_ORDER } from './actionType';

export const getAllOrder = () => {
  // 获取用户id
  const user_id = localStorage.getItem('user_id');
  return (dispatch) => {
    axios.get('/getAllOrder/'+user_id)
      .then( res => {
        if(res.data.code === 200){
          dispatch({
            type: GET_ALL_ORDER,
            data: res.data.result
          })
        }
      })
  }
}
