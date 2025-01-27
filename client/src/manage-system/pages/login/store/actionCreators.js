/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-24 15:13:29 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-20 15:25:08
 */
import axios from 'axios';
import { message } from 'antd';
import {
  CHANGE_LOAD_TO_TRUE,
  HANDLE_LOAD_TO_FALSE_CHANGE_LOGIN_STATUS
} from './actionType'

// 点击登录修改loading状态
export const loading = () => ({
  type: CHANGE_LOAD_TO_TRUE,
  loading: true
})

// 登录
export const login = (userInfro,_this) => {
  // 封装用户名和用户密码
  const data = {
    'user_name':userInfro.username,
    'psd': userInfro.password
  }
  return (dispatch) => {
    axios.post('/login',data,{
      headers: {
        'contentType':'json',
        'x-csrf-token': window._csrf
      }
    })
    .then(res => {
      if(res.data.code === 200){
        dispatch({
          type: HANDLE_LOAD_TO_FALSE_CHANGE_LOGIN_STATUS,
          loading: false,
          login: true
        });
        _this.props.history.push('/index');
        message.success(res.data.message);
      } else {
        dispatch({
          type: HANDLE_LOAD_TO_FALSE_CHANGE_LOGIN_STATUS,
          loading: false,
          login: false
        })
        message.error(res.data.message);
      }
    })
    .catch(() => {
      message.error('出现未知错误');
    })
  }
}
