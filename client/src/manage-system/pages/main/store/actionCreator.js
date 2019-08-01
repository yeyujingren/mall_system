/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 11:41:45 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-01 19:30:11
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

// 删除用户账户
export const deleteUser = (user_id) => {
  return (dispatch) => {
    axios.post('/deleteUser',{
      user_id:user_id
    },{
      headers:{
        'contentType':'json',
        'x-csrf-token':window._csrf
      }
    })
      .then(res => {
        if(res.data.success){
          dispatch(getList());
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch(e=>{
        console.log(e);
      })
  }
}

// 获取要修改的用户的数据
export const willChangeUser = (userInfor, id) => ({
  type: 'WILL_CHANGE_USER',
  infor: userInfor,
  user_id: id
})

// 更新用户数据
export const upDateUser = (user_infor,id) => {
  console.log(user_infor,id)
  return (dispatch) => {
    axios.post('/upDateUser',{
        user_id:id,
        user_infor:user_infor
      },{
        headers:{
          'contentType':'json',
          'x-csrf-token':window._csrf
        }
    })
    .then(res => {
      if(res.data.success){
        dispatch(getList());
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    })
    .catch(e=>{
      console.log(e);
    })
  }
}
