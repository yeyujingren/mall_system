/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 11:41:45 
 * @Last Modified by: 
 * @Last Modified time: 2019-07-31 16:47:51
 */
import axios from 'axios';
import { message } from 'antd';

// 退出登录
export const logout = () => {
  return (dispacth) => {
    axios.get('/logout')
      .then(res => {
        if(res.data.success){
          message.success(res.data.message);
        } else {
          message.error(res.data.message)
        }
      })
      .catch((e)=>{
        console.log(e);
        message.error('出现未知错误！')
      })
  }
}

// 获取会员信息列表
export const getList = () => {
  return (dispacth) => {
    axios.get('/getUserList')
      .then(res => {
        dispacth({
          type: 'GET_USER_LIST',
          data: res.data.result
        })
      })
      .catch((e)=>{
        console.log(e);
        message.error('获取用户列表数据失败！')
      })
  }
}
