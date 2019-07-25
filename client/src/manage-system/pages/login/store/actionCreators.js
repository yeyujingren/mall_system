/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-24 15:13:29 
 * @Last Modified by: 
 * @Last Modified time: 2019-07-25 14:52:05
 */
import axios from 'axios';
import { message } from 'antd';

// 点击登录修改loading状态
export const loading = () => ({
  type: 'change-loading-to-true',
  loading: true
})

// 登录
export const login = userInfro => {
  // console.log(userInfro.username,userInfro.password)
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
      if(res.data.success){
        dispatch({
          type: 'handle-loading-to-false-and-change-login-status',
          loading: false,
          login: true
        })
        message.success(res.data.message)
      } else {
        dispatch({
          type: 'handle-loading-to-false-and-change-login-status',
          loading: false,
          login: false
        })
        message.error(res.data.message)
      }
    })
    .catch(e => {
      console.log('error'+e)
    })
  }
}

// 是否登录成功
export const isLogin = () => ({
  type: 'judge-is-login'
})
