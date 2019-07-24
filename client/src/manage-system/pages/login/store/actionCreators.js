/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-24 15:13:29 
 * @Last Modified by: 
 * @Last Modified time: 2019-07-24 20:18:58
 */
import axios from 'axios';
import { message } from 'antd';
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
          type: 'HANDLE_LOGIN_STATUS',
          login: true
        })
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    })
    .catch(e => {
      console.log('error'+e)
    })
  }
}
